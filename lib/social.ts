import { User, Event, SocialConnection } from './types';
import { db } from './database';

export interface SocialActivity {
  id: string;
  type: 'rsvp' | 'interest' | 'comment' | 'share';
  userId: string;
  eventId: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export class SocialManager {
  private static instance: SocialManager;
  private activities: SocialActivity[] = [];

  static getInstance(): SocialManager {
    if (!SocialManager.instance) {
      SocialManager.instance = new SocialManager();
    }
    return SocialManager.instance;
  }

  async getFriendsAttending(event: Event, user: User): Promise<SocialConnection[]> {
    const friendIds = event.attendeeIds.filter(attendeeId =>
      user.friendIds.includes(attendeeId)
    );

    const friends = await db.getUsersByIds(friendIds);

    return friends.map(friend => ({
      userId: friend.userId,
      username: friend.username,
      displayName: friend.displayName,
      avatar: friend.avatar,
      relationship: 'friend' as const,
    }));
  }

  async getFriendsInterested(event: Event, user: User): Promise<SocialConnection[]> {
    const friendIds = event.interestedUserIds.filter(interestedId =>
      user.friendIds.includes(interestedId)
    );

    const friends = await db.getUsersByIds(friendIds);

    return friends.map(friend => ({
      userId: friend.userId,
      username: friend.username,
      displayName: friend.displayName,
      avatar: friend.avatar,
      relationship: 'friend' as const,
    }));
  }

  async recordActivity(activity: Omit<SocialActivity, 'id' | 'timestamp'>): Promise<void> {
    const newActivity: SocialActivity = {
      ...activity,
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };

    this.activities.push(newActivity);

    // In a real implementation, you'd also update the event's social buzz
    await this.updateEventSocialBuzz(activity.eventId);
  }

  async getRecentActivities(eventId: string, limit: number = 10): Promise<SocialActivity[]> {
    return this.activities
      .filter(activity => activity.eventId === eventId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async getUserActivity(userId: string, limit: number = 20): Promise<SocialActivity[]> {
    return this.activities
      .filter(activity => activity.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  private async updateEventSocialBuzz(eventId: string): Promise<void> {
    const event = await db.getEvent(eventId);
    if (!event) return;

    const recentActivities = this.activities
      .filter(activity => activity.eventId === eventId)
      .filter(activity => {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        return activity.timestamp > oneHourAgo;
      });

    // Calculate trending score based on recent activity
    const activityScore = recentActivities.length * 0.1;
    const attendanceScore = event.attendeeIds.length * 0.2;
    const interestScore = event.interestedUserIds.length * 0.1;

    const trendingScore = Math.min(activityScore + attendanceScore + interestScore, 10);

    const updatedEvent = await db.updateEvent(eventId, {
      socialBuzz: {
        friendsAttending: 0, // This would be calculated per user
        totalAttending: event.attendeeIds.length,
        trendingScore,
      },
    });

    if (updatedEvent) {
      console.log(`Updated social buzz for event ${eventId}: ${trendingScore}`);
    }
  }

  async getSocialBuzz(event: Event, user?: User): Promise<Event['socialBuzz']> {
    const recentActivities = this.activities
      .filter(activity => activity.eventId === event.eventId)
      .filter(activity => {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        return activity.timestamp > oneHourAgo;
      });

    const friendsAttending = user ?
      event.attendeeIds.filter(attendeeId => user.friendIds.includes(attendeeId)).length : 0;

    return {
      friendsAttending,
      totalAttending: event.attendeeIds.length,
      trendingScore: Math.min(recentActivities.length * 0.5, 10),
    };
  }

  async getMutualFriends(event: Event, user: User): Promise<SocialConnection[]> {
    const allAttendees = [...event.attendeeIds, ...event.interestedUserIds];
    const mutualFriendIds = allAttendees.filter(attendeeId =>
      user.friendIds.includes(attendeeId) && attendeeId !== user.userId
    );

    const mutualFriends = await db.getUsersByIds(mutualFriendIds);

    return mutualFriends.map(friend => ({
      userId: friend.userId,
      username: friend.username,
      displayName: friend.displayName,
      avatar: friend.avatar,
      relationship: 'friend' as const,
    }));
  }

  // Simulate real-time updates (in production, use WebSockets or Server-Sent Events)
  async pollForUpdates(eventId: string, since: Date): Promise<SocialActivity[]> {
    return this.activities
      .filter(activity =>
        activity.eventId === eventId &&
        activity.timestamp > since
      )
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}

export const socialManager = SocialManager.getInstance();

