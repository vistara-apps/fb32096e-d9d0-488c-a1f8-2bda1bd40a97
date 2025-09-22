# VibePulse API Documentation

## Overview

VibePulse is a Base Mini App that helps users discover local events based on their interests and social connections. This document outlines the API endpoints and data structures used in the application.

## Base URL

```
https://your-domain.com/api
```

## Authentication

All API endpoints require Farcaster authentication. The user's Farcaster ID (FID) is used as the primary identifier.

## Data Models

### User

```typescript
interface User {
  userId: string;        // Farcaster ID (fc_{fid})
  username: string;      // Farcaster username
  displayName?: string;  // Display name
  avatar?: string;       // Profile picture URL
  interests: string[];   // Array of interest IDs
  attendedEventIds: string[]; // Events user has attended
  friendIds: string[];   // Array of friend Farcaster IDs
}
```

### Event

```typescript
interface Event {
  eventId: string;
  name: string;
  description: string;
  dateTime: string;      // ISO 8601 date string
  location: string;
  tags: string[];        // Interest categories
  hostUserId: string;
  attendeeIds: string[];
  interestedUserIds: string[];
  socialBuzz?: {
    friendsAttending: number;
    totalAttending: number;
    trendingScore: number;
  };
}
```

### Interest

```typescript
interface Interest {
  interestId: string;
  name: string;
}
```

## API Endpoints

### User Management

#### GET /api/user

Get user profile information.

**Parameters:**
- `userId` (query): Farcaster user ID

**Response:**
```json
{
  "user": {
    "userId": "fc_123",
    "username": "alice",
    "displayName": "Alice Chen",
    "interests": ["music", "tech"],
    "attendedEventIds": ["event_1"],
    "friendIds": ["fc_124"]
  }
}
```

#### POST /api/user

Update user profile.

**Body:**
```json
{
  "userId": "fc_123",
  "updates": {
    "interests": ["music", "art"],
    "displayName": "Alice Chen"
  }
}
```

#### PUT /api/user

Create or update user profile.

**Body:**
```json
{
  "userId": "fc_123",
  "username": "alice",
  "interests": ["music", "tech"]
}
```

### Recommendations

#### GET /api/recommendations

Get personalized event recommendations.

**Parameters:**
- `userId` (query): Farcaster user ID
- `limit` (query, optional): Maximum number of recommendations (default: 10)

**Response:**
```json
{
  "recommendations": [
    {
      "event": { /* Event object */ },
      "score": 0.85,
      "reasons": [
        "Matches your interests: Music & Concerts",
        "2 friends attending"
      ]
    }
  ]
}
```

#### POST /api/recommendations

Get recommendations with custom context.

**Body:**
```json
{
  "userId": "fc_123",
  "context": {
    "location": "San Francisco",
    "timePreference": "evening",
    "maxDistance": 10
  },
  "limit": 5
}
```

### Frame Integration

#### POST /api/frame/action

Handle Farcaster frame button interactions.

**Body (from Farcaster):**
```json
{
  "untrustedData": {
    "fid": 123,
    "buttonIndex": 1,
    "state": "{\"eventId\":\"event_1\"}"
  }
}
```

**Supported Button Actions:**
1. **Discover Events**: Returns personalized event recommendations
2. **My Interests**: Shows interest selection interface
3. **Event Details**: Shows detailed event information
4. **RSVP Attending**: Marks user as attending event
5. **RSVP Interested**: Marks user as interested in event
6. **Friends Attending**: Shows which friends are attending

**Response:** HTML frame content

#### GET /api/frame/image

Generate dynamic OG images for frames.

**Parameters:**
- `type` (query): Image type (`main`, `events`, `event`, `interests`)
- `id` (query, optional): Event ID for event-specific images
- `fid` (query, optional): User FID for personalized images

### Events (Internal)

#### GET /api/events

Get events (internal endpoint).

**Parameters:**
- `category` (query, optional): Filter by interest category
- `location` (query, optional): Filter by location
- `dateFrom` (query, optional): Filter events from date
- `dateTo` (query, optional): Filter events to date
- `limit` (query, optional): Maximum number of events

## Error Handling

All endpoints return standardized error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

**Common Error Codes:**
- `VALIDATION_ERROR`: Invalid input data
- `AUTHENTICATION_ERROR`: Authentication required
- `NOT_FOUND_ERROR`: Resource not found
- `INTERNAL_ERROR`: Server error

## Rate Limiting

- API endpoints are rate limited to prevent abuse
- Frame actions: 10 requests per minute per user
- Recommendations: 30 requests per minute per user
- User updates: 5 requests per minute per user

## Caching

- Recommendations are cached for 5 minutes
- User profiles are cached for 10 minutes
- Event data is cached for 2 minutes

## Webhooks

The application supports webhooks for real-time updates:

- **Event Updates**: When events are created/modified
- **Social Activity**: When users RSVP or interact with events
- **Notifications**: For sending push notifications via Farcaster

## Security

- All requests validate Farcaster signatures
- Input sanitization on all endpoints
- Rate limiting prevents abuse
- CORS configured for Farcaster domains

## Monitoring

- Error logging to console (production: external service)
- Performance metrics for API response times
- User activity tracking for analytics

## Development

### Environment Variables

```env
NEXT_PUBLIC_MINIKIT_API_KEY=your_minikit_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Testing

Use the following test FIDs for development:
- `fc_123`: Alice (music, tech interests)
- `fc_124`: Bob (tech, sports interests)
- `fc_125`: Charlie (art, social interests)

## Deployment

The application is designed to run on Vercel with the following requirements:

- Node.js 18+
- Next.js 15+
- PostgreSQL database (production)
- Redis for caching (production)

## Support

For API support or questions:
- Check the error logs in the console
- Verify Farcaster authentication is working
- Ensure all required environment variables are set

