import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enroll | LangGraph + Next.js Course',
  description: 'Enroll in the LangGraph + Next.js course. Learn to build autonomous AI systems with code-first approach.',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}