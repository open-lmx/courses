import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | OpenAutonomyx (OPCI) Private Limited',
  description: 'Privacy Policy for OpenAutonomyx (OPCI) Private Limited Academy.',
};

export default function PrivacyPage() {
  return (
    <main className="page-content">
      <h1>Privacy Policy</h1>
      <p className="last-updated">Last updated: May 2026</p>

      <section>
        <h2>1. Information We Collect</h2>
        <ul>
          <li>Account information (name, email)</li>
          <li>Payment information</li>
          <li>Learning progress</li>
        </ul>
      </section>

      <section>
        <h2>2. How We Use Information</h2>
        <ul>
          <li>Provide course access</li>
          <li>Process payments</li>
          <li>Improve our services</li>
        </ul>
      </section>

      <section>
        <h2>3. Data Protection</h2>
        <p>
          We implement appropriate security measures to protect your personal information.
        </p>
      </section>

      <section>
        <h2>4. Third-Party Disclosure</h2>
        <p>
          We do not sell or trade your personal information. Trusted partners who assist us in operating our platform are bound by confidentiality agreements.
        </p>
      </section>

      <section>
        <h2>5. Cookies</h2>
        <p>
          We use cookies to enhance your experience. You can disable cookies in your browser settings.
        </p>
      </section>

      <section>
        <h2>6. Your Rights</h2>
        <ul>
          <li>Access your data</li>
          <li>Request deletion</li>
          <li>Opt-out of communications</li>
        </ul>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>
          For privacy concerns, contact: privacy@openautonomyx.com
        </p>
      </section>
    </main>
  );
}
