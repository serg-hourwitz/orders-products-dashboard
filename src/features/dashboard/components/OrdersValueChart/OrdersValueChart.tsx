'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/store/hooks';

import { selectOrdersValueChartData } from '../../selectors/dashboardSelectors';

import './OrdersValueChart.scss';

export const OrdersValueChart = () => {
  const { t } = useTranslation();

  const data = useAppSelector(selectOrdersValueChartData);

  return (
    <section className="orders-value-chart">
      <h2 className="orders-value-chart__title">{t('charts.ordersValue')}</h2>

      <div className="orders-value-chart__content">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="order" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="usd" name="USD" fill="#0d6efd" />

            <Bar dataKey="uah" name="UAH" fill="#ffc107" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
