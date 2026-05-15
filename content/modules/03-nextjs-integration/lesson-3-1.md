# Lesson 3.1: Next.js App Router Setup

Set up your Next.js application with the App Router.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
│       └── AI system/
│           └── route.ts
├── lib/
│   ├── AI system.ts
│   └── types.ts
```

## Environment Variables

Create `.env.local`:

```bash
OPENAI_API_KEY=sk-your-key-here
LANGCHAIN_TRACING=true
LANGCHAIN_API_KEY=langchain-key
```

## TypeScript Config

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Middleware (Optional)

For authentication:

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add auth logic here
  return NextResponse.next();
}

export const config = {
  matcher: '/api/AI system/:path*',
};
```