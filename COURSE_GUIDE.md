# Course Contributor Guide

## Quick Start

### 1. Create a Course
```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "LangGraph Fundamentals",
    "description": "Build AI agents with LangGraph",
    "level": "Intermediate",
    "duration": "6 weeks",
    "modules": 8
  }'
```

### 2. Link Skills
```bash
curl -X POST http://localhost:3000/api/courses/course_id/skills \
  -H "Content-Type: application/json" \
  -d '{"skillId": "skill:PROG", "skillName": "Programming", "level": "Advanced"}'
```

## Course Structure

```typescript
{
  title: string;           // Required - Course title
  description: string;   // Required - What you learn
  level: string;         // Beginner | Intermediate | Advanced
  duration: string;     // e.g., "6 weeks"
  modules: number;       // Number of modules
  outline: string[];    // Module titles
  skills: Skill[];       // SFIA skills this course teaches
  status: string;       // draft | published
}
```

## Required Skills (SFIA)

Add at least 2 SFIA skills from:

| Category | Skills |
|----------|--------|
| Software | PROG, DEVO, TEST, WEB |
| Data | DATS, ANALY, DATM |
| Architecture | ARCH, IFDN |
| Security | SCTY, CYBS |
| Management | PRMG, PMGR, BUSA |

## Linking to Jobs

Courses should prepare for real jobs. Link courses to job skills:

1. Course teaches: PROG, DEVO
2. Jobs require: PROG, DEVO
3. User enrolls → completes → qualified for jobs

## Best Practices

### Title
- Use action verbs: "Building", "Mastering", "Creating"
- Include technology: "LangGraph", "Next.js", "SurrealDB"

### Description
- Start with "Learn to..."
- Mention outcomes
- Who is this for?

### Skills
- Minimum 2 skills
- Include progression level
- Match job market needs

## Example Course

```json
{
  "title": "Building AI Agents with LangGraph",
  "description": "Learn to build autonomous AI agents using LangGraph. 
    Covers state management, tool use, and production patterns. 
    For developers with Python experience.",
  "level": "Advanced",
  "duration": "8 weeks",
  "modules": 12,
  "outline": [
    "Introduction to AI Agents",
    "LangGraph Basics",
    "State Management",
    "Tool Integration",
    "Memory & Context",
    "Multi-Agent Systems",
    "Testing Agents",
    "Deployment"
  ],
  "skills": [
    {"code": "PROG", "level": "Advanced"},
    {"code": "DEVO", "level": "Intermediate"},
    {"code": "ARCH", "level": "Intermediate"}
  ]
}
```

## Grading & Progress

Courses track user progress via knowledge graph:

```typescript
// User enrolls
await relate('user_course', 'user:id', 'course:id', { progress: 0 });

// Update progress
await relate('user_course', 'user:id', 'course:id', { progress: 50 });
```

## Publishing

1. Set status to `published`
2. Add at least 2 skills
3. Complete outline
4. Test in browser

## Resources

- SFIA Skills: https://sfia-online.org
- Schema.org Course: https://schema.org/Course
- LangGraph Docs: https://langchain.dev
