import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | OpenAutonomyx (OPCI) Private Limited',
  description: 'Terms of Service for OpenAutonomyx (OPCI) Private Limited Academy courses.',
};

export default function TermsPage() {
  return (
    <main className="page-content">
      <h1>Terms of Service</h1>
      <p className="last-updated">Last updated: May 2026</p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using OpenAutonomyx (OPCI) Private Limited Academy, you agree to be bound by these Terms of Service.
        </p>
      </section>

      <section>
        <h2>2. Use License</h2>
        <p>
          Permission is granted to use our courses for personal, non-commercial learning purposes only.
        </p>
      </section>

      <section>
        <h2>3. Content Ownership</h2>
        <p>
          All course content including videos, code examples, and materials are owned by OpenAutonomyx (OPCI) Private Limited.
        </p>
      </section>

      <section>
        <h2>4. User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials.
        </p>
      </section>

      <section>
        <h2>5. Prohibited Use</h2>
        <ul>
          <li>Redistributing course content without permission</li>
          <li>Using content for commercial purposes</li>
          <li>Sharing account access</li>
        </ul>
      </section>

      <section>
        <h2>6. Disclaimer</h2>
        <p>
          Course materials are provided "as is". We do not guarantee specific outcomes.
        </p>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>
          OpenAutonomyx (OPCI) Private Limited shall not be liable for any indirect, incidental, or consequential damages.
        </p>
      </section>

      <section>
        <h2>8. Governing Law</h2>
        <p>
          These terms are governed by the laws of India.
        </p>
      </section>

      <section>
        <h2>9. Contact</h2>
        <p>
          For questions, contact: support@openautonomyx.com
        </p>
      </section>
    </main>
  );
}
