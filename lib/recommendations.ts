import { User, Event, EventRecommendation } from './types';
import { db } from './database';

export interface RecommendationContext {
  user: User;
  location?: string;
  timePreference?: 'morning' | 'afternoon' | 'evening' | 'night';
  maxDistance?: number; // in miles
}

export class RecommendationEngine {
  private static instance: RecommendationEngine;

  static getInstance(): RecommendationEngine {
    if (!RecommendationEngine.instance) {
      RecommendationEngine.instance = new RecommendationEngine();
    }
    return RecommendationEngine.instance;
  }

  async getRecommendations(
    context: RecommendationContext,
    limit: number = 10
  ): Promise<EventRecommendation[]> {
    const { user, location, timePreference, maxDistance } = context;

    // Get all events
    const allEvents = await db.getEvents();

    // Filter and score events
    const scoredEvents = await Promise.all(
      allEvents.map(async (event) => {
        const score = await this.calculateRelevanceScore(event, context);
        const reasons = this.generateReasons(event, context);

        return {
          event,
          score,
          reasons,
        };
      })
    );

    // Sort by score and limit results
    const recommendations = scoredEvents
      .filter(rec => rec.score > 0) // Only include relevant events
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return recommendations;
  }

  private async calculateRelevanceScore(
    event: Event,
    context: RecommendationContext
  ): Promise<number> {
    const { user, location, timePreference, maxDistance } = context;
    let score = 0;

    // Interest matching (40% weight)
    const interestOverlap = event.tags.filter(tag =>
      user.interests.includes(tag)
    ).length;
    const interestScore = (interestOverlap / Math.max(event.tags.length, 1)) * 0.4;
    score += interestScore;

    // Social connections (30% weight)
    const friendsAttending = event.attendeeIds.filter(attendeeId =>
      user.friendIds.includes(attendeeId)
    ).length;
    const friendsInterested = event.interestedUserIds.filter(interestedId =>
      user.friendIds.includes(interestedId)
    ).length;
    const socialScore = Math.min((friendsAttending + friendsInterested * 0.5) * 0.1, 0.3);
    score += socialScore;

    // Past attendance patterns (15% weight)
    const similarEventsAttended = user.attendedEventIds.filter(attendedId => {
      // In a real implementation, you'd compare event categories/tags
      // For now, just check if user has attended similar events
      return true; // Placeholder
    }).length;
    const historyScore = similarEventsAttended > 0 ? 0.15 : 0;
    score += historyScore;

    // Location proximity (10% weight)
    let locationScore = 0.1; // Default score
    if (location && event.location) {
      // Simple location matching - in production, use geocoding
      const locationMatch = event.location.toLowerCase().includes(location.toLowerCase());
      locationScore = locationMatch ? 0.1 : 0.05;
    }
    score += locationScore;

    // Time preference (5% weight)
    let timeScore = 0.05; // Default score
    if (timePreference && event.dateTime) {
      const eventHour = new Date(event.dateTime).getHours();
      const isPreferredTime = this.isPreferredTime(eventHour, timePreference);
      timeScore = isPreferredTime ? 0.05 : 0.025;
    }
    score += timeScore;

    return Math.min(score, 1.0); // Cap at 1.0
  }

  private generateReasons(event: Event, context: RecommendationContext): string[] {
    const { user } = context;
    const reasons: string[] = [];

    // Interest-based reasons
    const matchingInterests = event.tags.filter(tag =>
      user.interests.includes(tag)
    );
    if (matchingInterests.length > 0) {
      reasons.push(`Matches your interests: ${matchingInterests.join(', ')}`);
    }

    // Social reasons
    const friendsAttending = event.attendeeIds.filter(attendeeId =>
      user.friendIds.includes(attendeeId)
    );
    if (friendsAttending.length > 0) {
      reasons.push(`${friendsAttending.length} friend${friendsAttending.length > 1 ? 's' : ''} attending`);
    }

    // Popularity reasons
    if (event.socialBuzz && event.socialBuzz.totalAttending > 10) {
      reasons.push('Popular event with high attendance');
    }

    // Trending reasons
    if (event.socialBuzz && event.socialBuzz.trendingScore > 7) {
      reasons.push('Trending in your network');
    }

    return reasons;
  }

  private isPreferredTime(hour: number, preference: string): boolean {
    switch (preference) {
      case 'morning':
        return hour >= 6 && hour < 12;
      case 'afternoon':
        return hour >= 12 && hour < 17;
      case 'evening':
        return hour >= 17 && hour < 22;
      case 'night':
        return hour >= 22 || hour < 6;
      default:
        return true;
    }
  }

  async getTrendingEvents(limit: number = 5): Promise<Event[]> {
    const events = await db.getEvents();

    return events
      .filter(event => event.socialBuzz && event.socialBuzz.trendingScore > 5)
      .sort((a, b) => (b.socialBuzz?.trendingScore || 0) - (a.socialBuzz?.trendingScore || 0))
      .slice(0, limit);
  }

  async getEventsByFriends(user: User, limit: number = 10): Promise<Event[]> {
    const events = await db.getEvents();

    return events
      .filter(event => {
        const friendsAttending = event.attendeeIds.filter(attendeeId =>
          user.friendIds.includes(attendeeId)
        );
        const friendsInterested = event.interestedUserIds.filter(interestedId =>
          user.friendIds.includes(interestedId)
        );
        return friendsAttending.length > 0 || friendsInterested.length > 0;
      })
      .sort((a, b) => {
        const aFriends = a.attendeeIds.filter(id => user.friendIds.includes(id)).length +
                        a.interestedUserIds.filter(id => user.friendIds.includes(id)).length;
        const bFriends = b.attendeeIds.filter(id => user.friendIds.includes(id)).length +
                        b.interestedUserIds.filter(id => user.friendIds.includes(id)).length;
        return bFriends - aFriends;
      })
      .slice(0, limit);
  }
}

export const recommendationEngine = RecommendationEngine.getInstance();

