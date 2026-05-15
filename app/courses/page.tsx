import { getDb, query } from '@/lib/db';

// Fetch courses from SurrealDB
async function getCourses() {
  try {
    const courses = await query('SELECT * FROM course ORDER BY created_at DESC');
    return courses;
  } catch {
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main className="container" style={{ padding: '2rem 1rem' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Courses</h1>
          <p style={{ color: 'var(--fg-muted)', marginTop: '0.5rem' }}>
            Learn AI-powered autonomous systems with expert-led courses
          </p>
        </div>
        <a href="/courses/new" className="btn btn-primary">
          + New Course
        </a>
      </div>

      {courses.length === 0 ? (
        <div className="card empty-state">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
          <h3>No courses yet</h3>
          <p style={{ marginTop: '0.5rem', color: 'var(--fg-muted)' }}>
            Create your first course to get started
          </p>
          <a href="/courses/new" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Create Course
          </a>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {courses.map((course: any) => (
            <div key={course.id} className="card" style={{ padding: 0 }}>
              <div style={{ 
                height: '140px', 
                background: 'var(--primary-50)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0'
              }}>
                <span style={{ fontSize: '3rem' }}>🤖</span>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <span className="badge badge-blue">{course.level || 'Beginner'}</span>
                <h3 style={{ marginTop: '0.75rem', fontSize: 'var(--text-lg)' }}>{course.title}</h3>
                <p style={{ 
                  color: 'var(--fg-muted)', 
                  fontSize: 'var(--text-sm)',
                  marginTop: '0.5rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {course.description}
                </p>
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  marginTop: '1rem',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--fg-muted)'
                }}>
                  <span>📚 {course.modules || 1} modules</span>
                  <span>⏱ {course.duration || '4 weeks'}</span>
                </div>
                <a 
                  href={`/courses/${course.id}`} 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  View Course
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
