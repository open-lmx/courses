import { NextResponse } from 'next/server';
import { create } from '@/lib/db';

const courses = [
  {
    title: "CS146S: The Modern Software Developer",
    description: "Stanford course - Master AI coding strategies, LLM prompting, coding agents, MCP, and state-of-the-art development tools.",
    level: "Advanced",
    duration: "10 weeks",
    modules: 14,
    outline: ["LLMs & Prompting", "Coding Agents & MCP", "AI IDEs", "Claude Code", "Modern Terminals", "Testing & Security", "Code Review", "UI Building", "Deployment", "Future"],
    skills: ["PROG", "DEVO", "TEST", "ARCH"],
    status: "published"
  },
  {
    title: "Building AI Agents with LangGraph",
    description: "Master autonomous AI agents using LangGraph. Build production-ready AI systems with state management and tool use.",
    level: "Advanced",
    duration: "8 weeks",
    modules: 10,
    skills: ["PROG", "DEVO", "ARCH"],
    status: "published"
  },
  {
    title: "Next.js 14 Full-Stack AI Apps",
    description: "Build production AI applications with Next.js 14, OpenAI, and SurrealDB.",
    level: "Intermediate",
    duration: "6 weeks",
    modules: 8,
    skills: ["WEB", "DEVO", "PROG"],
    status: "published"
  },
  {
    title: "SurrealDB for AI Applications",
    description: "Learn SurrealDB for AI apps - knowledge graphs, vectors, and real-time sync.",
    level: "Intermediate",
    duration: "4 weeks",
    modules: 6,
    skills: ["DATS", "DEVO", "ARCH"],
    status: "published"
  }
];

export async function POST() {
  try {
    const created = [];
    for (const course of courses) {
      const createdCourse = await create('course', {
        ...course,
        created_at: new Date().toISOString(),
      });
      created.push(createdCourse);
    }
    return NextResponse.json({ success: true, count: created.length });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed courses' }, { status: 500 });
  }
}
