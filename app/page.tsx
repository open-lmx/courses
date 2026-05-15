import { Chat } from '@/components/Chat';

export default function Home() {
  return (
    <main className="container">
      <header>
        <h1>🤖 Autonomous Agent</h1>
        <p className="subtitle">
          Build powerful AI agents with LangGraph + Next.js
        </p>
      </header>
      <Chat />
    </main>
  );
}