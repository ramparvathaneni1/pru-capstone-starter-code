require('dotenv').config({path: './.env'});
const express = require("express");
const cors = require("cors");
const Pool = require("pg").Pool;
const CustomerDao = require("./src/CustomerDao.js");
const GetRequestHandler = require("./src/GetRequestHandler.js");
const UpdateRequestHandler = require("./src/UpdateRequestHandler.js");
const DeleteRequestHandler = require("./src/DeleteRequestHandler.js");
const CreateRequestHandler = require("./src/CreateRequestHandler.js");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_ENDPOINT || "localhost",
  database: process.env.DB_NAME || "customer_db",
  password: process.env.DB_PASS || "postgres",
  port: 5432
});

console.log("EXPRESS_ENV = ", process.env.EXPRESS_ENV);

const dao = new CustomerDao(pool);

const getHandlers = new GetRequestHandler(dao);
const updateHandlers = new UpdateRequestHandler(dao);
const deleteHandlers = new DeleteRequestHandler(dao);
const createHandlers = new CreateRequestHandler(dao);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Customer API running!");
});

// CREATE Customer
app.post("/api/customer", async (req, res) =>
  createHandlers.createCustomer(req, res)
);

// CREATE Contract
app.post("/api/contract", async (req, res) =>
  createHandlers.createContract(req, res)
);

// CREATE Address
app.post("/api/address", async (req, res) =>
  createHandlers.createAddress(req, res)
);

// CREATE Phone
app.post("/api/phone", async (req, res) =>
  createHandlers.createPhone(req, res)
);

// CREATE Email
app.post("/api/email", async (req, res) =>
  createHandlers.createEmail(req, res)
);

// GET All Customers
app.get("/api/customer", async (req, res) =>
  getHandlers.getAllCustomers(req, res)
);

// GET Customer Details by Customer ID
app.get("/api/customer/:id", async (req, res) =>
  getHandlers.getCustomerDetailsById(req, res)
);

// GET Contract By Contract Num
app.get("/api/contract/:id", async (req, res) =>
  getHandlers.getContractByContractNum(req, res)
);

// GET Address By ID
app.get("/api/address/:id", async (req, res) =>
  getHandlers.getAddressById(req, res)
);

// GET Phone By ID
app.get("/api/phone/:id", async (req, res) =>
  getHandlers.getPhoneById(req, res)
);

// GET Email By ID
app.get("/api/email/:id", async (req, res) =>
  getHandlers.getEmailById(req, res)
);

// GET Contracts By Customer ID
app.get("/api/customer/:id/contract", async (req, res) =>
  getHandlers.getContractsByCustomerId(req, res)
);

// UPDATE Customer
app.put("/api/customer/:id", async (req, res) =>
  updateHandlers.updateCustomerById(req, res)
);

// UPDATE Contract By Contract Number
app.put("/api/contract/:id", async (req, res) =>
  updateHandlers.updateContractByContractNum(req, res)
);

// UPDATE Address By ID
app.put("/api/address/:id", async (req, res) =>
  updateHandlers.updateAddressById(req, res)
);

// UPDATE Phone By ID
app.put("/api/phone/:id", async (req, res) =>
  updateHandlers.updatePhoneById(req, res)
);

// UPDATE Email By ID
app.put("/api/email/:id", async (req, res) =>
  updateHandlers.updateEmailById(req, res)
);

// DEACTIVATE Customer by ID
app.delete("/api/customer/:id", async (req, res) =>
  deleteHandlers.deactivateCustomerById(req, res)
);

// DEACTIVATE Contract by Contract Number
app.delete("/api/contract/:id", async (req, res) =>
  deleteHandlers.deactivateContractByContractNum(req, res)
);

// DELETE Address by ID
app.delete("/api/address/:id", async (req, res) =>
  deleteHandlers.deleteAddressById(req, res)
);

// DELETE Phone by ID
app.delete("/api/phone/:id", async (req, res) =>
  deleteHandlers.deletePhoneById(req, res)
);

// DELETE Email by ID
app.delete("/api/email/:id", async (req, res) =>
  deleteHandlers.deleteEmailById(req, res)
);

const server = app.listen("3001", () => {});

module.exports = { app, server };
