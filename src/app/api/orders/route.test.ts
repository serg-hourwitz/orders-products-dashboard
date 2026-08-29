// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createAuthenticatedRequest } from '@/test/auth';

vi.mock('@/repositories/ordersRepository', () => ({
  ordersRepository: {
    findAll: vi.fn(),
    create: vi.fn(),
  },
}));

import { ordersRepository } from '@/repositories/ordersRepository';

import { GET, POST } from './route';

describe('/api/orders', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET', () => {
    it('returns 401 when the request is not authenticated', async () => {
      const request = new Request('http://localhost/api/orders');

      const response = await GET(request);
      const body = await response.json();

      expect(response.status).toBe(401);
      expect(body).toEqual({
        message: 'Unauthorized',
      });

      expect(ordersRepository.findAll).not.toHaveBeenCalled();
    });

    it('returns all orders for an authenticated user', async () => {
      const orders = [
        {
          id: 1,
          title: 'Order 1',
          description: 'desc',
          date: '2017-06-29 12:09:33',
        },
        {
          id: 2,
          title: 'Order 2',
          description: 'desc',
          date: '2017-06-29 12:09:33',
        },
      ];

      vi.mocked(ordersRepository.findAll).mockResolvedValue(orders);

      const request = await createAuthenticatedRequest(
        'http://localhost/api/orders',
      );

      const response = await GET(request);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toEqual(orders);

      expect(ordersRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST', () => {
    it('returns 401 when the request is not authenticated', async () => {
      const request = new Request('http://localhost/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'New Order',
          description: 'New description',
          date: '2026-08-29 15:00:00',
        }),
      });

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(401);
      expect(body).toEqual({
        message: 'Unauthorized',
      });

      expect(ordersRepository.create).not.toHaveBeenCalled();
    });

    it('creates an order for valid input', async () => {
      const createdOrder = {
        id: 4,
        title: 'New Order',
        description: 'New description',
        date: '2026-08-29 15:00:00',
      };

      vi.mocked(ordersRepository.create).mockResolvedValue(createdOrder);

      const request = await createAuthenticatedRequest(
        'http://localhost/api/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: '  New Order  ',
            description: '  New description  ',
            date: '2026-08-29 15:00:00',
          }),
        },
      );

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(201);
      expect(body).toEqual(createdOrder);

      expect(ordersRepository.create).toHaveBeenCalledTimes(1);
      expect(ordersRepository.create).toHaveBeenCalledWith({
        title: 'New Order',
        description: 'New description',
        date: '2026-08-29 15:00:00',
      });
    });

    it('returns 400 when title is too short', async () => {
      const request = await createAuthenticatedRequest(
        'http://localhost/api/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: 'A',
            description: 'Valid description',
            date: '2026-08-29 15:00:00',
          }),
        },
      );

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({
        message: 'Title must contain at least 2 characters',
      });

      expect(ordersRepository.create).not.toHaveBeenCalled();
    });

    it('returns 400 when description is too short', async () => {
      const request = await createAuthenticatedRequest(
        'http://localhost/api/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: 'Valid Order',
            description: 'A',
            date: '2026-08-29 15:00:00',
          }),
        },
      );

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({
        message: 'Description must contain at least 2 characters',
      });

      expect(ordersRepository.create).not.toHaveBeenCalled();
    });

    it('returns 400 when date is invalid', async () => {
      const request = await createAuthenticatedRequest(
        'http://localhost/api/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: 'Valid Order',
            description: 'Valid description',
            date: 'not-a-date',
          }),
        },
      );

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({
        message: 'Invalid order date',
      });

      expect(ordersRepository.create).not.toHaveBeenCalled();
    });
  });
});
