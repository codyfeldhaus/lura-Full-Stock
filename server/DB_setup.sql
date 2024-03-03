--user table
  CREATE TABLE users(
 id SERIAL PRIMARY KEY,
 username VARCHAR(30) UNIQUE NOT NULL,
 password VARCHAR (255) NOT NULL);

--TABLE OF STOCKS USER ADDS
CREATE TABLE stock_adds(
 id SERIAL PRIMARY KEY,
 user_id INT NOT NULL,
  symbol VARCHAR(20) NOT NULL,
  company_name VARCHAR(100) NOT NULL,
  add_price DECIMAL(10, 2),
 FOREIGN KEY (user_id) REFERENCES users(id));

ALTER TABLE users
RENAME COLUMN user_id TO username;
  
INSERT INTO stock_adds (user_id, symbol, company_name, add_price)
VALUES
(1, 'AAPL', 'Apple', 108),
(1, 'TSLA', 'Tesla', 200),
(1, 'MSFT', 'Microsoft', 150),
(4, 'TSLA', 'Tesla', 200),
(5, 'MSFT', 'Microsoft', 150);

 ALTER TABLE stock_adds
ADD COLUMN close DECIMAL(10, 1),
ADD COLUMN high DECIMAL(10, 1),
ADD COLUMN low DECIMAL(10, 1); 