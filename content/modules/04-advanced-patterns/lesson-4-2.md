# Lesson 4.2: Custom Tool Creation

Create powerful custom tools for your system.

## Basic Tool Structure

```typescript
import { tool } from '@langchain/core/tools';

const myTool = tool({
  name: 'my_tool',
  description: 'What this tool does',
  parameters: z.object({
    input: z.string(),
  }),
  async execute({ input }) {
    return { result: input.toUpperCase() };
  },
});
```

## Tool with State

```typescript
const statefulTool = tool({
  name: 'save_preference',
  description: 'Save user preference',
  parameters: z.object({
    key: z.string(),
    value: z.any(),
  }),
  async execute({ key, value }, config) {
    const store = await config.runtime.get('preferences');
    store[key] = value;
    await config.runtime.put('preferences', store);
    return { success: true };
  },
});
```

## Async Tool with Retries

```typescript
const robustTool = tool({
  name: 'fetch_data',
  description: 'Fetch data from API',
  parameters: z.object({
    url: z.string(),
    retries: z.number().default(3),
  }),
  async execute({ url, retries }) {
    for (let i = 0; i < retries; i++) {
      try {
        return await fetch(url).then(r => r.json());
      } catch {
        if (i === retries - 1) throw;
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  },
});
```

## Tool Discovery

Register tools for the system to discover:

```typescript
const tools = [...systemTools, weatherTool, searchTool, calculatorTool];

export function getTools() {
  return tools;
}
```