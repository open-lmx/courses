import { NextResponse } from 'next/server';
import Surreal from 'surrealdb';

async function getDb() {
  const db = new Surreal();
  const url = process.env.SURREAL_URL || 'https://demo.surrealdb.com';
  const user = process.env.SURREAL_USER || 'root';
  const pass = process.env.SURREAL_PASS || 'root';
  const ns = process.env.SURREAL_NS || 'test';
  const dbName = process.env.SURREAL_DB || 'test';
  
  await db.connect(url, { namespace: ns, database: dbName });
  await db.signin({ username: user, password: pass });
  return db;
}

// GET /api/courses - List all courses
export async function GET() {
  try {
    const db = await getDb();
    
    const courses = await db.query<any[]>(
      'SELECT * FROM course ORDER BY created_at DESC'
    );
    
    await db.close();
    
    return NextResponse.json({ courses: courses[0] || [] });
  } catch (error) {
    console.error('Courses GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// POST /api/courses - Create course (admin only)
export async function POST(request: Request) {
  try {
    const { title, description, outline, level, duration, modules, status } = await request.json();
    
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description required' },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    
    const result = await db.create('course', {
      title,
      description,
      outline: outline || [],
      level: level || 'Beginner',
      duration: duration || '4 weeks',
      modules: modules || 1,
      status: status || 'Coming Soon',
      created_at: new Date().toISOString(),
    });
    
    await db.close();
    
    return NextResponse.json({ success: true, course: result[0] });
  } catch (error) {
    console.error('Courses POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
