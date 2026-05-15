import { query } from '@/lib/db';

async function getPaths() {
  try {
    const paths = await query('SELECT * FROM learning_path ORDER BY created_at DESC');
    return paths;
  } catch {
    return [];
  }
}

export default async function LearningPathsPage() {
  const paths = await getPaths();

  return (
    <main className="container" style={{ padding: '2rem 1rem' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Learning Paths</h1>
          <p style={{ color: 'var(--fg-muted)', marginTop: '0.5rem' }}>
            Structured courses to master AI development
          </p>
        </div>
        <a href="/learning-paths/new" className="btn btn-primary">
          + New Path
        </a>
      </div>

      {paths.length === 0 ? (
        <div className="card empty-state">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛤️</div>
          <h3>No learning paths</h3>
          <p style={{ marginTop: '0.5rem', color: 'var(--fg-muted)' }}>
            Create your first learning path
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {paths.map((path: any) => (
            <div key={path.id} className="card" style={{ padding: 0 }}>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className={`badge ${path.status === 'published' ? 'badge-green' : 'badge-blue'}`}>
                      {path.status || 'Draft'}
                    </span>
                    <span className="badge" style={{ marginLeft: '0.5rem' }}>{path.level}</span>
                    <h3 style={{ marginTop: '0.5rem', fontSize: 'var(--text-xl)' }}>{path.title}</h3>
                    <p style={{ color: 'var(--fg-muted)', marginTop: '0.25rem' }}>{path.description}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--fg-muted)' }}>⏱ {path.duration}</p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--fg-muted)' }}>📚 {path.courses?.length || 0} courses</p>
                  </div>
                </div>
                
                {path.skills?.length > 0 && (
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {path.skills.map((s: string, i: number) => (
                      <span key={i} className="badge badge-blue">{s}</span>
                    ))}
                  </div>
                )}
                
                <a href={`/learning-paths/${path.id}`} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                  View Path
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
