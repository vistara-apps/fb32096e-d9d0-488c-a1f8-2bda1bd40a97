'use client';

import { MiniKitProvider } from '@coinbase/minikit';
import { base } from 'wagmi/chains';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MiniKitProvider
      chain={base}
      apiKey={process.env.NEXT_PUBLIC_MINIKIT_API_KEY || 'demo-api-key'}
    >
      {children}
    </MiniKitProvider>
  );
}
