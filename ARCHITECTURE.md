# Architecture Documentation

## Overview

**LangGraph + Next.js Course Platform** - AI-powered autonomous learning system with SurrealDB backend.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js | 14.2.3 |
| Auth | NextAuth.js | 4.24.14 |
| Database | SurrealDB | 2.0.3 |
| Adapter | @auth/surrealdb-adapter | 2.2.2 |

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Frontend                          │
│  ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌─────────┐           │
│  │Courses │ │Skills  │ │ Learning│ │ Jobs   │           │
│  │  Page  │ │ Library│ │  Paths  │ │ Page   │           │
│  └────────┘ └────────┘ └──────────┘ └─────────┘           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Routes                             │
│  ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌─────────┐           │
│  │/courses│ │/skills │ │/learning│ │/jobs   │           │
│  │   /auth│ │  /recomm│ │  -paths │ │        │           │
│  └────────┘ └────────┘ └──────────┘ └─────────┘           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   lib/db.ts                              │
│  - query(), create(), update(), remove()                     │
│  - relate(), defineEdge() ← Knowledge Graph            │
│  Source: https://surrealdb.com/docs                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  SurrealDB Cloud                         │
│  Namespace: test                                       │
│  Tables: user, course, skill, job, learning_path        │
│  Edges: user_course, course_skill, user_skill          │
└─────────────────────────────────────────────────────────────┘
```

## Integrations

### 1. Frappe LMS / HR
- **Source**: https://github.com/frappe/lms
- **API**: `lib/frappe/client.ts`
- **Sync**: Courses ↔ Job Openings

### 2. Moodle REST API
- **Source**: https://docs.moodle.org
- **API**: `lib/moodle/client.ts`
- **Sync**: Users, Courses, Enrollments

### 3. OIDC / OAuth2 SSO
- **Provider**: Generic OAuth2 (NextAuth)
- **Config**: `lib/auth.ts`
- **Env**: OIDC_*

## Knowledge Graph

### Schema (SurrealDB)

```sql
-- Nodes
DEFINE TABLE user SCHEMAFULL;
DEFINE TABLE course SCHEMAFULL;
DEFINE TABLE skill SCHEMAFULL;
DEFINE TABLE job SCHEMAFULL;
DEFINE TABLE learning_path SCHEMAFULL;

-- Edges (TYPE RELATION)
DEFINE TABLE user_course TYPE RELATION;
DEFINE FIELD in ON user_course TYPE user;
DEFINE FIELD out ON user_course TYPE course;
DEFINE FIELD progress ON user_course TYPE int;

DEFINE TABLE course_skill TYPE RELATION;
DEFINE FIELD in ON course_skill TYPE course;
DEFINE FIELD out ON course_skill TYPE skill;
DEFINE FIELD level ON course_skill TYPE string;

DEFINE TABLE course_job TYPE RELATION;
DEFINE FIELD in ON course_job TYPE course;
DEFINE FIELD out ON course_job TYPE job;
```

### Relationships

| From | Edge | To | Description |
|------|------|-----|------------|
| User | →enrolls→ | Course | User enrolled in course |
| Course | →teaches→ | Skill | Course teaches skill |
| User | →learns→ | Skill | User learning skill |
| Course | →prepares→ | Job | Course prepares for job |

## API Endpoints

### Courses
- `GET /api/courses` - List courses
- `POST /api/courses` - Create course
- `GET /api/courses/[id]` - Get course
- `POST /api/courses/[id]/skills` - Link skills

### Skills
- `GET /api/skills` - List SFIA skills
- `POST /api/skills` - Create skill
- `POST /api/skills/seed` - Seed SFIA framework

### Learning Paths
- `GET /api/learning-paths` - List paths
- `POST /api/learning-paths` - Create path

### Jobs
- `GET /api/jobs` - List (from Frappe LMS)
- `POST /api/jobs` - Create job

### Recommendations
- `GET /api/recommendations?goal=get job` - Get personalized
- `POST /api/recommendations` - Save preferences

## Data Models

### Course (schema.org)
```typescript
{
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: number;
  skills: Skill[];
  status: 'draft' | 'published';
  created_at: string;
}
```

### Skill (SFIA)
```typescript
{
  id: string;
  code: string;      // SFIA code, e.g., 'PROG'
  name: string;
  category: string;   // Software & Systems, Design, etc.
  description: string;
}
```

### User (Person schema.org)
```typescript
{
  id: string;
  email: string;
  name: string;
  goal: string;      // e.g., 'get job', 'learn AI'
  skills: Skill[];  // Learning
  interests: string[];
}
```

## Configuration

### Environment Variables

```env
# SurrealDB
SURREAL_URL=
SURREAL_NS=
SURREAL_DB=
SURREAL_USER=
SURREAL_PASS=

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# OIDC SSO (optional)
OIDC_PROVIDER_NAME=
OIDC_CLIENT_ID=
OIDC_CLIENT_SECRET=
OIDC_ISSUER=

