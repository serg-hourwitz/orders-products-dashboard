CREATE DATABASE IF NOT EXISTS orders_products
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE orders_products;

CREATE TABLE IF NOT EXISTS orders (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(80) NOT NULL,
  description VARCHAR(300) NOT NULL,
  order_date DATETIME NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id)
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  serial_number INT UNSIGNED NOT NULL,
  is_new BOOLEAN NOT NULL DEFAULT FALSE,
  photo VARCHAR(255) NOT NULL,
  title VARCHAR(120) NOT NULL,
  type VARCHAR(80) NOT NULL,
  specification VARCHAR(255) NOT NULL,
  guarantee_start DATETIME NOT NULL,
  guarantee_end DATETIME NOT NULL,
  order_id INT UNSIGNED NOT NULL,
  product_date DATETIME NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),

  INDEX idx_products_order_id (order_id),
  INDEX idx_products_type (type),

  CONSTRAINT fk_products_order
    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS product_prices (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id INT UNSIGNED NOT NULL,
  value DECIMAL(12, 2) UNSIGNED NOT NULL,
  currency ENUM('USD', 'UAH') NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,

  PRIMARY KEY (id),

  INDEX idx_product_prices_product_id (product_id),

  CONSTRAINT fk_product_prices_product
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT uq_product_currency
    UNIQUE (product_id, currency)
) ENGINE=InnoDB;
