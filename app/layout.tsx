import type { Metadata } from 'next';
import { AuthProvider } from './providers/AuthProvider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'LangGraph + Next.js Course | Build Autonomous AI Systems',
    template: '%s | OpenAutonomyx (OPCI) Private Limited',
  },
  description: 'Master the art of building code-first autonomous AI systems using LangGraph Deep Agent Framework and Next.js. 20 comprehensive lessons from foundations to production.',
  keywords: [
    'LangGraph',
    'Next.js',
    'AI agent',
    'autonomous AI',
    'LangChain',
    'AI development',
    'JavaScript frameworks',
    'React',
    'LLM applications',
    'AI systems course',
  ],
  authors: [{ name: 'OpenAutonomyx (OPCI) Private Limited' }],
  creator: 'OpenAutonomyx (OPCI) Private Limited',
  publisher: 'OpenAutonomyx (OPCI) Private Limited',
  metadataBase: new URL('https://github.com/open-lmx/courses'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/open-lmx/courses',
    siteName: 'OpenAutonomyx (OPCI) Private Limited',
    title: 'LangGraph + Next.js Course | Build Autonomous AI Systems',
    description: 'Master the art of building code-first autonomous AI systems using LangGraph Deep Agent Framework and Next.js',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LangGraph + Next.js Course',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LangGraph + Next.js Course | Build Autonomous AI Systems',
    description: 'Master autonomous AI system development with LangGraph and Next.js',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': 0,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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