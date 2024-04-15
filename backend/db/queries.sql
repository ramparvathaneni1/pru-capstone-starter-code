-- Get All Customers
SELECT universal_id, cis_id, first_name, middle_name, last_name, is_org, org_name, dob
FROM customer
WHERE is_active = true
ORDER BY universal_id ASC;

-- Get Customer Details with Address, Phone, Email and Customer Preferences
SELECT c.universal_id, c.cis_id,
    c.first_name, c.middle_name, c.last_name, c.is_org, c.org_name,
    c.gender, c.marital_status, c.dob,
    c.pref_address_type, c.pref_phone_type, c.pref_email_type, c.pref_language,
    a.id, a.type, a.addr_line_1, a.addr_line_2, a.city, a.state, a.zip, a.privacy_code,
    p.id, p.type, p.phone_num, p.phone_ext, p.privacy_code,
    e.id, e.type, e.email, e.privacy_code
FROM customer c
INNER JOIN customer_address a ON a.universal_id=c.universal_id
INNER JOIN customer_phone p ON p.universal_id=c.universal_id
INNER JOIN customer_email e ON e.universal_id=c.universal_id
WHERE c.universal_id=$1 AND c.is_active=true
GROUP BY c.universal_id, a.id, p.id, e.id
ORDER BY c.universal_id ASC;

-- Get Customer Contract Details
SELECT c.universal_id, c.cis_id,
    c.first_name, c.middle_name, c.last_name, c.is_org, c.org_name,
    con.contract_num, con.line_of_business_code, con.company_code, con.product_code, 
    con.issue_date, con.effective_date, con.termination_date
FROM customer c
INNER JOIN contract con ON con.universal_id=c.universal_id
WHERE c.universal_id=$1 AND c.is_active=true AND con.is_active=true
GROUP BY c.universal_id, con.contract_num
ORDER BY c.universal_id ASC;

-- Get All Addresses By Customer
SELECT id, universal_id, type, addr_line_1, addr_line_1, city, state, zip, privacy_code
FROM customer_address
WHERE universal_id = $1
ORDER BY universal_id ASC;

-- Get All Phones By Customer
SELECT id, universal_id, type, phone_num, phone_ext, privacy_code
FROM customer_phone
WHERE universal_id = $1
ORDER BY universal_id ASC;

-- Get All Emails By Customer
SELECT id, universal_id, type, email, privacy_code
FROM customer_email
WHERE universal_id = $1
ORDER BY universal_id ASC;

-- UPDATE Customer
UPDATE customer SET 
    cis_id = COALESCE(NULLIF($1, ''), cis_id),
    first_name = COALESCE(NULLIF($2, ''), first_name),
    last_name = COALESCE(NULLIF($3, ''), last_name),
    middle_name = COALESCE(NULLIF($4, ''), middle_name),
    org_name = COALESCE(NULLIF($5, ''), org_name),
    is_org = COALESCE(NULLIF($6, false), gender),
    gender = COALESCE(NULLIF($7, ''), gender),
    marital_status = COALESCE(NULLIF($8, ''), marital_status),
    dob = COALESCE(NULLIF($9, NULL), dob),
    pref_address_type = COALESCE(NULLIF($10, ''), pref_address_type),
    pref_phone_type = COALESCE(NULLIF($11, ''), pref_phone_type),
    pref_email_type = COALESCE(NULLIF($12, ''), pref_email_type),
    pref_language = COALESCE(NULLIF($13, ''), pref_language),
    is_active = COALESCE(NULLIF($14, true), is_active),
WHERE universal_id = $1 RETURNING *;

-- UPDATE Contract
UPDATE contract SET
    line_of_business_code=COALESCE(NULLIF($2, ''), line_of_business_code),
    company_code=COALESCE(NULLIF($3, ''), company_code),
    product_code=COALESCE(NULLIF($4, ''), product_code),
    effective_date=COALESCE(NULLIF($5, ''), effective_date),
    issue_date=COALESCE(NULLIF($6, ''), issue_date),
    termination_date=COALESCE(NULLIF($7, ''), termination_date),
    universal_id=$8,
    is_active=COALESCE(NULLIF($9, true),is_active)
WHERE contract_num = $1 RETURNING *;

-- UPDATE Customer Address
UPDATE customer_address SET
    universal_id = $2,
    type = COALESCE(NULLIF($3, ''), type),
    addr_line_1 = COALESCE(NULLIF($4, ''), addr_line_1),
    addr_line_2 = COALESCE(NULLIF($5, ''), addr_line_2),
    city = COALESCE(NULLIF($6, ''), city),
    state = COALESCE(NULLIF($7, ''), state),
    zip = COALESCE(NULLIF($8, ''), zip),
    privacy_code = COALESCE(NULLIF($9, ''), privacy_code)
WHERE id = $1 RETURNING *;

-- UPDATE Customer Phone
UPDATE customer_phone SET
    universal_id = $2,
    type = COALESCE(NULLIF($3, ''), type),
    phone_num = COALESCE(NULLIF($4, ''), phone_num),
    phone_ext = COALESCE(NULLIF($5, ''), phone_ext),
    privacy_code = COALESCE(NULLIF($9, ''), privacy_code)
WHERE id = $1 RETURNING *;

-- UPDATE Customer Email
UPDATE customer_email SET
    universal_id = $2,
    type = COALESCE(NULLIF($3, ''), type),
    email = COALESCE(NULLIF($4, ''), email),
    privacy_code = COALESCE(NULLIF($9, ''), privacy_code)
WHERE id = $1 RETURNING *;

-- INSERT Customer
INSERT INTO customer(cis_id, first_name, last_name, middle_name, org_name, gender, marital_status, dob, is_org, pref_address_type, pref_phone_type, pref_email_type, pref_language)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);

-- INSERT Contract
INSERT INTO contract(line_of_business_code, company_code, product_code, effective_date, issue_date, termination_date, universal_id)
VALUES ($1, $2, $3, $4, $5, $6, $7);

-- INSERT Customer Address
INSERT INTO customer_address (universal_id, type, addr_line_1, addr_line_2, city, state, zip, privacy_code) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8);

-- INSERT Customer Phone
INSERT INTO customer_phone(universal_id, type, phone_num, phone_ext, privacy_code) 
VALUES ($1, $2, $3, $4, $5);

-- INSERT Customer Email
INSERT INTO customer_email(universal_id, type, email, privacy_code) 
VALUES ($1, $2, $3, $4);

-- DEACTIVATE Customer
UPDATE customer SET is_active = false WHERE universal_id = $1;

-- DEACTIVATE Contract
UPDATE contract SET is_active = false WHERE contract_num = $1;

-- DELETE Customer Address
DELETE customer_address WHERE id = $1;

-- DELETE Customer Phone
DELETE customer_phone WHERE id = $1;

-- DELETE Customer Email
DELETE customer_email WHERE id = $1;
