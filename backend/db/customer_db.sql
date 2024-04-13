DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS contract CASCADE;
DROP TABLE IF EXISTS customer_address CASCADE;
DROP TABLE IF EXISTS customer_phone CASCADE;
DROP TABLE IF EXISTS customer_email CASCADE;

-- Create CUSTOMER table
CREATE TABLE customer (
    universal_id SERIAL PRIMARY KEY,
    cis_id VARCHAR(10),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    middle_name VARCHAR(50),
    org_name VARCHAR(50),
    gender VARCHAR(10),
    marital_status VARCHAR(10),
    dob DATE,
    is_org BOOLEAN,
    pref_address_type VARCHAR(20),
    pref_phone_type VARCHAR(20),
    pref_email_type VARCHAR(20),
    pref_language VARCHAR(20),
    is_active BOOLEAN DEFAULT true
);

-- Create CONTRACT table
CREATE TABLE contract (
    contract_num SERIAL PRIMARY KEY,
    line_of_business_code VARCHAR (5),
    company_code VARCHAR(5),
    product_code VARCHAR(5),
    effective_date DATE,
    issue_date DATE,
    termination_date DATE,
    universal_id INT,
    is_active BOOLEAN DEFAULT true
);

-- Create Address, Phone, Email and Preference Tables
CREATE TABLE customer_address (
    id SERIAL PRIMARY KEY,
    universal_id INT,
    type VARCHAR(20),
    addr_line_1 VARCHAR(30),
    addr_line_2 VARCHAR(30),
    city VARCHAR(30),
    state VARCHAR(30),
    zip INT,
    privacy_code INT
);

CREATE TABLE customer_phone (
    id SERIAL PRIMARY KEY,
    universal_id INT,
    type VARCHAR(20),
    phone_num BIGINT,
    phone_ext INT,
    privacy_code INT
);

CREATE TABLE customer_email (
    id SERIAL PRIMARY KEY,
    universal_id INT,
    type VARCHAR(20),
    email VARCHAR(30),
    privacy_code INT
);

-- Load Sample Data
INSERT INTO customer(cis_id, first_name, last_name, middle_name, org_name, gender, marital_status, dob, is_org, pref_address_type, pref_phone_type, pref_email_type, pref_language)
VALUES ( 'CIS_123', 'John', 'Doe', '', '', 'Male', 'Married', '1970-01-01', false, 'HOME', 'BUSINESS', 'BUSINESS', 'ENGLISH'),
( 'CIS_124', 'Jane', 'Doe', '', '', 'Female', 'Married', '1970-02-01', false, 'HOME', 'HOME', 'HOME', 'SPANISH'),
( 'CIS_201', '', '', '', 'Umbrella Corporation', 'Other', 'Unknown', '1960-03-01', true, 'BUSINESS', 'BUSINESS', 'BUSINESS', 'ENGLISH' );


INSERT INTO contract(line_of_business_code, company_code, product_code, effective_date, issue_date, termination_date, universal_id)
VALUES ('GI', 'PRU', 'GI001', '1990-01-02', '1990-01-01', NULL, 1),
    ('ANN', 'PRU', 'AN201', '1990-01-02', '1990-01-01', NULL, 1),
    ('GI', 'PRU', 'GI001', '1990-02-02', '1990-02-01', NULL, 2),
    ('GI', 'UMB', 'GI101', '1960-03-01', '1960-03-01', NULL, 3),
    ('GI', 'UMB', 'GI102', '1960-03-01', '1960-03-01', NULL, 3);


INSERT INTO customer_address (universal_id, type, addr_line_1, addr_line_2, city, state, zip, privacy_code) 
VALUES (1, 'HOME', '57058 Homewood Way', 'Apt 1277', 'Brockton', 'Massachusetts', '02405', 1),
    (1, 'BUSINESS', '43662 Corscot Park', 'Apt 160', 'Birmingham', 'Alabama', '35254', 3),
    (2, 'HOME', '0 Village Green Parkway', '8th Floor', 'Baton Rouge', 'Louisiana', '70836', 2),
    (2, 'BUSINESS', '275 Johnson Place', '12th Floor', 'Albuquerque', 'New Mexico', '87190', 3),
    (3, 'BUSINESS', '29 Granby Road', 'Suite 52', 'Little Rock', 'Arkansas', '72231', 1);

INSERT INTO customer_phone (universal_id, type, phone_num, phone_ext, privacy_code) 
VALUES (1, 'HOME', 5754121760, NULL, 1),
    (1, 'BUSINESS', 6336927470, 410, 3),
    (2, 'HOME', 5735678522, NULL, 2),
    (2, 'BUSINESS', 6623261796, 21,  3),
    (3, 'BUSINESS', 7731019900, NULL, 1);

INSERT INTO customer_email (universal_id, type, email, privacy_code) 
VALUES (1, 'HOME', 'john.doe@email.com', 1),
    (1, 'BUSINESS', 'john.doe@pru.com', 3),
    (2, 'HOME', 'jane.doe@email.com', 2),
    (2, 'BUSINESS', 'jane.doe@pru.com',  3),
    (3, 'BUSINESS', 'contact@umbrellacorp.com', 1);

-- Add Customer's Universal ID as Foreign Key to Contract Table
ALTER TABLE contract 
ADD CONSTRAINT customer_contract_universal_id_fk 
FOREIGN KEY (universal_id) REFERENCES customer(universal_id) 
ON DELETE CASCADE;

-- Add Customer's Universal ID as Foreign Key to Customer_Address Table
ALTER TABLE customer_address 
ADD CONSTRAINT customer_address_universal_id_fk 
FOREIGN KEY (universal_id) REFERENCES customer(universal_id) 
ON DELETE CASCADE;

-- Add Customer's Universal ID as Foreign Key to Customer_Address Table
ALTER TABLE customer_phone 
ADD CONSTRAINT customer_phone_universal_id_fk 
FOREIGN KEY (universal_id) REFERENCES customer(universal_id) 
ON DELETE CASCADE;

-- Add Customer's Universal ID as Foreign Key to Customer_Email Table
ALTER TABLE customer_email
ADD CONSTRAINT customer_email_universal_id_fk 
FOREIGN KEY (universal_id) REFERENCES customer(universal_id) 
ON DELETE CASCADE;
