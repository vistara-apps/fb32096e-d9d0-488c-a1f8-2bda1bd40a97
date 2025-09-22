# VibePulse - Base Mini App

Discover local events that match your mood and connections.

## Features

- **Personalized Event Recommendations**: AI-powered suggestions based on your interests and past attendance
- **Social Circle Integration**: See events your friends are attending or interested in
- **Interest-Based Groupings**: Find events popular within your communities
- **Real-time Social Buzz**: Live indicators of event popularity and engagement
- **Interest Onboarding**: Personalized setup flow for new users
- **Micro-transactions**: Optional premium features with Base payments
- **Real-time Updates**: Live social activity and event status
- **Mobile-Optimized**: Perfect for Farcaster frames and mobile browsing

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base (via MiniKit)
- **Identity**: Farcaster integration
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 22.11.0 or higher
- npm or yarn package manager
- Farcaster account (for testing)
- Vercel account (for deployment)

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd vibepulse
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# MiniKit Configuration
NEXT_PUBLIC_MINIKIT_API_KEY=your_minikit_api_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (optional - for production)
# DATABASE_URL=your_database_url_here
```

### Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Mini App Configuration

After deployment, update the manifest:

1. Go to Base Build Account Association tool
2. Generate account association credentials
3. Update `minikit.config.ts` with the credentials
4. Redeploy

### Testing in Farcaster

1. Enable Developer Mode in Farcaster
2. Use the Base Preview tool to test frames
3. Share your app URL in Farcaster to test

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── frame/               # Frame integration
│   │   │   ├── action/route.ts  # Frame button actions
│   │   │   ├── image/route.ts   # Dynamic OG images
│   │   │   └── route.ts         # Main frame handler
│   │   ├── recommendations/     # Event recommendations
│   │   │   └── route.ts
│   │   └── user/                # User management
│   │       └── route.ts
│   ├── onboarding/              # User onboarding flow
│   │   └── page.tsx
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Main page
│   ├── providers.tsx            # MiniKit provider setup
│   └── globals.css              # Global styles
├── components/                  # Reusable UI components
│   ├── ErrorBoundary.tsx        # Error handling
│   ├── EventCard.tsx           # Event display component
│   ├── EventFeed.tsx           # Event recommendations feed
│   ├── FrameHeader.tsx         # App header
│   ├── InterestSelector.tsx    # Interest selection
│   ├── LoadingSpinner.tsx      # Loading states
│   ├── SocialBuzz.tsx          # Social activity display
│   └── ...
├── lib/                        # Utilities and business logic
│   ├── auth.ts                 # Authentication management
│   ├── cache.ts                # Caching utilities
│   ├── database.ts             # Data access layer
│   ├── errorHandling.ts        # Error handling utilities
│   ├── recommendations.ts      # Recommendation engine
│   ├── social.ts               # Social features
│   ├── types.ts                # TypeScript definitions
│   └── utils.ts                # Helper functions
├── API_DOCUMENTATION.md        # Comprehensive API docs
├── README.md                   # This file
└── public/                     # Static assets
```

## Design System

The app uses a custom design system based on Base's design principles:

- **Colors**: Primary blue, accent orange, neutral grays
- **Typography**: Inter font with semantic sizing
- **Spacing**: 8px grid system
- **Components**: Modular, reusable UI components

## Base Mini App Features

- **Frame Integration**: Optimized for Farcaster frames
- **Social Authentication**: Farcaster identity integration
- **Mobile-First**: Responsive design for mobile frames
- **Real-time Updates**: Live event and social data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
