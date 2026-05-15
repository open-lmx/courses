import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Courses - OpenAutonomyx Academy',
  description: 'Master AI development with expert-led courses.',
};

const courses = [
  {
    slug: 'langgraph-nextjs',
    title: 'LangGraph + Next.js',
    description: 'Build code-first autonomous AI systems using LangGraph Deep Agent Framework and Next.js.',
    level: 'Intermediate',
    duration: '8 weeks',
    modules: 5,
    status: 'Available',
    outline: [
      'Foundations of AI Systems',
      'Core Agent Development',
      'Next.js Integration',
      'Advanced Patterns',
      'Production Deployment',
    ],
  },
  {
    slug: 'ai-for-everyone',
    title: 'AI For Everyone',
    description: 'Learn the fundamentals of AI and how to use AI tools in your daily work. No technical background required.',
    level: 'Beginner',
    duration: '4 weeks',
    modules: 4,
    status: 'Coming Soon',
    outline: [
      'What is AI?',
      'Using AI Tools',
      'AI in Daily Work',
      'Future of AI',
    ],
  },
  {
    slug: 'llm-fine-tuning',
    title: 'LLM Fine-tuning Workshop',
    description: 'Learn to customize language models for your domain.',
    level: 'Advanced',
    duration: '4 weeks',
    modules: 4,
    status: 'Coming Soon',
    outline: [
      'LLM Fundamentals',
      'Data Preparation',
      'Fine-tuning Techniques',
      'Evaluation & Deployment',
    ],
  },
  {
    slug: 'mcp-agents',
    title: 'AI Agents with MCP',
    description: 'Build Model Context Protocol integrations.',
    level: 'Intermediate',
    duration: '6 weeks',
    modules: 5,
    status: 'Coming Soon',
    outline: [
      'MCP Overview',
      'Agent Architecture',
      'Tool Integration',
      'Workflow Design',
      'Production Patterns',
    ],
  },
  {
    slug: 'multi-agent-systems',
    title: 'Multi-Agent Systems',
    description: 'Coordinate multiple AI agents to solve complex problems.',
    level: 'Advanced',
    duration: '8 weeks',
    modules: 6,
    status: 'Coming Soon',
    outline: [
      'Agent Communication',
      'Coordination Patterns',
      'Task Planning',
      'Memory Sharing',
      'Conflict Resolution',
      'Scaling Agents',
    ],
  },
];

export default function CoursesPage() {
  return (
    <main className="courses-page">
      <nav className="nav">
        <div className="nav-brand">
          <Link href="/">OpenAutonomyx Academy</Link>
        </div>
        <div className="nav-links">
          <Link href="/instructors">Instructors</Link>
          <Link href="/register" className="btn-nav">Enroll</Link>
        </div>
      </nav>

      <section className="courses-hero">
        <h1>Our Courses</h1>
        <p>Master production-ready AI systems with expert-led training</p>
      </section>

      <section className="courses-grid">
        {courses.map((course) => (
          <div key={course.slug} className="course-card">
            <div className={`course-status ${course.status.toLowerCase().replace(' ', '-')}`}>
              {course.status}
            </div>
            <h2>{course.title}</h2>
            <p className="course-desc">{course.description}</p>
            <div className="course-meta">
              <span><strong>Level:</strong> {course.level}</span>
              <span><strong>Duration:</strong> {course.duration}</span>
              <span><strong>Modules:</strong> {course.modules}</span>
            </div>
            <details className="course-outline">
              <summary>View Curriculum</summary>
              <ul>
                {course.outline.map((topic, i) => (
                  <li key={i}>{i + 1}. {topic}</li>
                ))}
              </ul>
            </details>
            {course.status === 'Available' ? (
              <Link href={`/langgraph-nextjs`} className="btn-course">
                View Course
              </Link>
            ) : (
              <button className="btn-course" disabled>
                Coming Soon
              </button>
            )}
          </div>
        ))}
      </section>

      <footer className="footer">
        <p>© 2026 OpenAutonomyx (OPCI) Private Limited</p>
      </footer>
    </main>
  );
}
