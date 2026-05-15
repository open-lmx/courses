import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Security Policy | OpenAutonomyx (OPCI) Private Limited',
  description: 'AI Security Policy for autonomous AI systems.',
};

export default function AISecurityPage() {
  return (
    <main className="page-content">
      <h1>AI Security Policy</h1>
      <p className="last-updated">Last updated: May 2026</p>

      <section>
        <h2>1. System Boundaries</h2>
        <p>AI systems operate within defined security boundaries with explicit permission scopes.</p>
      </section>

      <section>
        <h2>2. Input Validation</h2>
        <p>All inputs are validated, sanitized, and sandboxed before processing.</p>
      </section>

      <section>
        <h2>3. Output Filtering</h2>
        <p>AI outputs pass through security filters to prevent harmful content.</p>
      </section>

      <section>
        <h2>4. Rate Limiting</h2>
        <p>API calls are rate-limited to prevent abuse and resource exhaustion.</p>
      </section>

      <section>
        <h2>5. Audit Logging</h2>
        <p>All AI interactions are logged with timestamps for security review.</p>
      </section>

      <section>
        <h2>6. Access Control</h2>
        <p>Role-based access control ensures least-privilege principles.</p>
      </section>

      <section>
        <h2>7. Incident Response</h2>
        <p>Security incidents trigger automated alerts and containment protocols.</p>
      </section>

      <section>
        <h2>8. Reporting</h2>
        <p>Report security issues: security@openautonomyx.com</p>
      </section>
    </main>
  );
}
