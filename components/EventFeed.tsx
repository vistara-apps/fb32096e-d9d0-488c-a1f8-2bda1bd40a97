'use client';

import { useState, useEffect } from 'react';
import { EventCard } from './EventCard';
import { CTAButton } from './CTAButton';
import { generateRecommendations } from '@/lib/mockData';
import { EventRecommendation } from '@/lib/types';

export function EventFeed() {
  const [recommendations, setRecommendations] = useState<EventRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'friends' | 'trending'>('all');

  useEffect(() => {
    // Simulate API call
    const loadRecommendations = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const recs = generateRecommendations();
      setRecommendations(recs);
      setLoading(false);
    };

    loadRecommendations();
  }, []);

  const filteredRecommendations = recommendations.filter(rec => {
    switch (filter) {
      case 'friends':
        return rec.friendsAttending.length > 0;
      case 'trending':
        return rec.event.socialBuzz && rec.event.socialBuzz.trendingScore > 8;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recommended for You
          </h2>
        </div>
        
        {/* Loading skeleton */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="flex space-x-3">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Recommended for You
        </h2>
        
        <div className="flex space-x-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('friends')}
            className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${
              filter === 'friends'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Friends
          </button>
          <button
            onClick={() => setFilter('trending')}
            className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${
              filter === 'trending'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Trending
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredRecommendations.length > 0 ? (
          filteredRecommendations.map((recommendation) => (
            <div key={recommendation.event.eventId}>
              <EventCard
                event={recommendation.event}
                friendsAttending={recommendation.friendsAttending}
              />
              
              {/* Recommendation reasons */}
              {recommendation.reasons.length > 0 && (
                <div className="mt-2 ml-4">
                  <div className="flex flex-wrap gap-1">
                    {recommendation.reasons.map((reason, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent"
                      >
                        ✨ {reason}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="card p-8 text-center">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="font-semibold text-gray-900 mb-2">
              No events match your filter
            </h3>
            <p className="text-muted text-sm mb-4">
              Try adjusting your filters or check back later for new events.
            </p>
            <CTAButton onClick={() => setFilter('all')}>
              Show All Events
            </CTAButton>
          </div>
        )}
      </div>
      
      {/* Load More Button */}
      {filteredRecommendations.length > 0 && (
        <div className="mt-6 text-center">
          <CTAButton variant="secondary">
            Load More Events
          </CTAButton>
        </div>
      )}
    </section>
  );
}
