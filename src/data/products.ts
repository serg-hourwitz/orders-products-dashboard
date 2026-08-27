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

  {
    id: 3,
    serialNumber: 5678,
    isNew: false,
    photo: '/images/products/monitor.jpg',
    title: 'Keyboard Pro',
    type: 'Keyboards',
    specification: 'Mechanical keyboard',
    guarantee: {
      start: '2017-07-01 10:00:00',
      end: '2019-07-01 10:00:00',
    },
    price: [
      {
        value: 75,
        symbol: 'USD',
        isDefault: false,
      },
      {
        value: 1950,
        symbol: 'UAH',
        isDefault: true,
      },
    ],
    order: 1,
    date: '2017-07-01 10:00:00',
  },
  {
    id: 4,
    serialNumber: 9012,
    isNew: true,
    photo: '/images/products/monitor.jpg',
    title: 'Gaming Mouse',
    type: 'Mice',
    specification: 'Wireless gaming mouse',
    guarantee: {
      start: '2017-08-10 09:30:00',
      end: '2019-08-10 09:30:00',
    },
    price: [
      {
        value: 50,
        symbol: 'USD',
        isDefault: false,
      },
      {
        value: 1300,
        symbol: 'UAH',
        isDefault: true,
      },
    ],
    order: 2,
    date: '2017-08-10 09:30:00',
  },
];

