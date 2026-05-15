import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Instructors | OpenAutonomyx (OPCI) Private Limited',
  description: 'Join our team of expert instructors and share your knowledge.',
};

export default function BecomeTeacherPage() {
  return (
    <main className="page-content">
      <h1>Instructors</h1>
      <p className="subtitle">Share your expertise with the next generation of AI developers.</p>

      <section>
        <h2>Why Teach With Us?</h2>
        <ul>
          <li>Reach thousands of learners worldwide</li>
          <li>Competitive revenue sharing</li>
          <li>Flexible schedule</li>
          <li>Professional development support</li>
        </ul>
      </section>

      <section>
        <h2>Requirements</h2>
        <ul>
          <li>5+ years in AI/ML development</li>
          <li>Proven industry experience</li>
          <li>Strong communication skills</li>
          <li>Passion for teaching</li>
        </ul>
      </section>

      <section>
        <h2>What We Offer</h2>
        <ul>
          <li>Course creation tools</li>
          <li>Marketing support</li>
          <li>30% revenue share</li>
          <li>Community of instructors</li>
        </ul>
      </section>

      <section>
        <h2>How to Apply</h2>
        <p>Submit your application with:</p>
        <ul>
          <li>Resume/CV</li>
          <li>Portfolio of work</li>
          <li>Teaching sample (video)</li>
          <li>Course proposal</li>
        </ul>
      </section>

      <section>
        <h2>Apply Now</h2>
        <p>Email: instructors@openautonomyx.com</p>
      </section>
    </main>
  );
}
