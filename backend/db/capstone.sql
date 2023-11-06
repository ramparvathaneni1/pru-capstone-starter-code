BEGIN
CREATE DATABASE capstone_db;
END
GO 
USE capstone_db
GO
BEGIN
CREATE TABLE capstone (
  ID SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50)
);
END
GO 
BEGIN

INSERT INTO capstone (first_name, last_name) VALUES ('Marc', 'Wright'), ('Ben', 'Piper'), ('Troy', 'Swayzee');


END