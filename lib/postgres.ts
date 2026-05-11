import { Pool } from "pg";

declare global {
  // Reuse the pool during local hot reload to avoid exhausting connections.
  var __appointmentPool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.SUPABASE_SESSION_POOL_DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "Missing SUPABASE_SESSION_POOL_DATABASE_URL. Use the Supabase Session Pool connection string in your server environment.",
    );
  }

  return new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

export function getPool() {
  if (global.__appointmentPool) {
    return global.__appointmentPool;
  }

  const pool = createPool();

  if (process.env.NODE_ENV !== "production") {
    global.__appointmentPool = pool;
  }

  return pool;
}
