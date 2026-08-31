'use client';

import { AnimatePresence, motion } from 'framer-motion';

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
          <motion.div
            key={selectedOrder.id}
            className="orders-details-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              delay: 0.08,
            }}
          >
            <OrderDetails order={selectedOrder} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
