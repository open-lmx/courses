import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/recommendations - Personalized courses
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const goal = searchParams.get('goal');
    
    let recommendations: any[] = [];
    let reason = '';
    
    // 1. Goal-based recommendations
    if (goal) {
      const goalSkills: Record<string, string[]> = {
        'get job': ['PROG', 'DEVO', 'ARCH'],
        'learn AI': ['DATS', 'ANALY', 'PROG'],
        'promotion': ['PRMG', 'BUSA', 'ARCH'],
        'security': ['SCTY', 'CYBS', 'SFEN'],
        'frontend': ['WEB', 'HCI', 'TEST'],
        'backend': ['PROG', 'DEVO', 'ITOP'],
      };
      
      const targetSkills = goalSkills[goal.toLowerCase()] || ['PROG'];
      
      // Use array::intersect to find matching skills
      recommendations = await query(`
        SELECT c.*, array::intersect(c.skills, $target) AS match_score
        FROM course AS c
        WHERE status = 'published' AND array::len(array::intersect(c.skills, $target)) > 0
        ORDER BY array::len(array::intersect(c.skills, $target)) DESC
        LIMIT 5
      `, { target: targetSkills });
      
      reason = `For ${goal}`;
    }
    
    // 2. Fallback -> popular courses
    if (recommendations.length === 0) {
      recommendations = await query(`
        SELECT * FROM course 
        WHERE status = 'published' 
        ORDER BY created_at DESC LIMIT 5
      `);
      reason = 'Popular courses';
    }
    
    return NextResponse.json({ recommendations, reason });
  } catch (error) {
    const courses = await query('SELECT * FROM course LIMIT 5');
    return NextResponse.json({ 
      recommendations: courses, 
      reason: 'Popular' 
    });
  }
}

// POST - Save user preferences
export async function POST(request: Request) {
  try {
    const { user_id, goal, skills, interests } = await request.json();
    
    if (!user_id) {
      return NextResponse.json({ error: 'user_id required' }, { status: 400 });
    }
    
    // Update user profile
    await query(`UPDATE user:${user_id} SET goal = $goal, interests = $interests`, { 
      user_id, 
      goal: goal || null, 
      interests: interests || [] 
    });
    
    // Link user to skills
    if (skills?.length) {
      for (const skill of skills) {
        await query(`
          RELATE user:${user_id}->user_skill->skill:${skill} SET level = 'Intermediate'
        `);
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
