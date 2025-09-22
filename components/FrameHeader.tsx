'use client';

import { useMiniKit } from '@coinbase/minikit';

export function FrameHeader() {
  const { context } = useMiniKit();
  
  const displayName = context?.user?.displayName || 'Friend';

  return (
    <header className="mb-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-display text-gray-900">
          VibePulse
        </h1>
        <div className="flex items-center space-x-2">
          {context?.user?.pfpUrl && (
            <img
              src={context.user.pfpUrl}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-primary"
            />
          )}
        </div>
      </div>
      <p className="text-body text-muted">
        Discover events that match your vibe, {displayName}
      </p>
    </header>
  );
}
