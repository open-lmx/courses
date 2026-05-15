import { NextResponse } from 'next/server';
import Surreal from 'surrealdb';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    const db = new Surreal();
    const url = process.env.SURREAL_URL || 'https://demo.surrealdb.com';
    const user = process.env.SURREAL_USER || 'root';
    const pass = process.env.SURREAL_PASS || 'root';
    const ns = process.env.SURREAL_NS || 'test';
    const dbName = process.env.SURREAL_DB || 'test';

    await db.connect(url, { namespace: ns, database: dbName });
    await db.signin({ username: user, password: pass });

    // Check if user exists
    const existing = await db.query<any[]>(
      'SELECT id FROM user WHERE email = $email LIMIT 1',
      { email }
    );

    if (existing[0]?.length) {
      await db.close();
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create user with salt
    const salt = Math.random().toString(36).substring(2);
    const passwordHash = btoa(password + salt);

    const result = await db.create('user', {
      email,
      name,
      password: passwordHash,
      salt,
      created_at: new Date().toISOString(),
    });

    await db.close();

    return NextResponse.json({ success: true, userId: result[0].id });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
