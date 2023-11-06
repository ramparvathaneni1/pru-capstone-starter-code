CREATE DATABASE capstone_db;
\c capstone_db;

CREATE TABLE capstone_table (
  ID SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50)
);

INSERT INTO capstone_table (first_name, last_name)
  VALUES ('Marc', 'Wright'), ('Ben', 'Piper'), ('Troy', 'Swayzee');