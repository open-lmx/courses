import Surreal from 'surrealdb';

let db: Surreal | null = null;

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

export async function closeDb() {
  if (db) {
    await db.close();
    db = null;
  }
}

// SurrealQL query helper
export async function query<T>(sql: string, vars?: Record<string, any>): Promise<T[]> {
  const database = await getDb();
  const result = await database.query<T[]>(sql, vars);
  return result[0] ? result[0] : [];
}

// SurrealQL: SELECT
export async function select<T>(table: string, limit = 10): Promise<T[]> {
  return query<T>(`SELECT * FROM ${table} LIMIT ${limit}`);
}

// SurrealQL: CREATE
export async function create<T>(table: string, data: any): Promise<T> {
  const database = await getDb();
  const result = await database.create<T>(table, data);
  return result[0];
}

// SurrealQL: UPDATE
export async function update<T>(id: string, data: any): Promise<T> {
  const database = await getDb();
  const result = await database.update<T>(id, data);
  return result[0];
}

// SurrealQL: DELETE
export async function remove(id: string): Promise<void> {
  const database = await getDb();
  await database.delete(id);
}
