USE orders_products;

-- Keep the seed deterministic and safe to run repeatedly.
DELETE FROM product_prices;
DELETE FROM products;
DELETE FROM orders;

ALTER TABLE product_prices AUTO_INCREMENT = 1;
ALTER TABLE products AUTO_INCREMENT = 1;
ALTER TABLE orders AUTO_INCREMENT = 1;


INSERT INTO orders (
  id,
  title,
  description,
  order_date
)
VALUES
  (
    2,
    'Order 2',
    'desc',
    '2017-06-29 12:09:33'
  ),
  (
    4,
    'MySQL Order',
    'Created through REST API',
    '2026-08-29 15:00:00'
  ),
  (
    5,
    'New Order',
    'computer',
    '2026-08-30 12:41:00'
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
  2,
  1234,
  TRUE,
  '/images/products/monitor.jpg',
  'Product 2',
  'Monitors',
  'Specification 1',
  '2017-06-29 12:09:33',
  '2019-06-29 12:09:33',
  2,
  '2017-06-29 12:09:33'
),
  (
    4,
    9012,
    TRUE,
    '/images/products/mouse.jpg',
    'Gaming Mouse',
    'Mice',
    'Wireless gaming mouse',
    '2017-08-10 09:30:00',
    '2019-08-10 09:30:00',
    4,
    '2017-08-10 09:30:00'
  ),
  (
    5,
    900001,
    TRUE,
    '/images/products/laptop.jpg',
    'QA Product A',
    'Laptops',
    'QA test product A',
    '2026-08-01 00:00:00',
    '2027-08-01 00:00:00',
    2,
    '2026-08-30 00:00:00'
  ),
  (
    6,
    900002,
    FALSE,
    '/images/products/keyboard.jpg',
    'QA Product B',
    'Keyboards',
    'QA test product B',
    '2026-07-15 00:00:00',
    '2027-07-15 00:00:00',
    2,
    '2026-08-30 00:00:00'
  ),
  (
    7,
    900003,
    TRUE,
    '/images/products/headphones.jpg',
    'QA New Product A',
    'Headphones',
    'QA test product for New Order',
    '2026-08-01 00:00:00',
    '2027-08-01 00:00:00',
    5,
    '2026-08-30 00:00:00'
  ),
  (
    8,
    900004,
    FALSE,
    '/images/products/mouse.jpg',
    'QA New Product B',
    'Mice',
    'QA test product for New Order',
    '2026-07-15 00:00:00',
    '2027-07-15 00:00:00',
    5,
    '2026-08-30 00:00:00'
  );


INSERT INTO product_prices (
  product_id,
  value,
  currency,
  is_default
)
VALUES
  (2, 100.00, 'USD', FALSE),
  (2, 2600.00, 'UAH', TRUE),

  (4, 50.00, 'USD', FALSE),
  (4, 1300.00, 'UAH', TRUE),

  (5, 199.99, 'USD', TRUE),
  (5, 8199.00, 'UAH', FALSE),

  (6, 89.99, 'USD', TRUE),
  (6, 3699.00, 'UAH', FALSE),

  (7, 249.99, 'USD', TRUE),
  (7, 10249.00, 'UAH', FALSE),

  (8, 119.99, 'USD', TRUE),
  (8, 4919.00, 'UAH', FALSE);
