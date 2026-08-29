import type { RowDataPacket } from 'mysql2';

import { getDb } from '@/lib/db/mysql';

interface HealthRow extends RowDataPacket {
  result: number;
}

export const GET = async () => {
  try {
    const db = getDb();

    const [rows] = await db.query<HealthRow[]>(
      'SELECT 1 AS result',
    );

    return Response.json({
      status: 'ok',
      database: rows[0]?.result === 1 ? 'connected' : 'unknown',
    });
  } catch (error) {
    console.error('Database health check failed:', error);

    return Response.json(
      {
        status: 'error',
        database: 'disconnected',
      },
      {
        status: 500,
      },
    );
  }
};
