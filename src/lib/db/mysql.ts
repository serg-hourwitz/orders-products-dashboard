import mysql, { type Pool } from 'mysql2/promise';

let pool: Pool | null = null;

const requiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} environment variable is not defined`);
  }

  return value;
};

export const getDb = (): Pool => {
  if (pool) {
    return pool;
  }

  const enableSsl = process.env.DB_SSL === 'true';

  pool = mysql.createPool({
    host: requiredEnv('DB_HOST'),
    port: Number(process.env.DB_PORT ?? 3306),
    database: requiredEnv('DB_NAME'),
    user: requiredEnv('DB_USER'),
    password: requiredEnv('DB_PASSWORD'),

    ssl: enableSsl
      ? {
          minVersion: 'TLSv1.2',
        }
      : undefined,

    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60_000,
  });

  return pool;
};
