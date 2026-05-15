import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Source Policy | OpenAutonomyx (OPCI) Private Limited',
  description: 'Open Source Policy for OpenAutonomyx (OPCI) Private Limited Academy.',
};

export default function OpenSourcePage() {
  return (
    <main className="page-content">
      <h1>Open Source Policy</h1>
      <p className="last-updated">Last updated: May 2026</p>

      <section>
        <h2>1. Our Commitment</h2>
        <p>
          OpenAutonomyx (OPCI) Private Limited is committed to open source principles. We believe in transparency, collaboration, and community-driven development.
        </p>
      </section>

      <section>
        <h2>2. License Framework</h2>
        <p>
          Our educational content and code examples are released under various open source licenses including MIT, Apache 2.0, and AGPL depending on the component.
        </p>
      </section>

      <section>
        <h2>3. Contributions</h2>
        <p>
          We welcome contributions from the community. Please review our contribution guidelines before submitting pull requests.
        </p>
      </section>

      <section>
        <h2>4. Third-Party Dependencies</h2>
        <p>
          Our courses use open source projects. We are grateful to the maintainers and contributors of these projects.
        </p>
      </section>

      <section>
        <h2>5. Attribution</h2>
        <p>
          Proper attribution is required when using our open source code. Please include the license notice and copyright information.
        </p>
      </section>

      <section>
        <h2>6. Commercial Use</h2>
        <p>
          Our open source materials can be used commercially under the terms of their respective licenses.
        </p>
      </section>

      <section>
        <h2>7. No Warranty</h2>
        <p>
          All code is provided "as is" without warranty of any kind.
        </p>
      </section>

      <section>
        <h2>8. Contact</h2>
        <p>
          For open source inquiries: opensource@openautonomyx.com
        </p>
      </section>
    </main>
  );
}
