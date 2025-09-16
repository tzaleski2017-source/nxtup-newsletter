# NXTUP Frontend Integration Guide

## Overview
This is a standalone React frontend for NXTUP that can be easily integrated with any backend system. The frontend is built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Tech Stack
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **Lucide React** for icons
- **React Router** for navigation

## Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── HeroSection.tsx  # Landing hero with logo & CTA
│   ├── FeaturedStreamers.tsx  # Streamer cards grid
│   ├── SubscribeSection.tsx   # Newsletter subscription
│   └── Footer.tsx       # Site footer
├── assets/              # Static assets (images, etc.)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Route components
└── index.css           # Design system & global styles
```

## Design System
All styling is centralized in:
- `src/index.css` - CSS variables and utility classes
- `tailwind.config.ts` - Tailwind configuration
- Colors use HSL format for consistency
- Gradient system with neon purple → aqua theme

## Backend Integration Points

### 1. Newsletter Subscription
**File:** `src/components/SubscribeSection.tsx`
**Current:** Mock subscription with toast notification
**Integration:** Replace the `handleSubmit` function to call your API:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    // Handle response...
  } catch (error) {
    // Handle error...
  }
};
```

### 2. Featured Streamers Data
**File:** `src/components/FeaturedStreamers.tsx`
**Current:** Static mock data
**Integration:** Replace with API fetch:

```typescript
const [streamers, setStreamers] = useState([]);

useEffect(() => {
  fetch('/api/streamers/featured')
    .then(res => res.json())
    .then(setStreamers);
}, []);
```

**Expected API Response Format:**
```json
{
  "streamers": [
    {
      "id": 1,
      "name": "StreamerName",
      "image": "profile_image_url",
      "bio": "First line bio",
      "bioSecond": "Second line bio",
      "rating": 87,
      "followers": "45.2K",
      "avgViewers": "2.1K",
      "growth": "+340%"
    }
  ]
}
```

### 3. Analytics Integration
Add tracking to key interactions:
- Newsletter signups
- Streamer card clicks
- Page views

## Environment Setup

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
# Output in /dist folder
```

### Deployment Options
1. **Static Hosting:** Deploy `/dist` folder to any static host
2. **Backend Integration:** Serve built files from your backend's static folder
3. **CDN:** Upload assets to CDN and update paths

## API Endpoints Needed
1. `POST /api/subscribe` - Newsletter subscription
2. `GET /api/streamers/featured` - Featured streamers data
3. `GET /api/streamers/:id` - Individual streamer details (future)

## Customization Guide

### Branding
- Update colors in `src/index.css` (HSL format)
- Replace logo text in `src/components/HeroSection.tsx`
- Update social links in `src/components/Footer.tsx`

### Content
- Modify taglines and copy throughout components
- Update meta tags in `index.html`
- Replace hero background image in `src/assets/`

### Styling
- All design tokens are in `src/index.css`
- Tailwind config in `tailwind.config.ts`
- Component-specific styles use design system tokens

## Notes
- Mobile-responsive design included
- Dark theme optimized (no light mode toggle needed)
- Toast notifications included for user feedback
- Smooth animations and hover effects
- SEO-optimized with proper meta tags
- Performance optimized with lazy loading where applicable

## Support
The frontend is self-contained and ready for integration. All external dependencies are properly managed through npm/package.json.