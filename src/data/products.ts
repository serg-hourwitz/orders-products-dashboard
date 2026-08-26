import type { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: true,
    photo: '/images/products/monitor.jpg',
    title: 'Product 1',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33',
    },
    price: [
      {
        value: 100,
        symbol: 'USD',
        isDefault: false,
      },
      {
        value: 2600,
        symbol: 'UAH',
        isDefault: true,
      },
    ],
    order: 1,
    date: '2017-06-29 12:09:33',
  },
  {
    id: 2,
    serialNumber: 1234,
    isNew: true,
    photo: '/images/products/monitor.jpg',
    title: 'Product 2',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33',
    },
    price: [
      {
        value: 100,
        symbol: 'USD',
        isDefault: false,
      },
      {
        value: 2600,
        symbol: 'UAH',
        isDefault: true,
      },
    ],
    order: 2,
    date: '2017-06-29 12:09:33',
  },
];
