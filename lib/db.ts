import Surreal from 'surrealdb';

const DB = new Surreal();

let db: Surreal | null = null;

export async function getDb() {
  if (db) return db;

  const url = process.env.SURREAL_URL || 'https://demo.surrealdb.com';
  const user = process.env.SURREAL_USER || 'root';
  const pass = process.env.SURREAL_PASS || 'root';
  const ns = process.env.SURREAL_NS || 'test';
  const dbName = process.env.SURREAL_DB || 'test';

  await DB.connect(url, {
    namespace: ns,
    database: dbName,
  });

  await DB.use({ namespace: ns, database: dbName });

  await DB.signin({ username: user, password: pass });

  db = DB;
  return db;
}

export async function closeDb() {
  if (db) {
    await db.close();
    db = null;
  }
}
