import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LangGraph + Next.js Course | Build Autonomous AI Systems',
  description: 'Master the art of building code-first autonomous AI systems using LangGraph Deep Agent Framework and Next.js',
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