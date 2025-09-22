'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { FrameHeader } from '@/components/FrameHeader';
import { EventFeed } from '@/components/EventFeed';
import { SocialBuzz } from '@/components/SocialBuzz';
import { LoadingSpinner } from '@/components/LoadingSpinner';

function HomeContent() {
  return (
    <div className="space-y-6">
      <ErrorBoundary>
        <SocialBuzz />
      </ErrorBoundary>

      <ErrorBoundary>
        <EventFeed />
      </ErrorBoundary>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="container">
        <FrameHeader />

        <Suspense fallback={
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" message="Loading your personalized events..." />
          </div>
        }>
          <HomeContent />
        </Suspense>
      </div>
    </main>
  );
}
