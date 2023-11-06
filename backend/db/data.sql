CREATE DATABASE your_app_name_db;
\c your_app_name_db;

CREATE TABLE name_of_your_table (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(50),
  done BOOLEAN
);

INSERT INTO name_of_your_table (title, done)
  VALUES ('Get Milk', false), ('Walk Dog', false);