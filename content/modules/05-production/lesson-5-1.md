# Lesson 5.1: Environment Configuration

Configure your AI system for different environments.

## Environment Variables

```bash
# .env.local (development)
OPENAI_API_KEY=sk-dev-xxx
NODE_ENV=development
LOG_LEVEL=debug

# .env.production
OPENAI_API_KEY=sk-prod-xxx
NODE_ENV=production
LOG_LEVEL=warn
```

## Type-Safe Config

```typescript
// src/lib/config.ts
import { z } from 'zod';

const configSchema = z.object({
  openaiApiKey: z.string().min(1),
  model: z.enum(['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo']),
  maxTokens: z.number().default(2000),
  temperature: z.number().default(0.7),
});

export const config = configSchema.parse(process.env);
```

## Different Configs Per Environment

```typescript
// src/lib/config.ts
const configs = {
  development: {
    model: 'gpt-3.5-turbo',
    maxTokens: 1000,
  },
  production: {
    model: 'gpt-4-turbo',
    maxTokens: 4000,
  },
};

export const envConfig = configs[process.env.NODE_ENV || 'development'];
```

## Vercel Environment

Set environment variables in Vercel dashboard:
- Project Settings → Environment Variables
- Add each variable for production scope