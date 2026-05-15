# Instructor Guide

## Your Role

As an instructor, you will:
- Create and teach courses
- Link courses to SFIA skills
- Track student progress
- Prepare learners for jobs

## Getting Started

### 1. Access Dashboard
```
/dashboard - View your courses and analytics
```

### 2. Create Course
Navigate to `/courses/new` or use API:

```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Your Course Title",
    "description": "What learners will master",
    "level": "Intermediate",
    "duration": "6 weeks",
    "modules": 8
  }'
```

### 3. Add Skills
Link SFIA skills to your course:

```bash
curl -X POST http://localhost:3000/api/courses/{id}/skills \
  -H "Content-Type: application/json" \
  -d '{
    "skillId": "skill:PROG",
    "skillName": "Programming",
    "level": "Advanced"
  }'
```

## Teaching Best Practices

### Structure Each Module
1. **Introduction** - What and why
2. **Core Concepts** - Theory
3. **Hands-on** - Build something
4. **Practice** - Exercises
5. **Assessment** - Quiz or project

### Skill Progression
| Level | Skills | Description |
|-------|--------|-------------|
| Beginner | Basic syntax, tools | Foundation |
| Intermediate | Patterns, best practices | Applied skills |
| Advanced | Architecture, optimization | Expert skills |

### Link to Jobs
Your course should prepare learners for real roles:

```
Course: Building AI Agents
Skills: PROG (Advanced), DEVO (Intermediate)
↓ 
Job: AI Engineer (requires PROG, DEVO)
```

## Tracking Progress

### Enrollments
View enrolled students:
```bash
GET /api/courses/{id}/enrollments
```

### Update Progress
```bash
PUT /api/courses/{id}/progress \
  -d '{"user_id": "user:123", "progress": 50}'
```

### Completion Certificates
When progress = 100%, mark as complete:
```typescript
await relate('user_course', user_id, course_id, { 
  progress: 100, 
  completed_at: new Date() 
});
```

## Student Support

### Common Issues
1. **Stuck on exercises** - Provide hints, not solutions
2. **Technical problems** - Debug guide in course materials
3. **Questions** - Use course discussion/forum

### Feedback Loop
- Review student submissions weekly
- Update course based on feedback
- Add new examples regularly

## Analytics

### Key Metrics
| Metric | Description |
|--------|-------------|
| Enrollments | Students enrolled |
| Completion % | Finished course |
| Avg. progress | How far students get |
| Skill mastery | Skills gained |

### Access
```bash
GET /api/analytics/course/{id}
```

## Resources

- SFIA Framework: https://sfia-online.org
- SurrealDB: https://surrealdb.com/docs
- schema.org: https://schema.org/Course

## Support

- Issues: Open GitHub issue
- Email: instructors@openautonomyx.com
- Office Hours: Thursdays 2-4 PM
