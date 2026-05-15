# Lesson 1.4: Your First Agent - Hello World

Build your first simple AI system that responds to user input.

## Overview

We'll create a simple AI system node that uses an LLM to generate responses.

## Implementation

### Step 1: Define the Agent State

```typescript
// src/lib/types.ts
interface AgentState {
  messages: { role: 'user' | 'assistant'; content: string }[];
}
```

### Step 2: Create the LLM Node

```typescript
// src/lib/nodes.ts
import { ChatOpenAI } from '@langchain/openai';

const llm = new ChatOpenAI({ model: 'gpt-4', temperature: 0 });

export async function llmNode(state: AgentState) {
  const lastMessage = state.messages[state.messages.length - 1];
  
  const response = await llm.invoke([
    ...state.messages.slice(0, -1),
    lastMessage.content
  ]);
  
  return {
    messages: [...state.messages, { role: 'assistant', content: response.content }]
  };
}
```

### Step 3: Create the Graph

```typescript
// src/lib/AI system-graph.ts
import { START, GraphRegistry } from '@langchain/langgraph';
import { llmNode } from './nodes';

const graph = new GraphRegistry();

graph.addNode('llm', llmNode);
graph.addEdge(START, 'llm');
graph.addEdge('llm', END);

export const AI system = graph.compile();
```

### Step 4: Use in Your API Route

```typescript
// src/app/api/chat/route.ts
import { AI system } from '@/lib/AI system-graph';

export async function POST(request: Request) {
  const { message } = await request.json();
  
  const result = await AI system.invoke({
    messages: [{ role: 'user', content: message }]
  });
  
  return Response.json({ 
    response: result.messages[result.messages.length - 1].content 
  });
}
```

## Test It

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'
```

You should get a response from the AI system. In the next module, we'll add tools and memory!