'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    level: 'Beginner',
    duration: '4 weeks',
    modules: 5,
    outline: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          outline: form.outline.split('\n').filter(Boolean),
        }),
      });

      if (res.ok) {
        router.push('/courses');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ padding: '2rem 1rem', maxWidth: '800px' }}>
      <div className="page-header">
        <h1 className="page-title">Create Course</h1>
        <p style={{ color: 'var(--fg-muted)', marginTop: '0.5rem' }}>
          Add a new course to your library
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            type="text"
            className="input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g., LangGraph + Next.js Masterclass"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea
            className="input"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Course description..."
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Level</label>
            <select
              className="input"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Duration</label>
            <input
              type="text"
              className="input"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              placeholder="e.g., 4 weeks"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Modules</label>
          <input
            type="number"
            className="input"
            min={1}
            value={form.modules}
            onChange={(e) => setForm({ ...form, modules: parseInt(e.target.value) })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Outline (one per line)</label>
          <textarea
            className="input"
            rows={6}
            value={form.outline}
            onChange={(e) => setForm({ ...form, outline: e.target.value })}
            placeholder="Module 1: Introduction&#10;Module 2: Core Concepts"
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Course'}
          </button>
          <a href="/courses" className="btn btn-secondary">Cancel</a>
        </div>
      </form>
    </main>
  );
}
