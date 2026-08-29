import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createElement } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProductTypeFilter } from './ProductTypeFilter';
import { setSelectedType } from '../../productsSlice';

import type { RootState } from '@/store';

const dispatchMock = vi.fn();

const mockState = {
  products: {
    items: [
      {
        id: 1,
        serialNumber: 1234,
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
        serialNumber: 5678,
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

  auth: {
    user: null,
    loading: false,
    initialized: true,
    error: null,
  },
} as RootState;

vi.mock('@/store/hooks', () => ({
  useAppDispatch: () => dispatchMock,

  useAppSelector: (selector: (state: RootState) => unknown) =>
    selector(mockState),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'products.type': 'Type',
        'products.all': 'All',
      };

      return translations[key] ?? key;
    },
  }),
}));

describe('ProductTypeFilter', () => {
  beforeEach(() => {
    dispatchMock.mockClear();
  });

  it('renders available product types', () => {
    render(createElement(ProductTypeFilter));

    expect(
      screen.getByRole('option', {
        name: 'All',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('option', {
        name: 'Monitors',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('option', {
        name: 'Mice',
      }),
    ).toBeInTheDocument();
  });

  it('selects all products by default', () => {
    render(createElement(ProductTypeFilter));

    expect(screen.getByRole('combobox')).toHaveValue('all');
  });

  it('dispatches selected product type', async () => {
    const user = userEvent.setup();

    render(createElement(ProductTypeFilter));

    await user.selectOptions(screen.getByRole('combobox'), 'Monitors');

    expect(dispatchMock).toHaveBeenCalledWith(setSelectedType('Monitors'));
  });
});
