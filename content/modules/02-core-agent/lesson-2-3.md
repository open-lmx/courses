# Lesson 2.3: Reasoning Chains and Execution

Master the reasoning-execution loop in LangGraph.

## The REACT Pattern

LangGraph implements the ReAct (Reason + Act) pattern:

1. **Reason** - Decide what to do
2. **Act** - Execute the action
3. **Observe** - Check the result

## Creating the Loop

```typescript
function reasonNode(state: AgentState) {
  const lastMsg = state.messages.at(-1);
  
  // The LLM decides: tool or final answer?
  return { shouldAct: lastMsg.content.includes('?') };
}

function actNode(state: AgentState) {
  // Use tools and return results
  return { toolResults: ['action completed'] };
}

function shouldContinue(state: AgentState) {
  return state.shouldAct ? 'actNode' : END;
}
```

## Conditional Routing

```typescript
graph.addEdge(START, 'reasonNode');
graph.addConditionalEdges('reasonNode', shouldContinue);
graph.addEdge('actNode', 'reasonNode'); // Loop back
```

## Max Iterations

Prevent infinite loops:

```typescript
const app = graph.compile({
  recursionLimit: 10,
});
```

## Full Implementation

```typescript
import { START, END, GraphRegistry } from '@langchain/langgraph';

const app = new GraphRegistry();

app.addNode('reason', reasonNode);
app.addNode('act', actNode);

app.addEdge(START, 'reason');
app.addConditionalEdges('reason', shouldContinue);
app.addEdge('act', 'reason');
app.addEdge('act', END);

export const executable = app.compile();
```