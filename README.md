# VibePulse - Base Mini App

Discover local events that match your mood and connections.

## Features

- **Personalized Event Recommendations**: AI-powered suggestions based on your interests and past attendance
- **Social Circle Integration**: See events your friends are attending or interested in
- **Interest-Based Groupings**: Find events popular within your communities
- **Real-time Social Buzz**: Live indicators of event popularity and engagement

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base (via MiniKit)
- **Identity**: Farcaster integration
- **TypeScript**: Full type safety

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your API keys
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout with providers
│   ├── page.tsx        # Main page
│   ├── providers.tsx   # MiniKit provider setup
│   └── globals.css     # Global styles
├── components/         # Reusable UI components
│   ├── EventCard.tsx   # Event display component
│   ├── EventFeed.tsx   # Event recommendations feed
│   ├── FrameHeader.tsx # App header
│   └── ...
├── lib/               # Utilities and types
│   ├── types.ts       # TypeScript definitions
│   └── mockData.ts    # Sample data
└── public/            # Static assets
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
