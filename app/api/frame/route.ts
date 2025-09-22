import { NextRequest, NextResponse } from 'next/server';
import { generateRecommendations, mockEvents } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  // Initial frame load - return the main event discovery frame
  const recommendations = generateRecommendations().slice(0, 3); // Show top 3

  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image?type=main" />
        <meta property="fc:frame:button:1" content="Discover Events" />
        <meta property="fc:frame:button:2" content="My Interests" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_APP_URL}/api/frame/action" />
        <meta property="og:title" content="VibePulse" />
        <meta property="og:description" content="Discover local events that match your mood and connections." />
        <meta property="og:image" content="${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image?type=main" />
      </head>
      <body>
        <div style="display: none;">VibePulse Frame</div>
      </body>
    </html>
  `;

  return new NextResponse(frameHtml, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

export async function POST(request: NextRequest) {
  // Handle frame button clicks
  const body = await request.json();
  const { untrustedData } = body;

  if (!untrustedData) {
    return NextResponse.json({ error: 'Invalid frame data' }, { status: 400 });
  }

  const buttonIndex = untrustedData.buttonIndex;
  const fid = untrustedData.fid;

  // For now, return the main discovery frame
  // In a real app, you'd check user authentication and return personalized content
  const recommendations = generateRecommendations().slice(0, 3);

  let frameHtml = '';

  if (buttonIndex === 1) {
    // Discover Events - show event recommendations
    frameHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image?type=events&fid=${fid}" />
          <meta property="fc:frame:button:1" content="View Event 1" />
          <meta property="fc:frame:button:2" content="View Event 2" />
          <meta property="fc:frame:button:3" content="View Event 3" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_APP_URL}/api/frame/action" />
        </head>
        <body>
          <div style="display: none;">Event Recommendations</div>
        </body>
      </html>
    `;
  } else if (buttonIndex === 2) {
    // My Interests - show interest selection
    frameHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image?type=interests" />
          <meta property="fc:frame:button:1" content="Music & Nightlife" />
          <meta property="fc:frame:button:2" content="Tech & Business" />
          <meta property="fc:frame:button:3" content="Art & Culture" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_APP_URL}/api/frame/action" />
        </head>
        <body>
          <div style="display: none;">Select Your Interests</div>
        </body>
      </html>
    `;
  }

  return new NextResponse(frameHtml, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

