# Lesson 5.2: Security Best Practices

Secure your AI system endpoints.

## API Key Protection

Never expose keys to the client:

```typescript
// ✅ Good: Server-side only
export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  // Use on server
}
```

```typescript
// ❌ Bad: Exposing to client
const apiKey = 'sk-xxx'; // Never do this
```

## Rate Limiting

```typescript
import { rateLimit } from '@vercel/limit';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const limit = await rateLimit({ limit: 10, period: '1m' });
  
  if (!limit.success) {
    return new Response('Rate limit exceeded', { status: 429 });
  }
  
  // Process request
}
```

## Input Validation

```typescript
import { z } from 'zod';

const messageSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().max(10000),
  })),
});

export async function POST(request: Request) {
  const body = await request.json();
  const messages = messageSchema.parse(body.messages);
  // Process
}
```

## CORS Configuration

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://yoursite.com' },
        ],
      },
    ];
  },
};
```

## Audit Logging

```typescript
function auditLog(state, result) {
  console.log({
    timestamp: new Date(),
    userId: state.userId,
    action: 'agent_invoked',
    success: result.success,
  });
}