# Contributing Guidelines

## Code Style

### TypeScript
- Use TypeScript strict mode
- Prefer interfaces over types for data models
- Use `any` sparingly - always type properly

### SurrealDB Integration
- Always use parameterized queries: `db.query('SELECT * FROM $table', { table })`
- Never concatenate user input into queries
- Use `relate()` for graph edges, not direct INSERT

### API Routes
- Return consistent JSON structure:
```typescript
{ success: true, data }
{ error: string, status: number }
```

### Frontend Components
- Use Frappe design system classes (see `app/globals.css`)
- Follow: `.card`, `.btn`, `.input`, `.badge`

## Git Conventions

### Branch Naming
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code improvements

### Commit Messages
```
type: short description

Longer description if needed.

Co-authored-by: name <email>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Database

### Adding New Tables
1. Define in SurrealDB first:
```sql
DEFINE TABLE new_table SCHEMAFULL;
DEFINE FIELD name ON new_table TYPE string;
```

2. Add helper in `lib/db.ts`:
```typescript
export async function createNewTable(data: NewType) {
  return create('new_table', data);
}
```

3. Add API route in `app/api/new-table/route.ts`

### Graph Edges
```typescript
// Define edge table
await defineEdge('edge_name', 'from_table', 'to_table', {
  field: 'type'
});

// Create relationship
await relate('edge_name', from_id, to_id, { metadata });
```

## Testing

### Manual Tests
1. Start dev server: `npm run dev`
2. Test endpoints with curl or browser
3. Verify SurrealDB data via dashboard

### API Testing
```bash
# Get courses
curl http://localhost:3000/api/courses

# Create course
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"title": "Test"}'
```

## Security

### Never Do
- Don't log secrets/passwords
- Don't commit `.env.local`
- Don't use `eval()` or `exec()`
- Don't concatenate user input into SQL

### Always Do
- Use environment variables for secrets
- Validate input on API routes
- Use parameterized queries
- Sanitize user data before display

## Adding Integrations

### Frappe
1. Add client in `lib/frappe/client.ts`
2. Use env vars: `FRAPPE_URL`, `FRAPPE_KEY`
3. Handle errors gracefully (optional integration)

### Moodle
1. Add client in `lib/moodle/client.ts`
2. Use env vars: `MOODLE_URL`, `MOODLE_TOKEN`
3. Add sync triggers (optional)

### SSO/OIDC
1. Add provider in `lib/auth.ts`
2. Configure env vars
3. Test OAuth flow

## Release Process

1. Update version in `package.json`
2. Run tests/manual verification
3. Update CHANGELOG.md
4. Create git tag: `git tag v1.0.0`
5. Push: `git push origin main --tags`

## Questions?

- Open issue: https://github.com/open-lmx/courses/issues
- Docs: https://surrealdb.com/docs
- SFIA: https://sfia-online.org
