import { beforeEach, describe, expect, it } from 'vitest';

import { DELETE } from './route';
import { getOrdersStore, getProductsStore, resetStore } from '@/data/store';

describe('DELETE /api/orders/[id]', () => {
  beforeEach(() => {
    resetStore();
  });

  it('deletes an existing order', async () => {
    const response = await DELETE(
      new Request('http://localhost/api/orders/1', {
        method: 'DELETE',
      }),
      {
        params: Promise.resolve({
          id: '1',
        }),
      },
    );

    expect(response.status).toBe(200);

    const data = await response.json();

    expect(data).toEqual({
      id: 1,
      message: 'Order deleted successfully',
    });

    expect(getOrdersStore().some((order) => order.id === 1)).toBe(false);
  });

  it('also removes products belonging to deleted order', async () => {
    await DELETE(
      new Request('http://localhost/api/orders/1', {
        method: 'DELETE',
      }),
      {
        params: Promise.resolve({
          id: '1',
        }),
      },
    );

    expect(getProductsStore().some((product) => product.order === 1)).toBe(
      false,
    );
  });

  it('returns 404 when order does not exist', async () => {
    const response = await DELETE(
      new Request('http://localhost/api/orders/999', {
        method: 'DELETE',
      }),
      {
        params: Promise.resolve({
          id: '999',
        }),
      },
    );

    expect(response.status).toBe(404);

    const data = await response.json();

    expect(data).toEqual({
      message: 'Order not found',
    });
  });

  it('returns 400 for invalid order id', async () => {
    const response = await DELETE(
      new Request('http://localhost/api/orders/test', {
        method: 'DELETE',
      }),
      {
        params: Promise.resolve({
          id: 'test',
        }),
      },
    );

    expect(response.status).toBe(400);

    const data = await response.json();

    expect(data).toEqual({
      message: 'Invalid order id',
    });
  });
});
