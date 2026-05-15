/**
 * SurrealDB Database Client
 * Docs: https://surrealdb.com/docs
 * Based on: SurrealDB SDK v2
 */

import Surreal from 'surrealdb';

let db: Surreal | null = null;

/**
 * Get or create database connection
 * Source: SurrealDB SDK - getDb() pattern
 */
export async function getDb() {
  if (db) return db;

  db = new Surreal();
  
  const url = process.env.SURREAL_URL || 'https://demo.surrealdb.com';
  const user = process.env.SURREAL_USER || 'root';
  const pass = process.env.SURREAL_PASS || 'root';
  const ns = process.env.SURREAL_NS || 'test';
  const dbName = process.env.SURREAL_DB || 'test';

  await db.connect(url, { namespace: ns, database: dbName });
  await db.use({ namespace: ns, database: dbName });
  await db.signin({ username: user, password: pass });

  return db;
}

/**
 * Close database connection
 * Source: SurrealDB SDK - close() method
 */
export async function closeDb() {
  if (db) {
    await db.close();
    db = null;
  }
}

/**
 * Execute raw SurrealQL query
 * Source: https://surrealdb.com/docs/learn/fundamentals/queries
 * @param sql - SurrealQL statement
 * @param vars - Query variables
 */
export async function query<T>(sql: string, vars?: Record<string, any>): Promise<T[]> {
  const database = await getDb();
  const result = await database.query<T[]>(sql, vars);
  return result[0] ? result[0] : [];
}

/**
 * Select records from table
 * Source: https://surrealdb.com/docs/learn/fundamentals/queries#select
 */
export async function select<T>(table: string, limit = 10): Promise<T[]> {
  return query<T>(`SELECT * FROM ${table} LIMIT ${limit}`);
}

/**
 * Create new record
 * Source: https://surrealdb.com/docs/reference/query-language/statements/create
 */
export async function create<T>(table: string, data: any): Promise<T> {
  const database = await getDb();
  const result = await database.create<T>(table, data);
  return result[0];
}

/**
 * Update existing record
 * Source: https://surrealdb.com/docs/reference/query-language/statements/update
 */
export async function update<T>(id: string, data: any): Promise<T> {
  const database = await getDb();
  const result = await database.update<T>(id, data);
  return result[0];
}

/**
 * Delete record
 * Source: https://surrealdb.com/docs/reference/query-language/statements/delete
 */
export async function remove(id: string): Promise<void> {
  const database = await getDb();
  await database.delete(id);
}

/**
 * Define graph edge table (TYPE RELATION)
 * Source: https://surrealdb.com/docs/learn/data-models/graph/creating-relations
 * @param name - Edge table name
 * @param from - Source table
 * @param to - Target table
 * @param edge_fields - Additional edge fields
 */
export async function defineEdge(
  name: string, 
  from: string, 
  to: string, 
  edge_fields?: Record<string, string>
) {
  const database = await getDb();
  
  // Define TYPE RELATION for graph edges
  await database.query(`DEFINE TABLE IF NOT EXISTS ${name} TYPE RELATION`);
  
  // Define IN and OUT to specify edge direction
  await database.query(`DEFINE FIELD IF NOT EXISTS in ON ${name} TYPE ${from}`);
  await database.query(`DEFINE FIELD IF NOT EXISTS out ON ${name} TYPE ${to}`);
  
  // Define additional metadata fields
  if (edge_fields) {
    for (const [field, type] of Object.entries(edge_fields)) {
      await database.query(`DEFINE FIELD IF NOT EXISTS ${field} ON ${name} TYPE ${type}`);
    }
  }
}

/**
 * Create graph relationship (edge)
 * Source: https://surrealdb.com/docs/learn/fundamentals/relationships/graph-relations
 * @param edge - Edge table name
 * @param from_id - Source record ID
 * @param to_id - Target record ID
 * @param data - Edge metadata
 */
export async function relate(
  edge: string, 
  from_id: string, 
  to_id: string, 
  data?: Record<string, any>
) {
  const database = await getDb();
  return await database.relate(`${edge}`, { in: from_id, out: to_id, ...data });
}

/**
 * Find relationships
 * Source: SurrealDB graph queries
 */
export async function getEdges(edge: string, from_id?: string, to_id?: string) {
  let sql = `SELECT * FROM ${edge}`;
  const vars: Record<string, string> = {};
  
  if (from_id && to_id) {
    sql += ` WHERE in = $from AND out = $to`;
    vars.from = from_id;
    vars.to = to_id;
  } else if (from_id) {
    sql += ` WHERE in = $from`;
    vars.from = from_id;
  } else if (to_id) {
    sql += ` WHERE out = $to`;
    vars.to = to_id;
  }
  
  return query(sql, vars);
}

/**
 * Link course to skill (knowledge graph)
 * Source: SurrealDB RELATE statement
 */
export async function linkCourseToSkill(course_id: string, skill_id: string, level = 'Intermediate') {
  return relate('course_skill', course_id, skill_id, { level });
}

/**
 * Enroll user in course
 * Source: SurrealDB graph edge with metadata
 */
export async function enrollUser(user_id: string, course_id: string, progress = 0) {
  return relate('user_course', user_id, course_id, { progress, enrolled_at: new Date().toISOString() });
}

/**
 * Link course to job preparation
 * Source: SurrealDB knowledge graph
 */
export async function prepareForJob(course_id: string, job_id: string) {
  return relate('course_job', course_id, job_id, {});
}
