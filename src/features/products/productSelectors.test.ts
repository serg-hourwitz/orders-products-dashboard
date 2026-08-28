import { describe, expect, it } from 'vitest';

import {
  selectFilteredProducts,
  selectProductTypes,
} from './productsSelectors';

import type { RootState } from '@/store';

const state = {
  products: {
    items: [
      {
        id: 1,
        serialNumber: 1,
        isNew: true,
        photo: '',
        title: 'Monitor',
        type: 'Monitors',
        specification: '',
        guarantee: {
          start: '',
          end: '',
        },
        price: [],
        order: 1,
        date: '',
      },
      {
        id: 2,
        serialNumber: 2,
        isNew: true,
        photo: '',
        title: 'Mouse',
        type: 'Mice',
        specification: '',
        guarantee: {
          start: '',
          end: '',
        },
        price: [],
        order: 1,
        date: '',
      },
      {
        id: 3,
        serialNumber: 3,
        isNew: true,
        photo: '',
        title: 'Monitor 2',
        type: 'Monitors',
        specification: '',
        guarantee: {
          start: '',
          end: '',
        },
        price: [],
        order: 2,
        date: '',
      },
    ],
    selectedType: 'all',
    loading: false,
    error: null,
  },

  orders: {
    items: [],
    selectedOrderId: null,
    orderIdPendingDelete: null,
    loading: false,
    creating: false,
    deleting: false,
    error: null,
  },
} as RootState;

describe('products selectors', () => {
  it('returns unique product types', () => {
    expect(selectProductTypes(state)).toEqual([
      'Monitors',
      'Mice',
    ]);
  });

  it('returns all products when selected type is all', () => {
    expect(selectFilteredProducts(state)).toHaveLength(3);
  });

  it('filters products by selected type', () => {
    const filteredState = {
      ...state,
      products: {
        ...state.products,
        selectedType: 'Monitors',
      },
    } as RootState;

    const result = selectFilteredProducts(filteredState);

    expect(result).toHaveLength(2);
    expect(
      result.every(
        (product) => product.type === 'Monitors',
      ),
    ).toBe(true);
  });
});
