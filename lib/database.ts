import { User, Event, Interest } from './types';

// Simple in-memory database for development
// In production, replace with PostgreSQL/Supabase/etc.

class Database {
  private users: Map<string, User> = new Map();
  private events: Map<string, Event> = new Map();
  private interests: Map<string, Interest> = new Map();

  // User operations
  async getUser(userId: string): Promise<User | null> {
    return this.users.get(userId) || null;
  }

  async createUser(user: User): Promise<User> {
    this.users.set(user.userId, user);
    return user;
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    const existing = this.users.get(userId);
    if (!existing) return null;

    const updated = { ...existing, ...updates };
    this.users.set(userId, updated);
    return updated;
  }

  async getUsersByIds(userIds: string[]): Promise<User[]> {
    return userIds
      .map(id => this.users.get(id))
      .filter((user): user is User => user !== undefined);
  }

  // Event operations
  async getEvent(eventId: string): Promise<Event | null> {
    return this.events.get(eventId) || null;
  }

  async getEvents(filters?: {
    category?: string;
    location?: string;
    dateFrom?: Date;
    dateTo?: Date;
    limit?: number;
  }): Promise<Event[]> {
    let events = Array.from(this.events.values());

    if (filters?.category) {
      events = events.filter(event =>
        event.tags.includes(filters.category!)
      );
    }

    if (filters?.location) {
      events = events.filter(event =>
        event.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters?.dateFrom) {
      events = events.filter(event =>
        new Date(event.dateTime) >= filters.dateFrom!
      );
    }

    if (filters?.dateTo) {
      events = events.filter(event =>
        new Date(event.dateTime) <= filters.dateTo!
      );
    }

    if (filters?.limit) {
      events = events.slice(0, filters.limit);
    }

    return events;
  }

  async createEvent(event: Event): Promise<Event> {
    this.events.set(event.eventId, event);
    return event;
  }

  async updateEvent(eventId: string, updates: Partial<Event>): Promise<Event | null> {
    const existing = this.events.get(eventId);
    if (!existing) return null;

    const updated = { ...existing, ...updates };
    this.events.set(eventId, updated);
    return updated;
  }

  async rsvpToEvent(eventId: string, userId: string, status: 'attending' | 'interested' | 'not_attending'): Promise<boolean> {
    const event = this.events.get(eventId);
    if (!event) return false;

    // Remove from all lists first
    event.attendeeIds = event.attendeeIds.filter(id => id !== userId);
    event.interestedUserIds = event.interestedUserIds.filter(id => id !== userId);

    // Add to appropriate list
    if (status === 'attending') {
      event.attendeeIds.push(userId);
    } else if (status === 'interested') {
      event.interestedUserIds.push(userId);
    }

    this.events.set(eventId, event);
    return true;
  }

  // Interest operations
  async getInterests(): Promise<Interest[]> {
    return Array.from(this.interests.values());
  }

  async createInterest(interest: Interest): Promise<Interest> {
    this.interests.set(interest.interestId, interest);
    return interest;
  }

  // Initialize with sample data
  async initializeSampleData(): Promise<void> {
    // Sample interests
    const interests: Interest[] = [
      { interestId: 'music', name: 'Music & Concerts' },
      { interestId: 'tech', name: 'Technology & AI' },
      { interestId: 'art', name: 'Art & Culture' },
      { interestId: 'sports', name: 'Sports & Fitness' },
      { interestId: 'food', name: 'Food & Dining' },
      { interestId: 'social', name: 'Social & Networking' },
    ];

    interests.forEach(interest => this.interests.set(interest.interestId, interest));

    // Sample users
    const users: User[] = [
      {
        userId: 'fc_123',
        username: 'alice',
        displayName: 'Alice Chen',
        interests: ['music', 'tech', 'art'],
        attendedEventIds: ['event_1'],
        friendIds: ['fc_124', 'fc_125'],
      },
      {
        userId: 'fc_124',
        username: 'bob',
        displayName: 'Bob Smith',
        interests: ['tech', 'sports'],
        attendedEventIds: ['event_2'],
        friendIds: ['fc_123', 'fc_125'],
      },
    ];

    users.forEach(user => this.users.set(user.userId, user));
  }
}

export const db = new Database();

// Initialize sample data on module load
db.initializeSampleData().catch(console.error);

