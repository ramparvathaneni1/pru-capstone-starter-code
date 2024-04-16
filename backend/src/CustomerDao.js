// Data Access Layer for Customer DB
module.exports = function CustomerDao(pool) {
  this.pool = pool;

  // CREATE Queries
  const CREATE_CUSTOMER = `INSERT INTO customer(
    cis_id, first_name, last_name, middle_name, org_name, 
    gender, marital_status, dob, is_org, 
    pref_address_type, pref_phone_type, pref_email_type, pref_language)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`;

  const CREATE_CONTRACT = `INSERT INTO contract(
    line_of_business_code, company_code, product_code, effective_date,
    issue_date, termination_date, universal_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

  const CREATE_ADDRESS = `INSERT INTO customer_address(
    universal_id, type, addr_line_1, addr_line_2, city, state, zip, privacy_code) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

  const CREATE_PHONE = `INSERT INTO customer_phone(
    universal_id, type, phone_num, phone_ext, privacy_code) 
  VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  const CREATE_EMAIL = `INSERT INTO customer_email(
    universal_id, type, email, privacy_code) 
  VALUES ($1, $2, $3, $4) RETURNING *`;

  // GET Queries
  const GET_ALL_CUSTOMERS = `SELECT universal_id, cis_id, first_name, middle_name, last_name, is_org, org_name, dob
    FROM customer
    WHERE is_active = true
    ORDER BY universal_id ASC`;

  const GET_CUSTOMER_BY_ID = `SELECT universal_id, cis_id, first_name, middle_name, last_name, is_org, org_name,
    gender, marital_status, dob,
    pref_address_type, pref_phone_type, pref_email_type, pref_language, is_active
    FROM customer
    WHERE universal_id = $1
    ORDER BY universal_id ASC`;

  const GET_CONTRACT_BY_CONTRACT_NUM = `SELECT contract_num, line_of_business_code, company_code, product_code,
    issue_date, effective_date, termination_date, is_active
    FROM contract
    WHERE contract_num = $1
    ORDER BY contract_num ASC`;

  const GET_ADDRESS_BY_ID = `SELECT id, universal_id, type, addr_line_1, addr_line_2, city, state, zip, privacy_code FROM customer_address WHERE id = $1`;

  const GET_PHONE_BY_ID = `SELECT id, universal_id, type, phone_num, phone_ext, privacy_code FROM customer_phone WHERE id = $1`;

  const GET_EMAIL_BY_ID = `SELECT id, universal_id, type, email, privacy_code FROM customer_email WHERE id = $1`;

  const GET_CONTRACTS_BY_CUSTOMER = `SELECT contract_num, line_of_business_code, company_code, product_code,
    issue_date, effective_date, termination_date, is_active
    FROM contract
    WHERE universal_id = $1 AND is_active = true
    ORDER BY contract_num ASC`;

  const GET_ADDRESSES_BY_CUSTOMER = `SELECT id, type, addr_line_1, addr_line_2, city, state, zip, privacy_code
    FROM customer_address
    WHERE universal_id = $1
    ORDER BY id ASC`;

  const GET_PHONES_BY_CUSTOMER = `SELECT id, type, phone_num, phone_ext, privacy_code
    FROM customer_phone
    WHERE universal_id = $1
    ORDER BY id ASC`;

  const GET_EMAILS_BY_CUSTOMER = `SELECT id, type, email, privacy_code
    FROM customer_email
    WHERE universal_id = $1
    ORDER BY id ASC`;

  // UPDATE Queries
  const UPDATE_CUSTOMER_BY_ID = `UPDATE customer SET 
      cis_id = $2,
      first_name = $3,
      last_name = $4,
      middle_name = $5,
      org_name = $6,
      is_org = $7,
      gender = $8,
      marital_status = $9,
      dob = $10,
      pref_address_type = $11,
      pref_phone_type = $12,
      pref_email_type = $13,
      pref_language = $14,
      is_active = $15
    WHERE universal_id = $1 RETURNING *`;

  const UPDATE_CONTRACT_BY_CONTRACT_NUM = `UPDATE contract SET
      line_of_business_code = $2,
      company_code = $3,
      product_code = $4,
      effective_date = $5,
      issue_date = $6,
      termination_date = $7,
      universal_id = $8,
      is_active = $9
    WHERE contract_num = $1 RETURNING *`;

  const UPDATE_ADDRESS_BY_ID = `UPDATE customer_address SET
      universal_id = $2,
      type = $3,
      addr_line_1 = $4,
      addr_line_2 = $5,
      city = $6,
      state = $7,
      zip = $8,
      privacy_code = $9
    WHERE id = $1 RETURNING *`;

  const UPDATE_PHONE_BY_ID = `UPDATE customer_phone SET
      universal_id = $2,
      type = $3,
      phone_num = $4,
      phone_ext = $5,
      privacy_code = $6
    WHERE id = $1 RETURNING *`;

  const UPDATE_EMAIL_BY_ID = `UPDATE customer_email SET
      universal_id = $2,
      type = $3,
      email = $4,
      privacy_code = $5
    WHERE id = $1 RETURNING *`;

  // DELETE Queries
  const DEACTIVATE_CUSTOMER_BY_ID = `UPDATE customer SET is_active = false WHERE universal_id = $1 RETURNING *`;

  const DEACTIVATE_CONTRACT_BY_CONTRACT_NUM = `UPDATE contract SET is_active = false WHERE contract_num = $1 RETURNING *`;

  const DELETE_ADDRESS_BY_ID = `DELETE FROM customer_address WHERE id = $1`;

  const DELETE_PHONE_BY_ID = `DELETE FROM customer_phone WHERE id = $1`;

  const DELETE_EMAIL_BY_ID = `DELETE FROM customer_email WHERE id = $1`;

  this.createCustomer = async (params) => {
    return await this.getDataFromDB(CREATE_CUSTOMER, params);
  }

  this.createContract = async (params) => {
    return await this.getDataFromDB(CREATE_CONTRACT, params);
  }

  this.createAddress = async (params) => {
    return await this.getDataFromDB(CREATE_ADDRESS, params);
  }

  this.createPhone = async (params) => {
    return await this.getDataFromDB(CREATE_PHONE, params);
  }

  this.createEmail = async (params) => {
    return await this.getDataFromDB(CREATE_EMAIL, params);
  }

  this.getAllCustomers = async () => {
    return await this.getDataFromDB(GET_ALL_CUSTOMERS, []);
  };

  this.getCustomerById = async (universalId) => {
    return await this.getDataFromDB(GET_CUSTOMER_BY_ID, [universalId]);
  };

  this.getContractByContractNum = async (contractNum) => {
    return await this.getDataFromDB(GET_CONTRACT_BY_CONTRACT_NUM, [
      contractNum,
    ]);
  };

  this.getAddressById = async (id) => {
    return await this.getDataFromDB(GET_ADDRESS_BY_ID, [id]);
  };

  this.getPhoneById = async (id) => {
    return await this.getDataFromDB(GET_PHONE_BY_ID, [id]);
  };

  this.getEmailById = async (id) => {
    return await this.getDataFromDB(GET_EMAIL_BY_ID, [id]);
  };

  this.getContractsByCustomerId = async (universalId) => {
    return await this.getDataFromDB(GET_CONTRACTS_BY_CUSTOMER, [universalId]);
  };

  this.getAddressesByCustomerId = async (universalId) => {
    return await this.getDataFromDB(GET_ADDRESSES_BY_CUSTOMER, [universalId]);
  };

  this.getPhonesByCustomerId = async (universalId) => {
    return await this.getDataFromDB(GET_PHONES_BY_CUSTOMER, [universalId]);
  };

  this.getEmailsByCustomerId = async (universalId) => {
    return await this.getDataFromDB(GET_EMAILS_BY_CUSTOMER, [universalId]);
  };

  this.updateCustomerById = async (params) => {
    return await this.getDataFromDB(UPDATE_CUSTOMER_BY_ID, params);
  };

  this.updateContractByContractNum = async (params) => {
    return await this.getDataFromDB(UPDATE_CONTRACT_BY_CONTRACT_NUM, params);
  };

  this.updateAddressById = async (params) => {
    return await this.getDataFromDB(UPDATE_ADDRESS_BY_ID, params);
  };

  this.updatePhoneById = async (params) => {
    return await this.getDataFromDB(UPDATE_PHONE_BY_ID, params);
  };

  this.updateEmailById = async (params) => {
    return await this.getDataFromDB(UPDATE_EMAIL_BY_ID, params);
  };

  this.deactivateCustomerById = async (universalId) => {
    return await this.getDataFromDB(DEACTIVATE_CUSTOMER_BY_ID, [universalId]);
  };

  this.deactivateContractByContractNum = async (contractNum) => {
    return await this.getDataFromDB(DEACTIVATE_CONTRACT_BY_CONTRACT_NUM, [
      contractNum,
    ]);
  };

  this.deleteAddressById = async (id) => {
    return await this.getDataFromDB(DELETE_ADDRESS_BY_ID, [id]);
  };

  this.deletePhoneById = async (id) => {
    return await this.getDataFromDB(DELETE_PHONE_BY_ID, [id]);
  };

  this.deleteEmailById = async (id) => {
    return await this.getDataFromDB(DELETE_EMAIL_BY_ID, [id]);
  };

  /*
   * Returns {data, error}
   * data = Data from DB. 0 or more records.
   * error = Any error when trying to query the DB.
   */
  this.getDataFromDB = async (query, params) => {
    let data = null;
    let error = null;
    try {
      const result = await this.pool.query(query, params);
      return { data: result.rows, error, rowCount: result.rowCount };
    } catch (error) {
      console.error(error);
      return { data, error, rowCount: null };
    }
  };
};
