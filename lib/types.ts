export interface User {
  userId: string; // Farcaster ID
  username: string;
  displayName?: string;
  avatar?: string;
  interests: string[];
  attendedEventIds: string[];
  friendIds: string[];
}

export interface Event {
  eventId: string;
  name: string;
  description: string;
  dateTime: string;
  location: string;
  imageUrl?: string;
  tags: string[];
  hostUserId: string;
  hostName?: string;
  attendeeIds: string[];
  interestedUserIds: string[];
  socialBuzz?: {
    friendsAttending: number;
    totalAttending: number;
    trendingScore: number;
  };
}

export interface Interest {
  interestId: string;
  name: string;
  category?: string;
}

export interface SocialConnection {
  userId: string;
  username: string;
  displayName?: string;
  avatar?: string;
  mutualFriends?: number;
}

export interface EventRecommendation {
  event: Event;
  score: number;
  reasons: string[];
  friendsAttending: SocialConnection[];
}
