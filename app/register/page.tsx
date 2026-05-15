'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: 'intermediate',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="register">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h1>You're In!</h1>
          <p>Welcome to the course, {formData.name}!</p>
          <p className="success-detail">
            We've sent course access details to <strong>{formData.email}</strong>
          </p>
          <Link href="/" className="btn-primary">
            Go to Course
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="register">
      <nav className="nav">
        <Link href="/" className="nav-brand">LMX Academy</Link>
      </nav>

      <div className="register-container">
        <div className="register-header">
          <h1>Enroll Now</h1>
          <p>Join the course and start building autonomous AI systems.</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="experience">Experience Level</label>
            <select
              id="experience"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="pricing-summary">
            <div className="price-row">
              <span>Course Price</span>
              <span className="original">$199</span>
            </div>
            <div className="price-row discount">
              <span>Early Bird Discount</span>
              <span>-$100</span>
            </div>
            <div className="price-row total">
              <span>Total</span>
              <span className="total-price">$99</span>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Complete Enrollment
          </button>
        </form>

        <p className="form-note">
          By enrolling, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
}