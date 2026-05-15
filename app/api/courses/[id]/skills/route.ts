import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/courses/[id]/skills - Get skills for a course
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const courses = await query<any>('SELECT * FROM course WHERE id = $id', { id });
    
    if (!courses[0]) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    
    const course = courses[0];
    return NextResponse.json({ 
      courseId: course.id,
      title: course.title,
      skills: course.skills || [] 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

// POST /api/courses/[id]/skills - Link skill to course
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { skillId, skillName, level } = await request.json();
    
    if (!skillId && !skillName) {
      return NextResponse.json({ error: 'skillId or skillName required' }, { status: 400 });
    }
    
    await query(
      `UPDATE course SET skills = array::union(skills, [{ id: $skillId, name: $skillName, level: $level }]) WHERE id = $id`,
      { id, skillId, skillName, level: level || 'Intermediate' }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to link skill' }, { status: 500 });
  }
}
