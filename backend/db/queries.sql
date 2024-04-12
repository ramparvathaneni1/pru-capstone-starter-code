-- Get All Customers
SELECT universal_id, cis_id, first_name, middle_name, last_name, is_org, org_name, dob  FROM customer WHERE is_active = true;

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
WHERE c.universal_id=1 AND c.is_active=true
GROUP BY c.universal_id, a.id, p.id, e.id;

-- Get Customer Contract Details
SELECT c.universal_id, c.cis_id,
    c.first_name, c.middle_name, c.last_name, c.is_org, c.org_name,
    con.contract_num, con.line_of_business_code, con.company_code, con.product_code, 
    con.issue_date, con.effective_date, con.termination_date
FROM customer c
INNER JOIN contract con ON con.universal_id=c.universal_id
WHERE c.universal_id=1 AND c.is_active=true AND con.is_active=true
GROUP BY c.universal_id, con.contract_num;


-- UPDATE Customer

-- UPDATE Contract

-- UPDATE Customer Address

-- UPDATE Customer Phone

-- UPDATE Customer Email


-- INSERT Customer

-- INSERT Contract

-- INSERT Customer Address

-- INSERT Customer Phone

-- INSERT Customer Email


-- DEACTIVATE Customer

-- DEACTIVATE Contract

-- DELETE Customer Address

-- DELETE Customer Phone

-- DELETE Customer Email