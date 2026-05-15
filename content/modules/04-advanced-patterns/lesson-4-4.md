# Lesson 4.4: Testing and Debugging Agents

Learn to test and debug LangGraph applications.

## Unit Testing Nodes

```typescript
import { describe, it, expect } from 'vitest';

describe('llmNode', () => {
  it('generates a response', async () => {
    const state = {
      messages: [{ role: 'user', content: 'Hello' }],
    };
    
    const result = await llmNode(state);
    
    expect(result.messages).toHaveLength(2);
    expect(result.messages[1].role).toBe('assistant');
  });
});
```

## Integration Testing

```typescript
describe('AI system graph', () => {
  it('processes messages end-to-end', async () => {
    const result = await app.invoke({
      messages: [{ role: 'user', content: 'Hi' }],
    });
    
    expect(result.messages.at(-1).content).toBeTruthy();
  });
});
```

## Debug Mode

Enable tracing:

```bash
LANGCHAIN_TRACING=true
```

## Manual Inspection

```typescript
const state = await app.getState();
console.log(state.messages);
console.log(state.next);
```

## Replay from Checkpoint

```typescript
const checkpoint = await app.getCheckpoint('thread-123');

// Replay to debug
for (const step of checkpointer.steps) {
  console.log('Step:', step.node);
  console.log('Input:', step.input);
  console.log('Output:', step.output);
}
```