--user table
  CREATE TABLE users(
 id SERIAL PRIMARY KEY,
 user_id VARCHAR(30) UNIQUE NOT NULL,
 password VARCHAR (255) NOT NULL);

--TABLE OF STOCKS USER ADDS
CREATE TABLE stock_adds(
 id SERIAL PRIMARY KEY,
 user_id INT NOT NULL,
  symbol VARCHAR(20) NOT NULL,
  company_name VARCHAR(100) NOT NULL,
  add_price DECIMAL(10, 2),
 FOREIGN KEY (user_id) REFERENCES users(id));


  

  