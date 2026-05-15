import type { Metadata } from 'next';
import './app/globals.css';

export const metadata: Metadata = {
  title: 'Build Autonomous Agents with LangChain + Next.js',
  description: 'Master the art of building code-first autonomous AI agents using LangChain Deep Agent Framework and Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}