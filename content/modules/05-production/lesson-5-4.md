# Lesson 5.4: Deployment to Vercel

Deploy your AI system to Vercel for production.

## Prepare for Deployment

### Update package.json

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
```

### Update next.config.js

```javascript
module.exports = {
  experimental: {
    serverActions: true,
  },
};
```

## Deploy via CLI

```bash
npm i -g vercel
vercel login
vercel
```

## Deploy via Git

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

## Environment Variables in Vercel

Add these in Vercel dashboard:
- `OPENAI_API_KEY` - Your OpenAI key
- `LANGCHAIN_API_KEY` (optional)

## Serverless Considerations

```typescript
// Timeout limits
export const maxDuration = 60; // seconds

// Memory limits - use efficient models
const model = new ChatOpenAI({
  model: 'gpt-3.5-turbo', // Cheaper & faster
});
```

## Edge vs Serverless

```typescript
// For streaming: use Node.js runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
```

## Health Check Route

```typescript
// src/app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'ok',
    region: process.env.VERCEL_REGION,
  });
}
```

## Testing Production

```bash
vercel --prod
curl https://your-app.vercel.app/api/health
```