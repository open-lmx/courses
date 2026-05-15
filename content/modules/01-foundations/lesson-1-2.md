# Lesson 1.2: LangChain Deep Agent Framework Overview

LangChain's **LangGraph** provides a powerful abstraction for building autonomous agents with configurable state machines.

## Why LangGraph?

- **Graph-based**: Define AI system workflow as directed graphs
- **Flexible**: Support for multiple LLM providers
- **Production-ready**: Built-in error handling, retries, streaming
- **Open Source**: Large community and ecosystem

## Core Concepts

### 1. Nodes (compute steps)
Each node performs a specific action:

```typescript
import { LangGraph } from '@langchain/langgraph';

const graph = new LangGraph();
```

### 2. Edges (transitions)
Edges define how to move between nodes.

### 3. State
State is shared across the graph execution.

### 4. Checkpoints
Enable pausing and resuming execution.