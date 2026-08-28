import { describe, expect, it } from 'vitest';

import {
  selectOrderProducts,
  selectOrderTotalByCurrency,
} from './ordersSelectors';

import type { RootState } from '@/store';

const state = {
  orders: {
    items: [
      {
        id: 1,
        title: 'Order 1',
        date: '2017-06-29 12:09:33',
        description: 'Test',
      },
    ],
    selectedOrderId: null,
    orderIdPendingDelete: null,
    loading: false,
    creating: false,
    deleting: false,
    error: null,
  },

  products: {
    items: [
      {
        id: 1,
        serialNumber: 1,
        isNew: true,
        photo: '',
        title: 'Product 1',
        type: 'Monitors',
        specification: '',
        guarantee: {
          start: '',
          end: '',
        },
        price: [
          {
            value: 100,
            symbol: 'USD',
            isDefault: false,
          },
          {
            value: 2600,
            symbol: 'UAH',
            isDefault: true,
          },
        ],
        order: 1,
        date: '',
      },
      {
        id: 2,
        serialNumber: 2,
        isNew: true,
        photo: '',
        title: 'Product 2',
        type: 'Mice',
        specification: '',
        guarantee: {
          start: '',
          end: '',
        },
        price: [
          {
            value: 50,
            symbol: 'USD',
            isDefault: false,
          },
          {
            value: 1300,
            symbol: 'UAH',
            isDefault: true,
          },
        ],
        order: 1,
        date: '',
      },
    ],
    selectedType: 'all',
    loading: false,
    error: null,
  },
} as RootState;

describe('orders selectors', () => {
  it('returns products belonging to an order', () => {
    const result = selectOrderProducts(1)(state);

    expect(result).toHaveLength(2);
  });

  it('calculates order total in USD', () => {
    const result = selectOrderTotalByCurrency(
      1,
      'USD',
    )(state);

    expect(result).toBe(150);
  });

  it('calculates order total in UAH', () => {
    const result = selectOrderTotalByCurrency(
      1,
      'UAH',
    )(state);

    expect(result).toBe(3900);
  });
});
