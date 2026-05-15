import { query } from '@/lib/db';

async function getJobs() {
  try {
    const jobs = await query('SELECT * FROM job WHERE status = $status ORDER BY created_at DESC', { status: 'open' });
    return jobs;
  } catch {
    return [];
  }
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main className="container" style={{ padding: '2rem 1rem' }}>
      <div className="page-header">
        <h1 className="page-title">Job Openings</h1>
        <p style={{ color: 'var(--fg-muted)', marginTop: '0.5rem' }}>
          Find AI-related careers and link to course skills
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="card empty-state">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💼</div>
          <h3>No open positions</h3>
          <p style={{ marginTop: '0.5rem', color: 'var(--fg-muted)' }}>
            Check back later for opportunities
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {jobs.map((job: any) => (
            <div key={job.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge badge-green">Open</span>
                  <h3 style={{ marginTop: '0.5rem' }}>{job.title}</h3>
                  <p style={{ color: 'var(--fg-muted)', fontSize: 'var(--text-sm)', marginTop: '0.25rem' }}>
                    {job.company} · {job.location} · {job.type}
                  </p>
                </div>
                <a href={job.apply_url} className="btn btn-primary" target="_blank">
                  Apply
                </a>
              </div>
              <p style={{ marginTop: '1rem', color: 'var(--fg-muted)' }}>{job.description}</p>
              {job.skills?.length > 0 && (
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {job.skills.map((s: any, i: number) => (
                    <span key={i} className="badge badge-blue">{s.name}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
