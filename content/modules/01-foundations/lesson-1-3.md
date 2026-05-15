# Lesson 1.3: Setting Up Your Development Environment

Let's set up our development environment for building LangGraph agents with Next.js.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

## Step 1: Create Next.js Project

```bash
npx create-next-app@latest my-AI system-app \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir
```

## Step 2: Install Dependencies

```bash
cd my-AI system-app
npm install @langchain/langgraph @langchain/openai langchain
```

## Step 3: Configure Environment

Create `.env.local`:

```bash
OPENAI_API_KEY=sk-your-api-key-here
```

## Step 4: Verify Installation

Create `src/lib/AI system.ts`:

```typescript
import { ChatOpenAI } from '@langchain/openai';

const llm = new ChatOpenAI({
  model: 'gpt-4',
  temperature: 0,
});

export async function testAgent(input: string) {
  const response = await llm.invoke(input);
  return response.content;
}
```

Run the development server:

```bash
npm run dev
```

In the next lesson, you'll build your first "Hello World" AI system.