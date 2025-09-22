import { FrameHeader } from '@/components/FrameHeader';
import { EventFeed } from '@/components/EventFeed';
import { SocialBuzz } from '@/components/SocialBuzz';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="container">
        <FrameHeader />
        <div className="space-y-6">
          <SocialBuzz />
          <EventFeed />
        </div>
      </div>
    </main>
  );
}
