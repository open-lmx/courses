# Lesson 3.3: Creating the Chat Interface

Build an interactive chat UI with React.

## Basic Chat Component

```typescript
// src/components/Chat.tsx
'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const res = await fetch('/api/AI system', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage] 
        }),
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message.content,
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
```

## With Streaming

```typescript
// Real-time streaming messages
async function* streamMessage(messages: Message[]) {
  const res = await fetch('/api/AI system', {
    method: 'POST',
    body: JSON.stringify({ messages }),
  });
  
  const reader = res.body?.getReader();
  const decoder = new TextDecoder();
  
  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;
    yield decoder.decode(value);
  }
}
```

## Putting It Together

```typescript
// src/app/page.tsx
import { Chat } from '@/components/Chat';

export default function Home() {
  return (
    <main>
      <h1>🤖 AI Agent</h1>
      <Chat />
    </main>
  );
}
```