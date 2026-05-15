import { NextResponse } from 'next/server';
import { FrappeClient } from '@/lib/frappe/client';

const frappe = new FrappeClient();

// GET /api/jobs - Get Frappe LMS Courses → Map to Jobs
export async function GET() {
  try {
    // Get courses from Frappe LMS
    const courses = await frappe.getCourses();
    
    if (courses?.data?.length) {
      // Map Frappe courses to job-like structure for skill mapping
      const jobs = courses.data.map((c: any) => ({
        id: c.name,
        title: c.title,
        company: 'OpenAutonomyx', // Course provider
        location: c.is_published ? 'Online' : 'Draft',
        type: 'Course',
        description: c.description,
        skills: c.skills || [],
        status: c.is_published ? 'open' : 'draft',
      }));
      return NextResponse.json({ jobs, source: 'frappe-lms' });
    }
    
    return NextResponse.json({ jobs: [], source: 'frappe-lms' });
  } catch (error) {
    return NextResponse.json({ jobs: [], source: 'frappe-lms' });
  }
}

// POST /api/jobs - Create in Frappe LMS
export async function POST(request: Request) {
  try {
    const { title, description, course_code, is_published, sync_to_frappe } = await request.json();
    
    const frappe = new FrappeClient();
    const result = await frappe.createCourse({
      title,
      description: description || '',
      course_code: course_code || title.toLowerCase().replace(/\s+/g, '-'),
      is_published: is_published || false,
    });
    
    return NextResponse.json({ success: true, course: result.data?.[0] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
