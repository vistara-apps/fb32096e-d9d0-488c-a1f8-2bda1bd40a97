'use client';

import { Event } from '@/lib/types';
import { UserAvatarStack } from './UserAvatarStack';
import { mockFriends } from '@/lib/mockData';
import { CTAButton } from './CTAButton';

interface EventCardProps {
  event: Event;
  variant?: 'compact' | 'detailed';
  friendsAttending?: Array<{
    userId: string;
    username: string;
    displayName?: string;
    avatar?: string;
  }>;
}

export function EventCard({ 
  event, 
  variant = 'compact',
  friendsAttending = []
}: EventCardProps) {
  const eventDate = new Date(event.dateTime);
  const isToday = eventDate.toDateString() === new Date().toDateString();
  const timeString = eventDate.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  const attendingFriends = mockFriends.filter(friend => 
    event.attendeeIds.includes(friend.userId)
  );

  return (
    <div className="card p-4 hover:shadow-lg transition-shadow duration-200 animate-slide-up">
      <div className="flex space-x-3">
        {/* Event Image */}
        <div className="flex-shrink-0">
          <img
            src={event.imageUrl || 'https://via.placeholder.com/64x64?text=🎉'}
            alt={event.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        </div>
        
        {/* Event Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                {event.name}
              </h3>
              
              <div className="flex items-center space-x-2 text-xs text-muted mb-2">
                <span>{isToday ? 'Today' : eventDate.toLocaleDateString()}</span>
                <span>•</span>
                <span>{timeString}</span>
              </div>
              
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {event.location}
              </p>
            </div>
            
            {/* Social Buzz Indicator */}
            {event.socialBuzz && event.socialBuzz.trendingScore > 8 && (
              <div className="flex-shrink-0 ml-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                  🔥 Hot
                </span>
              </div>
            )}
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {event.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Social Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {attendingFriends.length > 0 && (
                <>
                  <UserAvatarStack users={attendingFriends} maxVisible={2} />
                  <span className="text-xs text-muted">
                    {attendingFriends.length === 1 
                      ? `${attendingFriends[0].displayName || attendingFriends[0].username} is going`
                      : `${attendingFriends.length} friends going`
                    }
                  </span>
                </>
              )}
              
              {event.socialBuzz && (
                <span className="text-xs text-muted">
                  {event.socialBuzz.totalAttending} attending
                </span>
              )}
            </div>
            
            <div className="flex space-x-2">
              <CTAButton variant="secondary" size="sm">
                Interested
              </CTAButton>
              <CTAButton variant="primary" size="sm">
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
