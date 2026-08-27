'use client';

import type { MouseEvent } from 'react';

import type { Order } from '@/types/order';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatLongDate, formatShortDate } from '@/utils/formatDate';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { openDeleteOrderModal, selectOrder } from '../../ordersSlice';

import {
  selectOrderProductsCount,
  selectOrderTotalByCurrency,
  selectSelectedOrderId,
} from '../../ordersSelectors';

import './OrderItem.scss';

interface OrderItemProps {
  order: Order;
}

export const OrderItem = ({ order }: OrderItemProps) => {
  const dispatch = useAppDispatch();

  const selectedOrderId = useAppSelector(selectSelectedOrderId);

  const productsCount = useAppSelector(
    selectOrderProductsCount(order.id),
  );

  const totalUsd = useAppSelector(
    selectOrderTotalByCurrency(order.id, 'USD'),
  );

  const totalUah = useAppSelector(
    selectOrderTotalByCurrency(order.id, 'UAH'),
  );

  const isSelected = selectedOrderId === order.id;

  const handleSelectOrder = () => {
    dispatch(selectOrder(order.id));
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    dispatch(openDeleteOrderModal(order.id));
  };

  return (
    <article
      className={`order-item ${
        isSelected ? 'order-item--selected' : ''
      }`}
      onClick={handleSelectOrder}
    >
      <div className="order-item__main">
        <h2 className="order-item__title">{order.title}</h2>

        <div className="order-item__products">
          <strong>{productsCount}</strong>
          <span>Products</span>
        </div>

        <div className="order-item__dates">
          <span>{formatShortDate(order.date)}</span>
          <span>{formatLongDate(order.date)}</span>
        </div>

        <div className="order-item__price">
          <span>{formatCurrency(totalUsd, 'USD')}</span>
          <strong>{formatCurrency(totalUah, 'UAH')}</strong>
        </div>

        <button
          type="button"
          className="order-item__delete btn btn-outline-danger"
          aria-label={`Delete ${order.title}`}
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </article>
  );
};
