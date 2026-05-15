# Lesson 4.3: Agent Performance Optimization

Optimize your AI system for speed and efficiency.

## Caching Responses

Cache frequent queries:

```typescript
import { Cache } from '@langchain/cache';

const cache = new Cache();

async function optimizedNode(state: AgentState) {
  const cacheKey = JSON.stringify(state.messages);
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const result = await expensiveOperation(state);
  cache.set(cacheKey, result);
  
  return result;
}
```

## Batch Processing

Process multiple requests together:

```typescript
async function batchNode(state: AgentState[]) {
  // Process all items in parallel
  const results = await Promise.all(
    state.map(item => process(item))
  );
  
  return results;
}
```

## Streaming Intermediate Results

Stream as you go:

```typescript
async function* streamingNode(state: AgentState) {
  const steps = getExecutionSteps(state);
  
  for (const step of steps) {
    const result = await execute(step);
    yield { progress: result };
  }
}
```

## Reduce LLM Calls

Use cheaper models when possible:

```typescript
function routerNode(state: AgentState) {
  const complexity = state.messages.at(-1).content.length;
  
  // Simple queries → fast model
  if (complexity < 50) {
    return { model: 'gpt-3.5-turbo' };
  }
  
  // Complex → premium model
  return { model: 'gpt-4' };
}
```

## Optimize Tool Calls

```typescript
const parallelToolExecutor = async (tools, state) => {
  // Execute independent tools in parallel
  const independentTools = tools.filter(t => !t.dependsOn);
  
  return Promise.all(
    independentTools.map(t => t.execute(state))
  );
};
```