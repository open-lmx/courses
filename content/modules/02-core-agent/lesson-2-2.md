# Lesson 2.2: Tool Integration Patterns

Tools extend your AI system's capabilities beyond text generation.

## Defining Tools

```typescript
import { tool } from '@langchain/langchain';

const searchTool = tool({
  name: 'search',
  description: 'Search the web for information',
  async execute({ query }: { query: string }) {
    // Implement search logic
    return `Results for: ${query}`;
  },
});
```

## Using Tools in Nodes

```typescript
import { toolNode } from '@langchain/langgraph/prebuilt';

const tools = [searchTool];

function reasoningNode(state: AgentState) {
  const lastMessage = state.messages[state.messages.length - 1];
  
  // Decide which tool to call
  return { actions: [{ tool: 'search', input: lastMessage.content }] };
}

function toolCallingNode(state: AgentState) {
  return toolNode({ state, tools });
}
```

## Routing Based on Tools

```typescript
function shouldUseTools(state: AgentState) {
  const needsSearch = state.messages.at(-1)?.content.includes('search');
  return needsSearch ? 'toolNode' : 'llmNode';
}
```

## Complete Agent Graph

```typescript
graph.addNode('reasoning', reasoningNode);
graph.addNode('tools', toolCallingNode);
graph.addConditionalEdges('reasoning', shouldUseTools);
```