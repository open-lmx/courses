import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Build Autonomous AI Systems with LangGraph + Next.js',
  description: 'Master building code-first autonomous AI systems using LangGraph Deep Agent Framework and Next.js. 20 comprehensive lessons from foundations to production.',
  openGraph: {
    title: 'Build Autonomous AI Systems with LangGraph + Next.js',
    description: 'Master the art of building code-first autonomous AI systems using LangGraph and Next.js',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main className="landing">
      <nav className="nav">
        <div className="nav-brand">OpenAutonomyx (OPCI) Private Limited</div>
        <div className="nav-links">
          <Link href="/#curriculum">Curriculum</Link>
          <Link href="/register" className="btn-nav">Enroll Now</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">New Course</span>
          <h1 className="hero-title">
            Build Autonomous<br />
            <span className="highlight">AI Systems</span>
          </h1>
          <p className="hero-subtitle">
            Master the art of building code-first autonomous AI systems using 
            LangGraph Deep Agent Framework and Next.js. From foundations to production.
          </p>
          <div className="hero-actions">
            <Link href="/register" className="btn-primary">
              Start Learning
            </Link>
            <Link href="/#curriculum" className="btn-secondary">
              View Curriculum
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="code-block">
            <div className="code-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <pre><code>{`import { LangGraph } from '@langchain/langgraph';

const graph = new LangGraph();

graph.addNode('reason', reasonNode);
graph.addNode('act', actNode);

graph.addEdge(START, 'reason');
graph.addConditionalEdges('reason', shouldContinue);
graph.addEdge('act', 'reason');
graph.addEdge('act', END);

export const agent = graph.compile();`}</code></pre>
          </div>
        </div>
      </section>

      <section className="features" id="curriculum">
        <div className="section-header">
          <h2>Course Curriculum</h2>
          <p>5 comprehensive modules. 20 hands-on lessons. Real-world projects.</p>
        </div>
        
        <div className="modules-grid">
          <div className="module-card">
            <span className="module-number">01</span>
            <h3>Foundations</h3>
            <ul>
              <li>AI System Architecture</li>
              <li>LangGraph Overview</li>
              <li>Development Setup</li>
              <li>Hello World System</li>
            </ul>
          </div>
          
          <div className="module-card">
            <span className="module-number">02</span>
            <h3>Core System</h3>
            <ul>
              <li>State & Memory</li>
              <li>Tool Integration</li>
              <li>Reasoning Chains</li>
              <li>Error Handling</li>
            </ul>
          </div>
          
          <div className="module-card">
            <span className="module-number">03</span>
            <h3>Next.js Integration</h3>
            <ul>
              <li>App Router Setup</li>
              <li>API Endpoints</li>
              <li>Chat Interface</li>
              <li>Streaming</li>
            </ul>
          </div>
          
          <div className="module-card">
            <span className="module-number">04</span>
            <h3>Advanced Patterns</h3>
            <ul>
              <li>Multi-System Design</li>
              <li>Custom Tools</li>
              <li>Optimization</li>
              <li>Testing & Debugging</li>
            </ul>
          </div>
          
          <div className="module-card">
            <span className="module-number">05</span>
            <h3>Production</h3>
            <ul>
              <li>Environment Config</li>
              <li>Security</li>
              <li>Monitoring</li>
              <li>Vercel Deployment</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pricing">
        <div className="pricing-card">
          <div className="pricing-badge">Early Bird</div>
          <div className="pricing-amount">
            <span className="currency">$</span>
            <span className="price">99</span>
            <span className="original">$199</span>
          </div>
          <h3>Complete Course Access</h3>
          <ul className="pricing-features">
            <li>✓ 20 Video Lessons</li>
            <li>✓ 50+ Code Examples</li>
            <li>✓ Hands-on Projects</li>
            <li>✓ Certificate of Completion</li>
            <li>✓ Lifetime Access</li>
          </ul>
          <Link href="/register" className="btn-pricing">
            Enroll Now
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">OpenAutonomyx (OPCI) Private Limited</div>
          <p>© 2026 OpenAutonomyx (OPCI) Private Limited. A private limited company incorporated under the Companies Act, 2013. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}