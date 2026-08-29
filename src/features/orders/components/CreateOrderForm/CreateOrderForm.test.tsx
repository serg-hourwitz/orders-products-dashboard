import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';

import { CreateOrderForm } from './CreateOrderForm';
import { addOrder } from '../../ordersSlice';

import type { RootState } from '@/store';

const unwrapMock = vi.fn();
const dispatchMock = vi.fn();

const mockState = {
  orders: {
    items: [],
    selectedOrderId: null,
    orderIdPendingDelete: null,
    loading: false,
    creating: false,
    deleting: false,
    error: null,
  },

  products: {
    items: [],
    selectedType: 'all',
    loading: false,
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

vi.mock('../../ordersSlice', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../ordersSlice')>();

  return {
    ...actual,

    addOrder: vi.fn((payload) => ({
      type: 'orders/addOrder/mock',
      payload,
    })),
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'orders.createModal.titleField': 'Title',
        'orders.createModal.description': 'Description',
        'orders.createModal.date': 'Date',
        'orders.createModal.create': 'Create order',
        'orders.createModal.creating': 'Creating...',

        'orders.validation.titleMin':
          'Title must contain at least 2 characters',

        'orders.validation.titleMax':
          'Title must contain no more than 80 characters',

        'orders.validation.descriptionMin':
          'Description must contain at least 2 characters',

        'orders.validation.descriptionMax':
          'Description must contain no more than 300 characters',

        'orders.validation.dateRequired': 'Date is required',
      };

      return translations[key] ?? key;
    },
  }),
}));

describe('CreateOrderForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    unwrapMock.mockResolvedValue({
      id: 4,
      title: 'New order',
    });

    dispatchMock.mockReturnValue({
      unwrap: unwrapMock,
    });
  });

  it('renders all form fields', () => {
    render(createElement(CreateOrderForm));

    expect(screen.getByLabelText('Title')).toBeInTheDocument();

    expect(screen.getByLabelText('Description')).toBeInTheDocument();

    expect(screen.getByLabelText('Date')).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Create order',
      }),
    ).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();

    render(createElement(CreateOrderForm));

    await user.click(
      screen.getByRole('button', {
        name: 'Create order',
      }),
    );

    expect(
      await screen.findByText('Title must contain at least 2 characters'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Description must contain at least 2 characters'),
    ).toBeInTheDocument();

    expect(screen.getByText('Date is required')).toBeInTheDocument();

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('shows errors for too short title and description', async () => {
    const user = userEvent.setup();

    render(createElement(CreateOrderForm));

    await user.type(screen.getByLabelText('Title'), 'A');

    await user.type(screen.getByLabelText('Description'), 'B');

    await user.click(
      screen.getByRole('button', {
        name: 'Create order',
      }),
    );

    expect(
      await screen.findByText('Title must contain at least 2 characters'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Description must contain at least 2 characters'),
    ).toBeInTheDocument();

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('dispatches addOrder with valid form data', async () => {
    const user = userEvent.setup();

    render(createElement(CreateOrderForm));

    await user.type(screen.getByLabelText('Title'), 'Order 4');

    await user.type(screen.getByLabelText('Description'), 'New test order');

    await user.type(screen.getByLabelText('Date'), '2026-08-28T15:30');

    await user.click(
      screen.getByRole('button', {
        name: 'Create order',
      }),
    );

    expect(addOrder).toHaveBeenCalledWith({
      title: 'Order 4',
      description: 'New test order',
      date: '2026-08-28 15:30:00',
    });

    expect(dispatchMock).toHaveBeenCalledTimes(1);

    expect(unwrapMock).toHaveBeenCalledTimes(1);
  });

  it('calls onSuccess after successful creation', async () => {
    const user = userEvent.setup();

    const onSuccess = vi.fn();

    render(
      createElement(CreateOrderForm, {
        onSuccess,
      }),
    );

    await user.type(screen.getByLabelText('Title'), 'Order 4');

    await user.type(screen.getByLabelText('Description'), 'New test order');

    await user.type(screen.getByLabelText('Date'), '2026-08-28T15:30');

    await user.click(
      screen.getByRole('button', {
        name: 'Create order',
      }),
    );

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});