# Frappe (optional)
FRAPPE_URL=
FRAPPE_KEY=
FRAPPE_SECRET=

# Moodle (optional)
MOODLE_URL=
MOODLE_TOKEN=
```

## Deployment

1. **SurrealDB Cloud** - Create namespace & tables
2. **GitHub** - Push to repo
3. **Vercel** - Deploy (auto-detect Next.js)

## References

- SurrealDB: https://surrealdb.com/docs
- NextAuth: https://next-auth.js.org
- SFIA: https://sfia-online.org
- Frappe LMS: https://github.com/frappe/lms
- Schema.org: https://schema.org

---

## Integration Coordination

### Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                        Our Platform                           │
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│  │  SurrealDB  │◄───│  Next.js   │◄───│  Frontend  │         │
│  │  (Source)  │    │   API     │    │    (UI)   │         │
│  └─────┬──────┘    └─────┬──────┘    └──────────────┘         │
│        │                 │                                    │
│        │  sync          │  auth                             │
│        ▼                 ▼                                    │
│  ┌──────────────┐    ┌──────────────┐                        │
│  │   Frappe    │◄───│  OIDC SSO   │                        │
│  │   LMS/HR    │    │  (Auth)    │                        │
│  └─────┬──────┘    └──────────────┘                        │
│        │                                                      │
│   sync │                                                      │
│        ▼                                                      │
│  ┌──────────────┐                                             │
│  │   Moodle    │                                              │
│  │   (Mirror) │                                              │
│  └──────────────┘                                             │
└──────────────────────────────────────────────────────────┘
```

### Sync Matrix

| From → To | Trigger | Method | Frequency |
|-----------|--------|--------|----------|
| SurrealDB → Frappe | Course create/update | REST API | On-demand |
| Frappe → SurrealDB | Jobs page view | REST API | Real-time |
| SurrealDB → Moodle | User/Enrollment | REST API | On-demand |
| User → OIDC | Login | OAuth2 | On-login |

### Authentication Flow

```
User ──► Login Page ──► OIDC Provider ──► Callback ──► JWT Session
                    │                           │
                    │                           ▼
                    │                    SurrealDB (user table)
                    │
Moodle ──◄── REST API ──◄── Internal API ──◄── NextAuth
```

### Course Enrollment Flow

```
1. User visits /courses
2. API fetches courses from SurrealDB
3. User clicks "Enroll"
4. NextAuth validates session
5. API creates RELATE user→course edge
6. Links to skills (knowledge graph)
7. Updates enrollment progress
8. Recommends next courses
```

### Recommendation Engine

```
Goal Input (e.g., "get job")
         │
         ▼
┌─────────────────────────────────┐
│  Map goal → SFIA skills          │
│  get job → [PROG, DEVO, ARCH]  │
└─────────────┬───────────────────┘
              │
              ▼
┌─────────────────────────────────┐
│  Query SurrealDB                 │
│  array::intersect(skills, target)│
└─────────────┬───────────────────┘
              │
              ▼
┌─────────────────────────────────┐
│  Rank by match score            │
│  Return top 5 courses          │
└─────────────────────────────────┘
```
