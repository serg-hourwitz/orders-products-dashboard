// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createAuthenticatedRequest } from '@/test/auth';

vi.mock('@/repositories/ordersRepository', () => ({
  ordersRepository: {
    deleteById: vi.fn(),
  },
}));

import { ordersRepository } from '@/repositories/ordersRepository';

import { DELETE } from './route';

const createParams = (id: string) => ({
  params: Promise.resolve({
    id,
  }),
});

describe('/api/orders/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('DELETE', () => {
    it('returns 401 when the request is not authenticated', async () => {
      const request = new Request(
        'http://localhost/api/orders/1',
        {
          method: 'DELETE',
        },
      );

      const response = await DELETE(
        request,
        createParams('1'),
      );

      const body = await response.json();

      expect(response.status).toBe(401);
      expect(body).toEqual({
        message: 'Unauthorized',
      });

      expect(
        ordersRepository.deleteById,
      ).not.toHaveBeenCalled();
    });

    it('deletes an existing order', async () => {
      vi.mocked(
        ordersRepository.deleteById,
      ).mockResolvedValue(true);

      const request = await createAuthenticatedRequest(
        'http://localhost/api/orders/1',
        {
          method: 'DELETE',
        },
      );

      const response = await DELETE(
        request,
        createParams('1'),
      );

      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toEqual({
        id: 1,
        message: 'Order deleted successfully',
      });

      expect(
        ordersRepository.deleteById,
      ).toHaveBeenCalledTimes(1);

      expect(
        ordersRepository.deleteById,
      ).toHaveBeenCalledWith(1);
    });

    it('returns 404 when the order does not exist', async () => {
      vi.mocked(
        ordersRepository.deleteById,
      ).mockResolvedValue(false);

      const request = await createAuthenticatedRequest(
        'http://localhost/api/orders/999',
        {
          method: 'DELETE',
        },
      );

      const response = await DELETE(
        request,
        createParams('999'),
      );

      const body = await response.json();

      expect(response.status).toBe(404);
      expect(body).toEqual({
        message: 'Order not found',
      });

      expect(
        ordersRepository.deleteById,
      ).toHaveBeenCalledWith(999);
    });

    it('returns 400 when the order id is not a number', async () => {
      const request = await createAuthenticatedRequest(
        'http://localhost/api/orders/invalid',
        {
          method: 'DELETE',
        },
      );

      const response = await DELETE(
        request,
        createParams('invalid'),
      );

      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({
        message: 'Invalid order id',
      });

      expect(
        ordersRepository.deleteById,
      ).not.toHaveBeenCalled();
    });

    it('returns 400 when the order id is zero', async () => {
      const request = await createAuthenticatedRequest(
        'http://localhost/api/orders/0',
        {
          method: 'DELETE',
        },
      );

      const response = await DELETE(
        request,
        createParams('0'),
      );

      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({
        message: 'Invalid order id',
      });

      expect(
        ordersRepository.deleteById,
      ).not.toHaveBeenCalled();
    });

    it('returns 400 when the order id is negative', async () => {
      const request = await createAuthenticatedRequest(
        'http://localhost/api/orders/-1',
        {
          method: 'DELETE',
        },
      );

      const response = await DELETE(
        request,
        createParams('-1'),
      );

      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({
        message: 'Invalid order id',
      });

      expect(
        ordersRepository.deleteById,
      ).not.toHaveBeenCalled();
    });
  });
});
