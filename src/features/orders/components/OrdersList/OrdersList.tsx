'use client';

import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

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

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (selectedOrder) {
      const timeout = window.setTimeout(() => {
        setShowDetails(true);
      }, 80);

      return () => window.clearTimeout(timeout);
    }

    setShowDetails(false);
  }, [selectedOrder]);

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
        {selectedOrder && showDetails && (
          <div className="orders-details-wrapper">
            <OrderDetails
              key={selectedOrder.id}
              order={selectedOrder}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
