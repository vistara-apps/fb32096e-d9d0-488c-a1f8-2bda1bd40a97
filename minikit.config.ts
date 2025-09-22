export const minikitConfig = {
  accountAssociation: {
    // This will be filled in after deployment with proper account association
    header: "",
    payload: "",
    signature: ""
  },
  miniapp: {
    version: "1",
    name: "VibePulse",
    subtitle: "Discover local events that match your vibe",
    description: "A Base Mini App for discovering local events tailored to your interests and social connections. Find parties, meetups, and gatherings with like-minded people.",
    screenshotUrls: [
      `${process.env.NEXT_PUBLIC_APP_URL}/screenshot1.png`,
      `${process.env.NEXT_PUBLIC_APP_URL}/screenshot2.png`
    ],
    iconUrl: `${process.env.NEXT_PUBLIC_APP_URL}/icon.svg`,
    splashImageUrl: `${process.env.NEXT_PUBLIC_APP_URL}/splash.svg`,
    splashBackgroundColor: "#ffffff",
    homeUrl: process.env.NEXT_PUBLIC_APP_URL,
    webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["events", "social", "discovery", "local", "networking"],
    heroImageUrl: `${process.env.NEXT_PUBLIC_APP_URL}/hero.png`,
    tagline: "Discover events that match your mood and connections",
    ogTitle: "VibePulse - Event Discovery Made Social",
    ogDescription: "Find local events tailored to your interests and see what your friends are attending",
    ogImageUrl: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
  },
} as const;
