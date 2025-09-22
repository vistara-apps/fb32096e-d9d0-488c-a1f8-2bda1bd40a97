import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VibePulse - Discover Events That Match Your Vibe',
  description: 'Discover local events that match your mood and connections.',
  openGraph: {
    title: 'VibePulse',
    description: 'Discover local events that match your mood and connections.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibePulse',
    description: 'Discover local events that match your mood and connections.',
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image?type=main`,
    'fc:frame:button:1': 'Discover Events',
    'fc:frame:button:2': 'My Interests',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/action`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
