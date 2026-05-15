import { NextResponse } from 'next/server';
import { query, create } from '@/lib/db';
import { FrappeClient } from '@/lib/frappe/client';

const frappe = new FrappeClient();

// GET /api/learning-paths - List from SurrealDB (backed by Frappe LMS)
export async function GET() {
  try {
    // Get local paths from SurrealDB
    const paths = await query('SELECT * FROM learning_path ORDER BY created_at DESC');
    
    if (!paths[0]?.length) {
      // Seed sample paths if empty
      const samplePaths = [
        {
          title: 'AI Agent Developer',
          description: 'Master LangGraph, AutoGen, and autonomous agents',
          level: 'Intermediate',
          duration: '12 weeks',
          courses: ['LangGraph Fundamentals', 'Next.js Frontend', 'SurrealDB'],
          skills: ['PROG', 'DEVO', 'ARCH'],
          status: 'published'
        },
        {
          title: 'Full-Stack AI Engineer',
          description: 'Build production AI applications end-to-end',
          level: 'Advanced',
          duration: '16 weeks',
          courses: ['React', 'LangGraph', 'SurrealDB', 'LLM Integration'],
          skills: ['PROG', 'DEVO', 'ARCH', 'DATS'],
          status: 'published'
        },
        {
          title: 'AI Security Specialist',
          description: 'Secure AI systems and autonomous agents',
          level: 'Advanced',
          duration: '8 weeks',
          courses: ['AI Security', 'Prompt Engineering', 'LangChain'],
          skills: ['SCTY', 'SFEN', 'CYBS'],
          status: 'published'
        }
      ];
      
      for (const p of samplePaths) {
        await create('learning_path', { ...p, created_at: new Date().toISOString() });
      }
      
      const newPaths = await query('SELECT * FROM learning_path ORDER BY created_at DESC');
      return NextResponse.json({ paths: newPaths, source: 'surrealDB' });
    }
    
    return NextResponse.json({ paths, source: 'surrealDB' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch paths' }, { status: 500 });
  }
}

// POST /api/learning-paths - Create in SurrealDB
export async function POST(request: Request) {
  try {
    const { title, description, courses, skills, level, duration, status, sync_to_frappe } = await request.json();
    
    if (!title) {
      return NextResponse.json({ error: 'Title required' }, { status: 400 });
    }
    
    const path = await create('learning_path', {
      title,
      description,
      courses: courses || [],
      skills: skills || [],
      level: level || 'Beginner',
      duration: duration || '8 weeks',
      status: status || 'draft',
      created_at: new Date().toISOString(),
    });
    
    // Optional: Sync course to Frappe LMS
    if (sync_to_frappe) {
      try {
        await frappe.createCourse({
          title,
          description: description || '',
          course_code: title.toLowerCase().replace(/\s+/g, '-'),
          is_published: status === 'published',
        });
      } catch {}
    }
    
    return NextResponse.json({ success: true, path });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create path' }, { status: 500 });
  }
}
