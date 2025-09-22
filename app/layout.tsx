import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
