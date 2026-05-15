import { NextResponse } from 'next/server';
import { FrappeHRClient } from '@/lib/frappe/client';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Try Frappe first
    const frappe = new FrappeHRClient();
    const frappeJob = await frappe.getJobOpenings({ status: 'Open' });
    const job = frappeJob?.data?.find((j: any) => j.name === id);
    
    if (job) {
      return NextResponse.json({
        job: {
          id: job.name,
          title: job.job_title,
          company: 'OpenAutonomyx',
          location: job.location || 'Remote',
          description: job.description,
          status: job.status,
        },
        source: 'frappe'
      });
    }
    
    // Fallback to SurrealDB
    const { query } = await import('@/lib/db');
    const jobs = await query('SELECT * FROM job WHERE id = $id', { id });
    
    if (!jobs[0]?.length) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    
    return NextResponse.json({ job: jobs[0][0], source: 'local' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}
