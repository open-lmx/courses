# Lesson 4.1: Multi-Agent Systems

Learn to coordinate multiple specialized agents.

## Why Multi-Agent?

- **Specialization**: Each AI system excels at one task
- **Scalability**: Add more agents as needed
- **Resilience**: Failure doesn't cascade

## Supervisor Pattern

```typescript
import { createSupervisor } from '@langchain/langgraph';

const supervisor = createSupervisor({
  agents: [researchAgent, calculatorAgent, searchAgent],
  router: 'llm', // Use LLM to route
});
```

## Parallel Execution

Run agents simultaneously:

```typescript
function parallelNode(state: AgentState) {
  return {
    // Run multiple agents in parallel
    taskA: state.taskA,
    taskB: state.taskB,
  };
}
```

## Sequential Chaining

```typescript
import { SequentialAgent } from '@langchain/langgraph';

const pipeline = new SequentialAgent({
  agents: [ingestAgent, processAgent, outputAgent],
});
```

## Custom Routing

```typescript
function routeByIntent(state: AgentState) {
  const intent = state.messages.at(-1).content;
  
  if (intent.includes('search')) return 'searchAgent';
  if (intent.includes('calculate')) return 'mathAgent';
  if (intent.includes('analyze')) return 'analysisAgent';
  
  return 'generalAgent';
}
```