const express = require("express");
const cors = require("cors");
const Pool = require("pg").Pool;
const Constant = require("./src/constant");
const CustomerAPI = require("./src/customer_api");

// TO RUN YOUR SERVER LOCALLY, USE THIS POOL VARIABLE
const pool = new Pool({
  user: "postgres",
  host: "localhost", // MAKE SURE YOU CHANGE THE HOST FOR YOUR DOCKER IMAGE
  database: "customer_db",
  password: "postgres", // FOR DOCKER - CHANGE THIS TO DOCKER
  port: 5432,
});

// TO BUILD YOUR DOCKER IMAGE, USE THIS POOL VARIABLE INSTEAD
// const pool = new Pool({
//   user: "postgres",
//   host: "db-container", // WE'VE CHANGED THE HOST NAME
//   database: "capstone_db",
//   password: "docker", // CHANGED PASSWORD TO DOCKER
//   port: 5432,
// });

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Customer API running!");
});

app.get("/api/customer", (req, res) => {
  const ALL_CUSTOMERS = `SELECT universal_id, cis_id, first_name, middle_name, last_name, is_org, org_name, dob
    FROM customer
    ORDER BY universal_id ASC`;
  const ALL_ACTIVE_CUSTOMERS = `SELECT universal_id, cis_id, first_name, middle_name, last_name, is_org, org_name, dob
    FROM customer
    WHERE is_active = true
    ORDER BY universal_id ASC`;
  const inactiveFlag = req.query.inactive;
  const query =
    inactiveFlag && inactiveFlag.toLowerCase() == "true"
      ? ALL_CUSTOMERS
      : ALL_ACTIVE_CUSTOMERS;
  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        message: `An error occurred while fetching All Customers.`,
      });
    }

    if (results.rows.length > 0) {
      console.log(`Successfully fetched All Customers.`);
      res.status(200).json(results.rows);
    } else {
      res.status(404).json({
        message: `Unable to Active Customers.`,
      });
    }
  });
});

app.get("/api/customer/:id/contract", (req, res) => {
  const universal_id = req.params.id;
  const query = `SELECT c.universal_id, c.cis_id,
      c.first_name, c.middle_name, c.last_name, c.is_org, c.org_name,
      con.contract_num, con.line_of_business_code, con.company_code, con.product_code,
      con.issue_date, con.effective_date, con.termination_date
    FROM customer c
    INNER JOIN contract con ON con.universal_id=c.universal_id
    WHERE c.universal_id=${universal_id} AND c.is_active=true AND con.is_active=true
    GROUP BY c.universal_id, con.contract_num
    ORDER BY c.universal_id ASC`;

  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        message: `An error occurred while fetching Contracts for Customer (ID=${universal_id}).`,
      });
    }

    if (results.rows.length > 0) {
      console.log(
        `Successfully fetched Contracts for Customer (ID: ${universal_id}).`
      );
      res.status(200).json(results.rows);
    } else {
      res.status(404).json({
        message: `Unable to find Contracts with Customer ID ${universal_id}.`,
      });
    }
  });
});

app.get("/api/customer/:id", async (req, res) => {
  const universal_id = req.params.id;

  const customerQuery = `SELECT universal_id, cis_id,
    first_name, middle_name, last_name, is_org, org_name,
    gender, marital_status, dob,
    pref_address_type, pref_phone_type, pref_email_type, pref_language
    FROM customer
    WHERE universal_id=${universal_id}`;

  const addressQuery = `SELECT id, type, addr_line_1, addr_line_2, city, state, zip, privacy_code
    FROM customer_address
    WHERE universal_id=${universal_id}`;

  const phoneQuery = `SELECT id, type, phone_num, phone_ext, privacy_code
    FROM customer_phone
    WHERE universal_id=${universal_id}`;

  const emailQuery = `SELECT id, type, email, privacy_code
    FROM customer_email
    WHERE universal_id=${universal_id}`;

    // Customer Data
    let customer = null;
    try {
      const customerResult = await pool.query(customerQuery);
      if (customerResult.rowCount > 0) {
        customer = customerResult.rows[0];
      } else {
        res.status(404).json({
          message: `Unable to find Customer with ID ${universal_id}`
        });
      }
      console.log("Customer = ", customer.rows);
    } catch(error) {
      console.error(error);
      res.status(500).json({
        message: `An error occurred while fetching Customer with ID ${universal_id}`
      });
    }

    // Address Data
    let addresses = null;
    try {
      const addressResult = await pool.query(addressQuery);
      if (addressResult.rowCount > 0) {
        addresses = addressResult.rows;
      } else {
        res.status(404).json({
          message: `Unable to find Address with Customer ID ${universal_id}`
        });
      }
      console.log("Addresses = ", addresses);
    } catch(error) {
      console.error(error);
      res.status(500).json({
        message: `An error occurred while fetching Customer with ID ${universal_id}`
      });
    }



  const addrPromise = await pool.query(addressQuery);
  console.log("Addresses = ", addressesResult.rows);

  // Phone Data
  const phonePromise = await pool.query(phoneQuery);
  console.log("Phones = ", phonesResult.rows);

  // Email Data
  const emailPromise = await pool.query(emailQuery);
  console.log("Emails = ", emailsResult.rows);

  


  // Customer Data
  /* pool.query(customerQuery, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        message: `An error occurred while fetching Customer Data for Customer (ID=${universal_id}).`,
      });
    }

    if (results.rows.length > 0) {
      console.log(
        `Successfully fetched Customer Data for Customer (ID: ${universal_id}).`
      );

      const customer = results.rows[0];
      console.log("Customer = ", customer);

    } else {
      res.status(404).json({
        message: `Unable to find Customer Data with Customer ID ${universal_id}.`,
      });
    }
  }); */
});

const server = app.listen("3001", () => {});

module.exports = { app, server };
