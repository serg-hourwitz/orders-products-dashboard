'use client';

import { OrdersList } from '@/features/orders/components/OrdersList/OrdersList';

import './OrdersPage.scss';

const OrdersPage = () => {
  return (
    <section className="orders-page">
      <div className="orders-page__header">
        <h1 className="orders-page__title">Orders</h1>
      </div>

      <OrdersList />
    </section>
  );
};

export default OrdersPage;
