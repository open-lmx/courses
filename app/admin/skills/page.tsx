'use client';

import { useState, useEffect } from 'react';

interface Skill {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editSkill, setEditSkill] = useState<Skill | null>(null);
  const [form, setForm] = useState({ code: '', name: '', category: '', description: '' });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const res = await fetch('/api/skills');
    const data = await res.json();
    setSkills(data.skills || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ code: '', name: '', category: '', description: '' });
      setEditSkill(null);
      fetchSkills();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    
    const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
    if (res.ok) fetchSkills();
  };

  const handleSeed = async () => {
    setLoading(true);
    await fetch('/api/skills/seed', { method: 'POST' });
    fetchSkills();
  };

  return (
    <main className="container" style={{ padding: '2rem 1rem' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Skill Management</h1>
          <p style={{ color: 'var(--fg-muted)', marginTop: '0.5rem' }}>
            Manage SFIA skills for course linking
          </p>
        </div>
        <button onClick={handleSeed} className="btn btn-secondary" disabled={loading}>
          Load SFIA Skills
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
        {/* Form */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>{editSkill ? 'Edit Skill' : 'Add Skill'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Code</label>
              <input
                type="text"
                className="input"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                placeholder="e.g., PROG"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Programming"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="input"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              >
                <option value="">Select category</option>
                <option>Software & Systems</option>
                <option>Technology</option>
                <option>Design</option>
                <option>Strategy</option>
                <option>Security</option>
                <option>Quality</option>
                <option>Communication</option>
                <option>Business</option>
                <option>Information & Data</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="input"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Skill description..."
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {editSkill ? 'Update' : 'Add'}
              </button>
              {editSkill && (
                <button 
                  type="button" 
                  className="btn btn-ghost"
                  onClick={() => { setEditSkill(null); setForm({ code: '', name: '', category: '', description: '' }); }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Category</th>
                <th style={{ width: '100px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id}>
                  <td><span className="badge badge-blue">{skill.code}</span></td>
                  <td>{skill.name}</td>
                  <td>{skill.category}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        className="btn btn-ghost"
                        onClick={() => setEditSkill(skill)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-ghost"
                        style={{ color: 'var(--red-500)' }}
                        onClick={() => handleDelete(skill.id)}
                      >
                        ×
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
