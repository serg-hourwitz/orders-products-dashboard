USE orders_products;

INSERT INTO orders (
  id,
  title,
  description,
  order_date
)
VALUES
  (
    1,
    'Order 1',
    'desc',
    '2017-06-29 12:09:33'
  ),
  (
    2,
    'Order 2',
    'desc',
    '2017-06-29 12:09:33'
  ),
  (
    3,
    'Order 3',
    'desc',
    '2017-06-29 12:09:33'
  );


INSERT INTO products (
  id,
  serial_number,
  is_new,
  photo,
  title,
  type,
  specification,
  guarantee_start,
  guarantee_end,
  order_id,
  product_date
)
VALUES
  (
    1,
    1234,
    TRUE,
    '/images/products/monitor.jpg',
    'Product 1',
    'Monitors',
    'Specification 1',
    '2017-06-29 12:09:33',
    '2017-06-29 12:09:33',
    1,
    '2017-06-29 12:09:33'
  ),
  (
    2,
    1234,
    TRUE,
    '/images/products/monitor.jpg',
    'Product 2',
    'Monitors',
    'Specification 1',
    '2017-06-29 12:09:33',
    '2017-06-29 12:09:33',
    2,
    '2017-06-29 12:09:33'
  ),
  (
    3,
    5678,
    FALSE,
    '/images/products/monitor.jpg',
    'Keyboard Pro',
    'Keyboards',
    'Mechanical keyboard',
    '2017-07-01 10:00:00',
    '2019-07-01 10:00:00',
    1,
    '2017-07-01 10:00:00'
  ),
  (
    4,
    9012,
    TRUE,
    '/images/products/monitor.jpg',
    'Gaming Mouse',
    'Mice',
    'Wireless gaming mouse',
    '2017-08-10 09:30:00',
    '2019-08-10 09:30:00',
    2,
    '2017-08-10 09:30:00'
  );


INSERT INTO product_prices (
  product_id,
  value,
  currency,
  is_default
)
VALUES
  (1, 100.00, 'USD', FALSE),
  (1, 2600.00, 'UAH', TRUE),

  (2, 100.00, 'USD', FALSE),
  (2, 2600.00, 'UAH', TRUE),

  (3, 75.00, 'USD', FALSE),
  (3, 1950.00, 'UAH', TRUE),

  (4, 50.00, 'USD', FALSE),
  (4, 1300.00, 'UAH', TRUE);
