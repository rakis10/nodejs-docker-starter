CREATE TABLE product (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  category TEXT,
  price REAL NOT NULL
);

INSERT INTO product (name, status, category, price) VALUES
  ('T-Shirt', 'active', 'Clothing', 19.99),
  ('Water Bottle', 'active', 'Hydration', 12.99),
  ('Laptop', 'active', 'Electronics', 799.99);


create TABLE category (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);
INSERT INTO category (name) VALUES
  ('Clothing'),
  ('Hydration'),
  ('Electronics');
-- ```
