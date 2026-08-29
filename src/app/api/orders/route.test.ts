// @vitest-environment node

import { beforeEach, describe, expect, it } from 'vitest';

import { GET, POST } from './route';

import { resetStore } from '@/data/store';
import { createAuthenticatedRequest } from '@/test/auth';

describe('/api/orders', () => {
  beforeEach(() => {
    resetStore();
  });

  it('returns all orders', async () => {
    const request = await createAuthenticatedRequest(
      'http://localhost/api/orders',
    );

    const response = await GET(request);

    expect(response.status).toBe(200);

    const data = await response.json();

    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(3);

    expect(data[0]).toMatchObject({
      id: 1,
      title: 'Order 1',
    });
  });

  it('creates a new order', async () => {
    const request = await createAuthenticatedRequest(
      'http://localhost/api/orders',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Order 4',
          description: 'Test order',
          date: '2026-08-28 15:30:00',
        }),
      },
    );

    const response = await POST(request);

    expect(response.status).toBe(201);

    const data = await response.json();

    expect(data).toMatchObject({
      id: 4,
      title: 'Order 4',
      description: 'Test order',
      date: '2026-08-28 15:30:00',
    });
  });

  it('returns 400 for invalid order data', async () => {
    const request = await createAuthenticatedRequest(
      'http://localhost/api/orders',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: '',
          description: '',
          date: '',
        }),
      },
    );

    const response = await POST(request);

    expect(response.status).toBe(400);
  });

  it('adds created order to subsequent GET response', async () => {
    const createRequest = await createAuthenticatedRequest(
      'http://localhost/api/orders',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Order 4',
          description: 'Test order',
          date: '2026-08-28 15:30:00',
        }),
      },
    );

    const createResponse = await POST(createRequest);

    expect(createResponse.status).toBe(201);

    const getRequest = await createAuthenticatedRequest(
      'http://localhost/api/orders',
    );

    const response = await GET(getRequest);

    expect(response.status).toBe(200);

    const data = await response.json();

    expect(data).toHaveLength(4);

    expect(
      data.some((order: { title: string }) => order.title === 'Order 4'),
    ).toBe(true);
  });

  it('returns 401 without authentication', async () => {
    const request = new Request('http://localhost/api/orders');

    const response = await GET(request);

    expect(response.status).toBe(401);

    expect(await response.json()).toEqual({
      message: 'Unauthorized',
    });
  });
});
