import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Responsible AI Policy | OpenAutonomyx (OPCI) Private Limited',
};

export default function Page() {
  return (
    <main className="page-content">
      <h1>Responsible AI Policy</h1>
      <p>Last updated: May 2026</p>
      <section>
        <h2>1. Ethical AI Development</h2>
        <p>AI systems designed to benefit humanity.</p>
      </section>
      <section>
        <h2>2. Fairness</h2>
        <p>Non-discriminatory AI systems.</p>
      </section>
      <section>
        <h2>3. Transparency</h2>
        <p>Explainable AI decisions.</p>
      </section>
      <section>
        <h2>4. Human Oversight</h2>
        <p>Human control maintained.</p>
      </section>
      <section>
        <h2>5. Privacy by Design</h2>
        <p>Minimal data collection.</p>
      </section>
      <section>
        <h2>6. Environmental Responsibility</h2>
        <p>Optimized for efficiency.</p>
      </section>
    </main>
  );
}
