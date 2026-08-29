// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createAuthenticatedRequest } from '@/test/auth';

vi.mock('@/repositories/productsRepository', () => ({
  productsRepository: {
    findAll: vi.fn(),
  },
}));

import { productsRepository } from '@/repositories/productsRepository';

import { GET } from './route';

describe('/api/products', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET', () => {
    it('returns 401 when the request is not authenticated', async () => {
      const request = new Request('http://localhost/api/products');

      const response = await GET(request);
      const body = await response.json();

      expect(response.status).toBe(401);
      expect(body).toEqual({
        message: 'Unauthorized',
      });

      expect(productsRepository.findAll).not.toHaveBeenCalled();
    });

    it('returns all products for an authenticated user', async () => {
      const products = [
        {
          id: 1,
          serialNumber: 1234,
          isNew: true,
          photo: '/images/products/monitor.jpg',
          title: 'Product 1',
          type: 'Monitors',
          specification: 'Specification 1',
          guarantee: {
            start: '2017-06-29 12:09:33',
            end: '2017-06-29 12:09:33',
          },
          price: [
            {
              value: 100,
              symbol: 'USD' as const,
              isDefault: false,
            },
            {
              value: 2600,
              symbol: 'UAH' as const,
              isDefault: true,
            },
          ],
          order: 1,
          date: '2017-06-29 12:09:33',
        },
        {
          id: 3,
          serialNumber: 5678,
          isNew: false,
          photo: '/images/products/monitor.jpg',
          title: 'Keyboard Pro',
          type: 'Keyboards',
          specification: 'Mechanical keyboard',
          guarantee: {
            start: '2017-07-01 10:00:00',
            end: '2019-07-01 10:00:00',
          },
          price: [
            {
              value: 75,
              symbol: 'USD' as const,
              isDefault: false,
            },
            {
              value: 1950,
              symbol: 'UAH' as const,
              isDefault: true,
            },
          ],
          order: 1,
          date: '2017-07-01 10:00:00',
        },
      ];

      vi.mocked(productsRepository.findAll).mockResolvedValue(products);

      const request = await createAuthenticatedRequest(
        'http://localhost/api/products',
      );

      const response = await GET(request);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toEqual(products);

      expect(productsRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
