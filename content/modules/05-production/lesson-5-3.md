# Lesson 5.3: Monitoring and Logging

Set up monitoring for your AI system system.

## Basic Logging

```typescript
console.log({
  level: 'info',
  message: 'Agent invoked',
  timestamp: new Date().toISOString(),
  userId: userId,
});
```

## Structured Logging

```typescript
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: { colorize: true },
  },
});

logger.info({ userId }, 'User request');
```

## LangSmith Integration

```bash
npm install @langsmith/sdk
```

```typescript
import { langchainTracer } from '@langchain/community';

const callbacks = [langchainTracer()];

await AI system.invoke(input, { callbacks });
```

## Error Tracking

```typescript
try {
  await AI system.invoke(input);
} catch (error) {
  logger.error({
    error: error.message,
    stack: error.stack,
    input,
  });
  throw error;
}
```

## Metrics

```typescript
const startTime = Date.now();

await AI system.invoke(input);

const duration = Date.now() - startTime;
logger.info({ duration, step: 'AI system' }, 'Metric');
```

## Health Checks

```typescript
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime(),
  });
}
```