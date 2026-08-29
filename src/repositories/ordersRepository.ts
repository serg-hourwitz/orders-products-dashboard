import type { ResultSetHeader, RowDataPacket } from 'mysql2';

import { getDb } from '@/lib/db/mysql';
import type { Order } from '@/types/order';

interface OrderRow extends RowDataPacket {
  id: number;
  title: string;
  description: string;
  order_date: Date | string;
}

interface CreateOrderInput {
  title: string;
  description: string;
  date: string;
}

const formatDate = (value: Date | string): string => {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 19).replace('T', ' ');
  }

  return String(value);
};

const mapOrder = (row: OrderRow): Order => ({
  id: row.id,
  title: row.title,
  description: row.description,
  date: formatDate(row.order_date),
});

export const ordersRepository = {
  async findAll(): Promise<Order[]> {
    const db = getDb();

    const [rows] = await db.query<OrderRow[]>(`
      SELECT
        id,
        title,
        description,
        order_date
      FROM orders
      ORDER BY id
    `);

    return rows.map(mapOrder);
  },

  async findById(id: number): Promise<Order | null> {
    const db = getDb();

    const [rows] = await db.execute<OrderRow[]>(
      `
        SELECT
          id,
          title,
          description,
          order_date
        FROM orders
        WHERE id = ?
        LIMIT 1
      `,
      [id],
    );

    const row = rows[0];

    return row ? mapOrder(row) : null;
  },

  async create(input: CreateOrderInput): Promise<Order> {
    const db = getDb();

    const [result] = await db.execute<ResultSetHeader>(
      `
        INSERT INTO orders (
          title,
          description,
          order_date
        )
        VALUES (?, ?, ?)
      `,
      [input.title, input.description, input.date],
    );

    const order = await this.findById(result.insertId);

    if (!order) {
      throw new Error('Failed to load created order');
    }

    return order;
  },

  async deleteById(id: number): Promise<boolean> {
    const db = getDb();

    const [result] = await db.execute<ResultSetHeader>(
      `
        DELETE FROM orders
        WHERE id = ?
      `,
      [id],
    );

    return result.affectedRows > 0;
  },
};
