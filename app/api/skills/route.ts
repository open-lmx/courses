import { NextResponse } from 'next/server';
import { query, create } from '@/lib/db';

export async function GET() {
  try {
    const skills = await query<any>('SELECT * FROM skill ORDER BY name ASC');
    return NextResponse.json({ skills });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, category, level, keywords } = await request.json();
    
    if (!name) {
      return NextResponse.json({ error: 'Name required' }, { status: 400 });
    }
    
    const skill = await create('skill', {
      name,
      description,
      category: category || 'Technical',
      level: level || 'Beginner',
      keywords: keywords || [],
      created_at: new Date().toISOString(),
    });
    
    return NextResponse.json({ success: true, skill });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}
