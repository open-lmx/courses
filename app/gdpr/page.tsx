import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GDPR Policy | OpenAutonomyx (OPCI) Private Limited',
  description: 'GDPR Compliance Policy for European users.',
};

export default function GDPRPage() {
  return (
    <main className="page-content">
      <h1>GDPR Policy</h1>
      <p className="last-updated">Last updated: May 2026</p>

      <section>
        <h2>1. Data Controller</h2>
        <p>OpenAutonomyx (OPCI) Private Limited is the data controller for EU users.</p>
      </section>

      <section>
        <h2>2. Legal Basis</h2>
        <p>We process data based on consent, contract necessity, and legitimate interests.</p>
      </section>

      <section>
        <h2>3. Data Collected</h2>
        <p>Name, email, payment info, and learning progress.</p>
      </section>

      <section>
        <h2>4. Your Rights</h2>
        <ul>
          <li>Access personal data</li>
          <li>Rectify inaccurate data</li>
          <li>Request erasure</li>
          <li>Data portability</li>
          <li>Object to processing</li>
        </ul>
      </section>

      <section>
        <h2>5. Data Retention</h2>
        <p>Data retained while account is active or as needed for legal obligations.</p>
      </section>

      <section>
        <h2>6. Transfers</h2>
        <p>Data transfers outside EU use adequate safeguards.</p>
      </section>

      <section>
        <h2>7. Complaints</h2>
        <p>File complaints with your local data protection authority.</p>
      </section>

      <section>
        <h2>8. DPO Contact</h2>
        <p>dpo@openautonomyx.com</p>
      </section>
    </main>
  );
}
