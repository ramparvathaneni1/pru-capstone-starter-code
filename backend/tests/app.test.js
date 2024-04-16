const request = require("supertest");
const { app, server } = require("../index.js");

describe("Testing the root path", () => {
  test("should respond 'Customer API running!'", async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("Customer API running!");
    expect(response.statusCode).toBe(200);
  });
});

describe("Testing the GET Requests", () => {

  // Testing GET All Customers
  test("should return all active Customers", async () => {
    const response = await request(app).get("/api/customer");
    const customers = response.body;
    expect(Array.isArray(customers)).toBe(true);
    expect(customers.length).toBeGreaterThan(0);
    expect(response.statusCode).toBe(200);
  });

  // Testing GET All Customer Details for Given Customer ID
  test("should return all Customer Details for given Customer", async () => {
    const response = await request(app).get("/api/customer/1");
    const customer = response.body;

    expect(customer).not.toBeNull();
    expect(customer.universal_id).toBe(1);
    expect(customer.addresses).toBeTruthy();
    expect(customer.phones).toBeTruthy();
    expect(customer.emails).toBeTruthy();
  });

  // Testing GET Contract by Contract Number
  test("should return Contract by Contract Number", async () => {
    const response = await request(app).get("/api/contract/1");
    expect(response.body).toBeTruthy();
    expect(response.body.company_code).toBeTruthy();
    expect(response.statusCode).toBe(200);
  })

  // Testing GET Contracts for Given Customer ID
  test("should return all Contracts by Customer ID", async () => {
    const response = await request(app).get("/api/customer/1/contract");
    const contracts = response.body;
    expect(Array.isArray(contracts)).toBe(true);
    expect(contracts.length).toBeGreaterThan(0);
    expect(response.statusCode).toBe(200);
  });

});

describe.only("Testing the POST Requests", () => {
  // Create a Customer
  test("should create a Customer", async () => {
    const response = await request(app).post("/api/customer").send(testCustomer);
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.newCustomer.first_name).toBe("Test");
    expect(response.statusCode).toBe(200);
  });

  // Create a Contract
  test("should create a Contract", async () => {
    const response = await request(app).post("/api/contract").send(testContract);
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.newContract.company_code).toBe("TEST");
    expect(response.statusCode).toBe(200);
  });

  // Create an Address
  test("should create an Address", async () => {
    const response = await request(app).post("/api/address").send(testAddress);
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.newAddress.addr_line_1).toBe("123 Wash St");
    expect(response.statusCode).toBe(200);
  });

  // Create a Phone
  test("should create a Phone", async () => {
    const response = await request(app).post("/api/phone").send(testPhone);
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.newPhone.phone_ext).toBe("999");
    expect(response.statusCode).toBe(200);
  });

  // Create an Email
  test("should create an Email", async () => {
    const response = await request(app).post("/api/email").send(testEmail);
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.newEmail.email).toBe("test@pru.com");
    expect(response.statusCode).toBe(200);
  });
});

describe("Testing the UPDATE Requests", () => {
  // Update Customer 
  test("should update Customer by ID", async () => {
    const response = await request(app).put("/api/customer/1").send({middle_name: "H"});
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.updatedCustomer.middle_name).toBe("H");
    expect(response.statusCode).toBe(200);
  });

  // Update Contract
  test("should update Contract by ID", async () => {
    const response = await request(app).put("/api/contract/1").send({company_code: "WLMT"});
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.updatedContract.company_code).toBe("WLMT");
    expect(response.statusCode).toBe(200);
  });

  // Update Address
  test("should update Address by ID", async () => {
    const response = await request(app).put("/api/address/1").send({zip: 12345});
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.updatedAddress.zip).toBe(12345);
    expect(response.statusCode).toBe(200);
  });

  // Update Phone
  test("should update Phones by ID", async () => {
    const response = await request(app).put("/api/phone/1").send({phone_ext: 12345});
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.updatedPhone.phone_ext).toBe(12345);
    expect(response.statusCode).toBe(200);
  });

  // Update Email
  test("should update Emails by ID", async () => {
    const response = await request(app).put("/api/email/1").send({email: "test@pru.com"});
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.updatedEmail.email).toBe("test@pru.com");
    expect(response.statusCode).toBe(200);
  });
});

describe("Testing the Delete Requests", () => {
  // Deactivate a Customer
  test("should deactivate Customer By ID", async () => {
    const response = await request(app).delete("/api/customer/1");
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.statusCode).toBe(200);
  });

  // Deactivate a Contract
  test("should deactivate Contract By Contract Number", async () => {
    const response = await request(app).delete("/api/contract/1");
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.statusCode).toBe(200);
  });

  // Delete an Address
  test("should delete Address By ID", async () => {
    const response = await request(app).delete("/api/address/1");
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.statusCode).toBe(200);
  });

  // Delete an Phone
  test("should delete Phone By ID", async () => {
    const response = await request(app).delete("/api/phone/1");
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.statusCode).toBe(200);
  });

  // Delete an Email
  test("should delete Email By ID", async () => {
    const response = await request(app).delete("/api/email/1");
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.statusCode).toBe(200);
  });
});

afterAll((done) => {
  // Closing the connection allows Jest to exit successfully.
  server.close();
  done();
});
