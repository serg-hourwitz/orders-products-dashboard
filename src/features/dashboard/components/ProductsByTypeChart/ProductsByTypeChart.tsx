'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/store/hooks';

import { selectProductsByTypeChartData } from '../../selectors/dashboardSelectors';

import './ProductsByTypeChart.scss';

export const ProductsByTypeChart = () => {
  const { t } = useTranslation();

  const data = useAppSelector(selectProductsByTypeChartData);

  return (
    <section className="products-by-type-chart">
      <h2 className="products-by-type-chart__title">
        {t('charts.productsByType')}
      </h2>

      <div className="products-by-type-chart__content">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 8,
              right: 8,
              left: 0,
              bottom: 48,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="type"
              interval={0}
              angle={-35}
              textAnchor="end"
              height={72}
              tickMargin={10}
            />

            <YAxis allowDecimals={false} width={32} />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#7cb342"
              radius={[6, 6, 0, 0]}
              name={t('charts.products')}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
