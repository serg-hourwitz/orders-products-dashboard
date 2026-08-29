// @vitest-environment node

import { beforeEach, describe, expect, it } from 'vitest';

import { GET } from './route';

import { resetStore } from '@/data/store';
import { createAuthenticatedRequest } from '@/test/auth';

describe('/api/products', () => {
  beforeEach(() => {
    resetStore();
  });

  it('returns all products', async () => {
    const request = await createAuthenticatedRequest(
      'http://localhost/api/products',
    );

    const response = await GET(request);

    expect(response.status).toBe(200);

    const data = await response.json();

    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(4);
  });

  it('returns products with expected structure', async () => {
    const request = await createAuthenticatedRequest(
      'http://localhost/api/products',
    );

    const response = await GET(request);

    expect(response.status).toBe(200);

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

  it('returns 401 without authentication', async () => {
    const request = new Request('http://localhost/api/products');

    const response = await GET(request);

    expect(response.status).toBe(401);

    expect(await response.json()).toEqual({
      message: 'Unauthorized',
    });
  });
});
