# NXTUP Frontend Deployment Guide

## Quick Start for Backend Integration

### 1. Copy Frontend Files
Copy these files/folders to your backend project:
```
src/                    # All React components and logic
public/                 # Static assets
index.html             # Entry point
tailwind.config.ts     # Styling configuration
vite.config.ts         # Build configuration
package-frontend.json  # Dependencies (rename to package.json)
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure API Endpoints
Edit `src/services/api.ts`:
```typescript
const API_BASE_URL = process.env.VITE_API_URL || 'https://your-backend.com/api';
```

### 4. Environment Variables
Create `.env` file:
```env
VITE_API_URL=https://your-backend.com/api
VITE_ANALYTICS_ID=your-analytics-id
```

## Build for Production

### Static Build (Recommended)
```bash
npm run build
```
Output: `dist/` folder - serve these static files

### Development
```bash
npm run dev
```
Runs on `http://localhost:5173`

## Backend Integration Options

### Option 1: Static File Serving
Serve the `dist/` folder contents from your backend:
- Express: `app.use(express.static('dist'))`
- Django: Configure `STATICFILES_DIRS`
- Rails: Place in `public/` folder

### Option 2: CDN Deployment
1. Upload `dist/` contents to your CDN
2. Configure your backend to serve `index.html` for SPA routes

### Option 3: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## Required Backend Endpoints

### Newsletter Subscription
```http
POST /api/subscribe
Content-Type: application/json

{
  "email": "user@example.com"
}

Response:
{
  "subscribed": true,
  "message": "Successfully subscribed"
}
```

### Featured Streamers
```http
GET /api/streamers/featured

Response:
{
  "streamers": [
    {
      "id": 1,
      "name": "StreamerName",
      "image": "https://...",
      "bio": "Short bio",
      "bioSecond": "Second line",
      "rating": 87,
      "followers": "45.2K",
      "avgViewers": "2.1K",
      "growth": "+340%"
    }
  ]
}
```

### Analytics (Optional)
```http
POST /api/analytics
Content-Type: application/json

{
  "event": "streamer_card_clicked",
  "properties": {
    "streamer_id": 1,
    "streamer_name": "StreamerName"
  }
}
```

## Customization Points

### Branding
- Update logo in `src/components/HeroSection.tsx`
- Modify colors in `src/index.css`
- Change social links in `src/components/Footer.tsx`

### Content
- Edit copy throughout components
- Update meta tags in `index.html`
- Replace hero background in `src/assets/`

### Functionality
- Add new routes in `src/App.tsx`
- Create new components in `src/components/`
- Extend API service in `src/services/api.ts`

## Performance Optimizations

### Code Splitting
The app already uses React lazy loading. To add more:
```typescript
const NewComponent = lazy(() => import('./NewComponent'));
```

### Image Optimization
- Use modern formats (WebP, AVIF)
- Implement lazy loading
- Optimize image sizes for different screens

### Bundle Analysis
```bash
npm run build
npx vite-bundle-analyzer dist
```

## SEO & Meta Tags
Update `index.html` for each deployment:
- Title tag
- Meta description
- Open Graph tags
- Canonical URLs

## Browser Support
- Modern browsers (Chrome 88+, Firefox 85+, Safari 14+)
- Mobile responsive
- Touch-friendly interactions

## Troubleshooting

### Build Issues
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Type check
npx tsc --noEmit
```

### CORS Issues
Configure your backend to allow frontend domain:
```javascript
// Express example
app.use(cors({
  origin: ['https://your-frontend-domain.com']
}));
```

### Routing Issues
For SPA routing, configure your server to serve `index.html` for all non-API routes.

## Support
The frontend is fully self-contained and requires no special backend framework. It works with any REST API that follows the documented endpoint structure.