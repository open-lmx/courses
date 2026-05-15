# Lesson 2.4: Handling Errors and Fallbacks

Build robust agents that handle errors gracefully.

## Error Boundaries

Catch and handle errors in nodes:

```typescript
function safeNode(state: AgentState) {
  try {
    return await riskyOperation(state);
  } catch (error) {
    return {
      messages: [...state.messages, {
        role: 'assistant',
        content: `I encountered an error: ${error.message}`
      }]
    };
  }
}
```

## Retry Logic

Use LangGraph's built-in retry:

```typescript
import { RetryPolicy } from '@langchain/langgraph';

const retryPolicy = {
  maxAttempts: 3,
  initialInterval: 1000,
  backoffFactor: 2,
};

graph.addNode('safeNode', safeNode, { retry: retryPolicy });
```

## Fallback Nodes

Provide alternatives when tools fail:

```typescript
function primaryNode(state: AgentState) {
  try {
    return { result: await fetchData(state.query) };
  } catch {
    return { result: await fetchCachedData(state.query) };
  }
}
```

## Circuit Breaker

Prevent repeated failures:

```typescript
let failureCount = 0;

function checkedNode(state: AgentState) {
  if (failureCount > 5) {
    return { messages: [{ role: 'assistant', content: 'Service temporarily unavailable' }] };
  }
  
  try {
    return await process(state);
  } catch {
    failureCount++;
    throw;
  }
}
```

## Validation

Validate inputs before processing:

```typescript
function validateInput(state: AgentState) {
  const lastMsg = state.messages.at(-1);
  
  if (lastMsg.content.length > 10000) {
    throw new Error('Input too long');
  }
  
  return state;
}

graph.addNode('validate', validateInput);
```