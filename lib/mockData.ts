import { Event, User, EventRecommendation } from './types';

export const mockUser: User = {
  userId: 'fc_user_123',
  username: 'vibefinder',
  displayName: 'Alex Chen',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  interests: ['music', 'tech', 'art', 'nightlife'],
  attendedEventIds: ['event_1', 'event_3'],
  friendIds: ['fc_friend_1', 'fc_friend_2', 'fc_friend_3'],
};

export const mockEvents: Event[] = [
  {
    eventId: 'event_1',
    name: 'Rooftop Jazz & Cocktails',
    description: 'Smooth jazz vibes with craft cocktails overlooking the city skyline.',
    dateTime: '2024-01-20T19:00:00Z',
    location: 'Sky Lounge, Downtown',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop',
    tags: ['music', 'nightlife', 'cocktails', 'jazz'],
    hostUserId: 'host_1',
    hostName: 'Sky Lounge',
    attendeeIds: ['fc_friend_1', 'fc_friend_2'],
    interestedUserIds: ['fc_friend_3'],
    socialBuzz: {
      friendsAttending: 2,
      totalAttending: 45,
      trendingScore: 8.5,
    },
  },
  {
    eventId: 'event_2',
    name: 'Tech Startup Mixer',
    description: 'Network with fellow entrepreneurs and tech enthusiasts.',
    dateTime: '2024-01-21T18:30:00Z',
    location: 'Innovation Hub, Tech District',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop',
    tags: ['tech', 'networking', 'startup', 'business'],
    hostUserId: 'host_2',
    hostName: 'Innovation Hub',
    attendeeIds: ['fc_friend_3'],
    interestedUserIds: ['fc_friend_1'],
    socialBuzz: {
      friendsAttending: 1,
      totalAttending: 32,
      trendingScore: 7.2,
    },
  },
  {
    eventId: 'event_3',
    name: 'Underground Art Gallery Opening',
    description: 'Discover emerging artists in an intimate gallery setting.',
    dateTime: '2024-01-22T20:00:00Z',
    location: 'The Vault Gallery, Arts Quarter',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop',
    tags: ['art', 'gallery', 'culture', 'wine'],
    hostUserId: 'host_3',
    hostName: 'The Vault Gallery',
    attendeeIds: ['fc_friend_2'],
    interestedUserIds: ['fc_friend_1', 'fc_friend_3'],
    socialBuzz: {
      friendsAttending: 1,
      totalAttending: 28,
      trendingScore: 9.1,
    },
  },
  {
    eventId: 'event_4',
    name: 'Late Night Dance Party',
    description: 'Electronic beats and neon lights until dawn.',
    dateTime: '2024-01-23T22:00:00Z',
    location: 'Pulse Club, Entertainment District',
    imageUrl: 'https://images.unsplash.com/photo-1571266028243-d220c9c3b2d2?w=400&h=200&fit=crop',
    tags: ['nightlife', 'dance', 'electronic', 'party'],
    hostUserId: 'host_4',
    hostName: 'Pulse Club',
    attendeeIds: ['fc_friend_1', 'fc_friend_3'],
    interestedUserIds: ['fc_friend_2'],
    socialBuzz: {
      friendsAttending: 2,
      totalAttending: 67,
      trendingScore: 8.8,
    },
  },
];

export const mockFriends = [
  {
    userId: 'fc_friend_1',
    username: 'musiclover',
    displayName: 'Sarah Kim',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  },
  {
    userId: 'fc_friend_2',
    username: 'artguru',
    displayName: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    userId: 'fc_friend_3',
    username: 'techie',
    displayName: 'Emma Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
];

export const generateRecommendations = (): EventRecommendation[] => {
  return mockEvents.map(event => ({
    event,
    score: Math.random() * 10,
    reasons: generateReasons(event),
    friendsAttending: mockFriends.filter(friend => 
      event.attendeeIds.includes(friend.userId)
    ),
  })).sort((a, b) => b.score - a.score);
};

function generateReasons(event: Event): string[] {
  const reasons = [];
  
  if (event.socialBuzz && event.socialBuzz.friendsAttending > 0) {
    reasons.push(`${event.socialBuzz.friendsAttending} friends attending`);
  }
  
  if (event.tags.some(tag => mockUser.interests.includes(tag))) {
    reasons.push('Matches your interests');
  }
  
  if (event.socialBuzz && event.socialBuzz.trendingScore > 8) {
    reasons.push('Trending in your area');
  }
  
  return reasons;
}
