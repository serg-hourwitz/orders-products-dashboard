'use client';

import { AnimatePresence } from 'framer-motion';

import { useAppSelector } from '@/store/hooks';

import {
  selectOrders,
  selectSelectedOrder,
  selectSelectedOrderId,
} from '../../ordersSelectors';

import { OrderDetails } from '../OrderDetails/OrderDetails';
import { OrderItem } from '../OrderItem/OrderItem';

import './OrdersList.scss';

export const OrdersList = () => {
  const orders = useAppSelector(selectOrders);
  const selectedOrderId = useAppSelector(selectSelectedOrderId);
  const selectedOrder = useAppSelector(selectSelectedOrder);

  return (
    <div className="orders-view">
      <div
        className={`orders-list ${
          selectedOrderId !== null ? 'orders-list--compact' : ''
        }`}
      >
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedOrder && (
          <OrderDetails
            key={selectedOrder.id}
            order={selectedOrder}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
