import { NextResponse } from 'next/server';
import { query, create, select } from '@/lib/db';

export async function GET() {
  try {
    const courses = await query<any>('SELECT * FROM course ORDER BY created_at DESC');
    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Courses GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, outline, level, duration, modules, status, courseCode } = await request.json();
    
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description required' },
        { status: 400 }
      );
    }
    
    // SurrealQL: CREATE
    const course = await create('course', {
      title,
      description,
      outline: outline || [],
      level: level || 'Beginner',
      duration: duration || '4 weeks',
      modules: modules || 1,
      status: status || 'Coming Soon',
      courseCode,
      created_at: new Date().toISOString(),
    });
    
    return NextResponse.json({ success: true, course });
  } catch (error) {
    console.error('Courses POST error:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
