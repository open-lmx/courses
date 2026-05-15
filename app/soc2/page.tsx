import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance | OpenAutonomyx (OPCI) Private Limited',
  description: 'SOC 2 Type II compliance information.',
};

export default function SOC2Page() {
  return (
    <main className="page-content">
      <h1>SOC 2 Compliance</h1>
      <p className="last-updated">Last updated: May 2026</p>

      <section>
        <h2>1. SOC 2 Type II Certified</h2>
        <p>OpenAutonomyx (OPCI) Private Limited maintains SOC 2 Type II compliance.</p>
      </section>

      <section>
        <h2>2. Trust Service Criteria</h2>
        <ul>
          <li>Security</li>
          <li>Availability</li>
          <li>Processing Integrity</li>
          <li>Confidentiality</li>
          <li>Privacy</li>
        </ul>
      </section>

      <section>
        <h2>3. Security Controls</h2>
        <ul>
          <li>Multi-factor authentication</li>
          <li>Role-based access control</li>
          <li>Encryption at rest and in transit</li>
          <li>Annual penetration testing</li>
        </ul>
      </section>

      <section>
        <h2>4. Auditing</h2>
        <p>Annual third-party audits by independent security firms.</p>
      </section>

      <section>
        <h2>5. Incident Response</h2>
        <p>Documented incident response procedures with notification timelines.</p>
      </section>

      <section>
        <h2>6. Vendor Management</h2>
        <p>Third-party vendors are vetted for security compliance.</p>
      </section>

      <section>
        <h2>7. Employee Training</h2>
        <p>Regular security awareness training for all employees.</p>
      </section>

      <section>
        <h2>8. Compliance Reports</h2>
        <p>Available to enterprise customers upon request.</p>
      </section>
    </main>
  );
}
