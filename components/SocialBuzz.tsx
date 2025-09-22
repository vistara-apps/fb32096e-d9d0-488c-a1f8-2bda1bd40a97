'use client';

import { mockFriends } from '@/lib/mockData';
import { UserAvatarStack } from './UserAvatarStack';

export function SocialBuzz() {
  return (
    <section className="animate-slide-up">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        🔥 What's Buzzing
      </h2>
      
      <div className="card p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Friends are going out tonight
            </p>
            <p className="text-xs text-muted">
              3 events with your connections
            </p>
          </div>
          <UserAvatarStack users={mockFriends.slice(0, 3)} />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="card p-3 text-center">
          <div className="text-lg font-bold text-primary">12</div>
          <div className="text-xs text-muted">Events Tonight</div>
        </div>
        <div className="card p-3 text-center">
          <div className="text-lg font-bold text-accent">85%</div>
          <div className="text-xs text-muted">Match Score</div>
        </div>
      </div>
    </section>
  );
}
