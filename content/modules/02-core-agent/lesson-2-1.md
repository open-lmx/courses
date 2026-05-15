# Lesson 2.1: Agent State and Memory

Learn how to manage AI system state across interactions.

## The State Interface

Define what data flows through your AI system:

```typescript
// src/lib/types.ts
interface AgentState {
  messages: { role: 'user' | 'assistant'; content: string }[];
  context: Record<string, any>;
  steps: number;
}
```

## Adding Memory with Checkpointing

LangGraph supports checkpoints to save and restore state:

```typescript
import { MemorySaver } from '@langchain/langgraph/checkpoint';

const checkpointer = new MemorySaver();
const AI system = graph.compile({ checkpointer });
```

## Persist History

Save conversation history for context:

```typescript
function reducer(state: AgentState, update: Partial<AgentState>) {
  return {
    ...state,
    messages: [...state.messages, ...(update.messages || [])]
  };
}
```

## Use Checkpointed Agent

```typescript
const threadId = 'user-123';

const result = await AI system.invoke(
  { messages: [{ role: 'user', content: 'Hi' }] },
  { configurable: { threadId } }
);

// Resume with new input - maintains history
const nextResult = await AI system.invoke(
  { messages: [{ role: 'user', content: 'What did I say?' }] },
  { configurable: { threadId } }
);
```