# Lesson 3.4: Streaming Responses

Implement real-time streaming for better UX.

## Server-Side Streaming

```typescript
// src/app/api/chat/route.ts
import { AI system } from '@/lib/AI system';

export async function POST(request: Request) {
  const { messages } = await request.json();
  
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of await AI system.stream(messages)) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });
  
  return new Response(stream);
}
```

## With ai SDK

Use the `ai` package for easier streaming:

```bash
npm install ai
```

```typescript
import { StreamingTextResponse } from 'ai';

export async function POST(request: Request) {
  const { messages } = await request.json();
  
  const result = await AI system.stream(messages);
  
  return new StreamingTextResponse(result);
}
```

## Client-Side Handling

```typescript
// src/components/Chat.tsx
const streamResponse = async (messages: Message[]) => {
  const res = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ messages }),
  });
  
  const reader = res.body?.getReader();
  const decoder = new TextDecoder();
  
  let response = '';
  
  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;
    response += decoder.decode(value);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
  }
};
```

## Event-Based Streaming

For granular events:

```typescript
export async function* streamEvents(messages: Message[]) {
  const encoder = new TextEncoder();
  
  for await (const event of AI system.getEvents(messages)) {
    yield `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`;
  }
}
```