# Lesson 3.2: Building the Agent API Endpoint

Create a streaming API endpoint for your AI system.

## Basic API Route

```typescript
// src/app/api/AI system/route.ts
import { AI system } from '@/lib/AI system';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { message, threadId } = await request.json();
  
  const result = await AI system.invoke(
    { messages: [{ role: 'user', content: message }] },
    { configurable: { threadId } }
  );
  
  return Response.json({
    response: result.messages.at(-1).content
  });
}
```

## Streaming Response

For real-time feedback:

```typescript
// src/app/api/AI system/route.ts
import { AI system } from '@/lib/AI system';
import { StreamingTextResponse } from 'ai';

export async function POST(request: Request) {
  const { message } = await request.json();
  
  const stream = await AI system.streamEvents(
    { messages: [{ role: 'user', content: message }] },
    { version: 'v1' }
  );
  
  return new StreamingTextResponse(stream);
}
```

## With Chat History

Maintain conversation context:

```typescript
// src/app/api/AI system/route.ts
export async function POST(request: NextRequest) {
  const { messages, threadId } = await request.json();
  
  const threadConfig = { configurable: { threadId } };
  
  const result = await AI system.invoke(
    { messages },
    threadConfig
  );
  
  return Response.json({
    messages: result.messages,
    threadId,
  });
}
```

## Full Implementation

```typescript
import { AI system } from '@/lib/AI system-graph';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, threadId } = await req.json();
    
    const result = await AI system.invoke(
      { messages },
      { configurable: { threadId } }
    );
    
    return Response.json({
      success: true,
      message: result.messages.at(-1),
      threadId,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```