import { query } from '@/lib/db';

// Fetch skills from SurrealDB
async function getSkills() {
  try {
    const skills = await query('SELECT * FROM skill ORDER BY category, name');
    return skills;
  } catch {
    return [];
  }
}

export default async function SkillsPage() {
  const skills = await getSkills();

  // Group by category
  const grouped = skills.reduce((acc: any, skill: any) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <main className="container" style={{ padding: '2rem 1rem' }}>
      <div className="page-header">
        <h1 className="page-title">Skill Library</h1>
        <p style={{ color: 'var(--fg-muted)', marginTop: '0.5rem' }}>
          SFIA framework skills available for course linking
        </p>
      </div>

      {skills.length === 0 ? (
        <div className="card empty-state">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛠</div>
          <h3>No skills loaded</h3>
          <p style={{ marginTop: '0.5rem', color: 'var(--fg-muted)' }}>
            Seed SFIA skills from the API
          </p>
          <form action="/api/skills/seed" method="POST" style={{ marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary">
              Load SFIA Skills
            </button>
          </form>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '2rem' }}>
          {Object.entries(grouped).map(([category, items]: [string, any]) => (
            <div key={category}>
              <h2 style={{ marginBottom: '1rem', fontSize: 'var(--text-xl)' }}>{category}</h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: '1rem' 
              }}>
                {items.map((skill: any) => (
                  <div key={skill.id} className="card" style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="badge badge-blue">{skill.code}</span>
                      <h4 style={{ fontSize: 'var(--text-base)', flex: 1 }}>{skill.name}</h4>
                    </div>
                    <p style={{ 
                      color: 'var(--fg-muted)', 
                      fontSize: 'var(--text-sm)',
                      marginTop: '0.5rem'
                    }}>
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
