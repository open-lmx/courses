# Lesson 1.1: Understanding AI System Architecture

An autonomous AI system is a software system that can:
1. **Perceive** its environment through inputs
2. **Reason** about the current state and goals
3. **Act** to achieve objectives using available tools
4. **Learn** from feedback to improve future actions

## Core Components

### 1. Agent Brain (Language Model)
The LLM serves as the reasoning engine that interprets:
- User intent
- Available tools and their parameters
- Execution results and next steps

```typescript
import { ChatOpenAI } from '@langchain/openai';

const llm = new ChatOpenAI({
  model: 'gpt-4-turbo',
  temperature: 0.7,
});
```

### 2. Tool System
Tools extend the AI system's capabilities beyond text generation.

### 3. Memory System
Agents maintain state across interactions.

### 4. Execution Loop
The AI system operates in a state-driven loop using LangGraph.