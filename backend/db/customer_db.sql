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
    state VARCHAR(2),
    zip VARCHAR(5),
    privacy_code INT
);

CREATE TABLE customer_phone (
    id SERIAL PRIMARY KEY,
    universal_id INT,
    type VARCHAR(20),
    phone_num VARCHAR(10),
    phone_ext VARCHAR(5),
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
VALUES ( 'CIS_101', 'John', 'Doe', '', '', 'Male', 'Married', '1980-01-01', false, 'HOME', 'WORK', 'WORK', 'ENGLISH'),
( 'CIS_102', 'Jane', 'Doe', '', '', 'Female', 'Married', '1981-02-01', false, 'HOME', 'HOME', 'HOME', 'ENGLISH'),
( 'CIS_103', 'Beth', 'Boothe', '', '', 'Female', 'Married', '1982-04-20', false, 'HOME', 'WORK', 'HOME', 'SPANISH' ),
( 'CIS_201', '', '', '', 'Umbrella Corporation', 'Other', 'Unknown', '1960-03-01', true, 'WORK', 'WORK', 'WORK', 'ENGLISH' ),
( 'CIS_202', '', '', '', 'Flashpoint Inc', 'Other', 'Unknown', '2000-05-01', true, 'WORK', 'WORK', 'WORK', 'ENGLISH' ),
( 'CIS_203', '', '', '', 'Rhynoodle Corporation', 'Other', 'Unknown', '2001-06-01', true, 'WORK', 'WORK', 'WORK', 'ENGLISH' );


INSERT INTO contract(line_of_business_code, company_code, product_code, effective_date, issue_date, termination_date, universal_id)
VALUES ('GI', 'PRU', 'GI101', '2010-01-01', '2010-01-01', NULL, 1),
    ('ANN', 'PRU', 'AN201', '2010-01-01', '2010-01-01', NULL, 1),
    ('GI', 'PRU', 'GI101', '2010-01-01', '2010-01-01', NULL, 2),
    ('ANN', 'PRU', 'GI001', '2010-01-01', '2010-01-01', NULL, 2),
    ('GI', 'PRU', 'GI101', '2010-01-01', '2010-01-01', NULL, 3),
    ('ANN', 'PRU', 'GI102', '2010-01-01', '2010-01-01', NULL, 3),
    ('GI', 'UMB', 'GI101', '2010-01-01', '2010-01-01', NULL, 4),
    ('GI', 'UMB', 'GI102', '2010-01-01', '2010-01-01', NULL, 4),
    ('GI', 'FLA', 'GI201', '2010-01-01', '2010-01-01', NULL, 5),
    ('GI', 'FLA', 'GI202', '2010-01-01', '2010-01-01', NULL, 5),
    ('GI', 'RHY', 'GI301', '2010-01-01', '2010-01-01', NULL, 6),
    ('GI', 'RHY', 'GI302', '2010-01-01', '2010-01-01', NULL, 6);


INSERT INTO customer_address (universal_id, type, addr_line_1, addr_line_2, city, state, zip, privacy_code) 
VALUES (1, 'HOME', '57058 Homewood Way', 'Apt 1277', 'Brockton', 'MA', '02405', 1),
    (1, 'WORK', '43662 Corscot Park', 'Apt 160', 'Birmingham', 'AL', '35254', 3),
    (2, 'HOME', '0 Village Green Parkway', '8th Floor', 'Baton Rouge', 'LA', '70836', 1),
    (2, 'WORK', '275 Johnson Place', '12th Floor', 'Albuquerque', 'NM', '87190', 3),
    (3, 'HOME', '29 Granby Road', 'Suite 52', 'Little Rock', 'AR', '72231', 1),
    (3, 'WORK', '8280 Shelley Park', '', 'Amargosa', 'AL', '65873', 3),
    (4, 'WORK', '5 Calypso Court', '', 'Fukuyama', 'NM', '98347', 1),
    (5, 'WORK', '6 Delaware Circle', '', 'Nekrasovka', 'NY', '85976', 1),
    (6, 'WORK', '4283 Bluejay Place', '', 'Bohou', 'HI', '15964', 1);

INSERT INTO customer_phone (universal_id, type, phone_num, phone_ext, privacy_code) 
VALUES (1, 'HOME', 5754121760, NULL, 1),
    (1, 'WORK', '6336927470', '410', 3),
    (2, 'HOME', '5735678522', NULL, 1),
    (2, 'WORK', '6623261796', '21',  3),
    (3, 'HOME', '6585892837', NULL, 1),
    (3, 'WORK', '1247513814', NULL, 3),
    (4, 'WORK', '4196738405', NULL, 3),
    (5, 'WORK', '3132002489', NULL, 3),
    (6, 'WORK', '2624339005', NULL, 3);

INSERT INTO customer_email (universal_id, type, email, privacy_code) 
VALUES (1, 'HOME', 'john.doe@email.com', 1),
    (1, 'WORK', 'john.doe@pru.com', 3),
    (2, 'HOME', 'jane.doe@email.com', 1),
    (2, 'WORK', 'jane.doe@pru.com',  3),
    (3, 'HOME', 'beth.boothe@email.com', 1),
    (3, 'WORK', 'beth.boothe@pru.com',  3),
    (4, 'WORK', 'contact@umbrellacorp.com', 1),
    (5, 'WORK', 'service@flashpoint.com', 1),
    (6, 'WORK', 'support@rhynoodle.com', 1);

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
