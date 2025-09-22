'use client';

import { useState, useEffect } from 'react';
import { User, Event } from '@/lib/types';
import { socialManager } from '@/lib/social';
import { UserAvatarStack } from './UserAvatarStack';

interface SocialBuzzProps {
  user?: User;
  events?: Event[];
}

export function SocialBuzz({ user, events = [] }: SocialBuzzProps) {
  const [friendsGoingOut, setFriendsGoingOut] = useState<User[]>([]);
  const [totalEventsTonight, setTotalEventsTonight] = useState(0);
  const [averageMatchScore, setAverageMatchScore] = useState(0);

  useEffect(() => {
    if (!user) return;

    const updateSocialData = async () => {
      try {
        // Get friends attending events tonight
        const tonight = new Date();
        tonight.setHours(18, 0, 0, 0); // 6 PM tonight

        const tonightEvents = events.filter(event => {
          const eventDate = new Date(event.dateTime);
          return eventDate.toDateString() === tonight.toDateString() &&
                 eventDate.getHours() >= 18;
        });

        setTotalEventsTonight(tonightEvents.length);

        // Get friends attending these events
        const friendIds = new Set<string>();
        for (const event of tonightEvents) {
          const friends = await socialManager.getFriendsAttending(event, user);
          friends.forEach(friend => friendIds.add(friend.userId));
        }

        const uniqueFriends = Array.from(friendIds)
          .slice(0, 5) // Limit to 5 friends
          .map(id => ({ userId: id } as User)); // Simplified

        setFriendsGoingOut(uniqueFriends);

        // Calculate average match score (simplified)
        const scores = tonightEvents.map(() => Math.random() * 100); // Mock scores
        const avgScore = scores.length > 0 ?
          Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
        setAverageMatchScore(avgScore);

      } catch (error) {
        console.error('Error updating social buzz:', error);
      }
    };

    updateSocialData();

    // Update every 30 seconds
    const interval = setInterval(updateSocialData, 30000);
    return () => clearInterval(interval);
  }, [user, events]);

  return (
    <section className="animate-slide-up">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        🔥 What's Buzzing
      </h2>

      <div className="card p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">
              {friendsGoingOut.length > 0 ? 'Friends are going out tonight' : 'Discover events tonight'}
            </p>
            <p className="text-xs text-muted">
              {totalEventsTonight} events happening • {friendsGoingOut.length} friends attending
            </p>
          </div>
          {friendsGoingOut.length > 0 && (
            <UserAvatarStack users={friendsGoingOut} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="card p-3 text-center">
          <div className="text-lg font-bold text-primary">{totalEventsTonight}</div>
          <div className="text-xs text-muted">Events Tonight</div>
        </div>
        <div className="card p-3 text-center">
          <div className="text-lg font-bold text-accent">{averageMatchScore}%</div>
          <div className="text-xs text-muted">Avg Match Score</div>
        </div>
      </div>
    </section>
  );
}
