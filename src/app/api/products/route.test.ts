import { beforeEach, describe, expect, it } from 'vitest';

import { GET } from './route';
import { resetStore } from '@/data/store';

describe('/api/products', () => {
  beforeEach(() => {
    resetStore();
  });

  it('returns all products', async () => {
    const response = await GET();

    expect(response.status).toBe(200);

    const data = await response.json();

    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(4);
  });

  it('returns products with expected structure', async () => {
    const response = await GET();

    const data = await response.json();

    expect(data[0]).toMatchObject({
      id: 1,
      title: 'Product 1',
      type: 'Monitors',
      order: 1,
    });

    expect(data[0]).toHaveProperty('price');
    expect(data[0]).toHaveProperty('guarantee');
  });
});
