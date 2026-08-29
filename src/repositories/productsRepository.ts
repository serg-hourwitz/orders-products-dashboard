import type { RowDataPacket } from 'mysql2';

import { getDb } from '@/lib/db/mysql';
import type { CurrencySymbol, Product } from '@/types/product';

interface ProductRow extends RowDataPacket {
  id: number;
  serial_number: number;
  is_new: number | boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee_start: Date | string;
  guarantee_end: Date | string;
  order_id: number;
  product_date: Date | string;
  price_value: string | number;
  price_currency: CurrencySymbol;
  price_is_default: number | boolean;
}

const formatDate = (value: Date | string): string => {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 19).replace('T', ' ');
  }

  return String(value);
};

export const productsRepository = {
  async findAll(): Promise<Product[]> {
    const db = getDb();

    const [rows] = await db.query<ProductRow[]>(`
      SELECT
        p.id,
        p.serial_number,
        p.is_new,
        p.photo,
        p.title,
        p.type,
        p.specification,
        p.guarantee_start,
        p.guarantee_end,
        p.order_id,
        p.product_date,
        pp.value AS price_value,
        pp.currency AS price_currency,
        pp.is_default AS price_is_default
      FROM products p
      JOIN product_prices pp
        ON pp.product_id = p.id
      ORDER BY
        p.id,
        pp.id
    `);

    const products = new Map<number, Product>();

    for (const row of rows) {
      let product = products.get(row.id);

      if (!product) {
        product = {
          id: row.id,
          serialNumber: row.serial_number,
          isNew: Boolean(row.is_new),
          photo: row.photo,
          title: row.title,
          type: row.type,
          specification: row.specification,
          guarantee: {
            start: formatDate(row.guarantee_start),
            end: formatDate(row.guarantee_end),
          },
          price: [],
          order: row.order_id,
          date: formatDate(row.product_date),
        };

        products.set(row.id, product);
      }

      product.price.push({
        value: Number(row.price_value),
        symbol: row.price_currency,
        isDefault: Boolean(row.price_is_default),
      });
    }

    return Array.from(products.values());
  },
};
