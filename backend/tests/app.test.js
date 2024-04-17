const request = require("supertest");
const { app, server } = require("../index.js");

describe("Testing the root path", () => {
  test("should respond 'Customer API running!'", async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("Customer API running!");
    expect(response.statusCode).toBe(200);
  });
});

let testUnivlId = null;
let testContractNum = null;
let testAddressId = null;
let testPhoneId = null;
let testEmailId = null;
describe("Testing the POST Requests", () => {
  // Create a Customer
  test("should create a Customer", async () => {
    const testCustomer = {
      cis_id: "TEST_123",
      first_name: "Test",
      last_name: "Person",
      middle_name: "M",
      org_name: "",
      gender: "M",
      marital_status: "Married",
      dob: "1990-01-01",
      is_org: false,
      pref_address_type: "HOME",
      pref_phone_type: "HOME",
      pref_email_type: "HOME",
      pref_language: "ENGLISH",
    };
    const response = await request(app)
      .post("/api/customer")
      .send(testCustomer);
    const newCustomer = response.body.newCustomer;
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.newCustomer.first_name).toBe("Test");
    expect(response.body.newCustomer.universal_id).toBeTruthy();
    expect(response.statusCode).toBe(200);
    testUnivlId = newCustomer.universal_id;
  });

  // Create a Contract
  test("should create a Contract", async () => {
    const testContract = {
      line_of_business_code: "LOB",
      company_code: "COMP",
      product_code: "PROD",
      effective_date: "1990-01-01",
      issue_date: "1990-01-01",
      termination_date: null,
      universal_id: testUnivlId,
    };
    const response = await request(app)
      .post("/api/contract")
      .send(testContract);
    const newContract = response.body.newContract;
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(newContract.company_code).toBe("COMP");
    expect(newContract.universal_id).toBe(testUnivlId);
    expect(response.statusCode).toBe(200);
    testContractNum = newContract.contract_num;
  });

  // Create an Address
  test("should create an Address", async () => {
    const testAddress = {
      universal_id: testUnivlId,
      type: "HOME",
      addr_line_1: "123 Wash St",
      addr_line_2: "",
      city: "Newark",
      state: "NJ",
      zip: 12345,
      privacy_code: 1,
    };
    const response = await request(app).post("/api/address").send(testAddress);
    const newAddress = response.body.newAddress;
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(newAddress.addr_line_1).toBe("123 Wash St");
    expect(newAddress.universal_id).toBe(testUnivlId);
    expect(response.statusCode).toBe(200);
    testAddressId = newAddress.id;
  });

  // Create a Phone
  test("should create a Phone", async () => {
    const testPhone = {
      universal_id: testUnivlId,
      type: "HOME",
      phone_num: 1234567890,
      phone_ext: 999,
      privacy_code: 1,
    };
    const response = await request(app).post("/api/phone").send(testPhone);
    const newPhone = response.body.newPhone;
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(newPhone.phone_ext).toBe(999);
    expect(newPhone.universal_id).toBe(testUnivlId);
    expect(response.statusCode).toBe(200);
    testPhoneId = newPhone.id;
  });

  // Create an Email
  test("should create an Email", async () => {
    const testEmail = {
      universal_id: testUnivlId,
      type: "HOME",
      email: "test@pru.com",
      privacy_code: 1,
    };
    const response = await request(app).post("/api/email").send(testEmail);
    const newEmail = response.body.newEmail;
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.newEmail.email).toBe("test@pru.com");
    expect(newEmail.universal_id).toBe(testUnivlId);
    expect(response.statusCode).toBe(200);
    testEmailId = newEmail.id;
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
    const response = await request(app).get(`/api/customer/${testUnivlId}`);
    const customer = response.body;
    expect(customer).not.toBeNull();
    expect(customer.universal_id).toBe(testUnivlId);
    expect(customer.addresses).toBeTruthy();
    expect(customer.phones).toBeTruthy();
    expect(customer.emails).toBeTruthy();
  });

  // Testing GET Contract by Contract Number
  test("should return Contract by Contract Number", async () => {
    const response = await request(app).get(`/api/contract/${testContractNum}`);
    expect(response.body).toBeTruthy();
    expect(response.body.company_code).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });

  // Testing GET Contracts for Given Customer ID
  test("should return all Contracts by Customer ID", async () => {
    const response = await request(app).get(
      `/api/customer/${testUnivlId}/contract`
    );
    const contracts = response.body;
    expect(Array.isArray(contracts)).toBe(true);
    expect(contracts.length).toBeGreaterThan(0);
    expect(response.statusCode).toBe(200);
  });
});

describe("Testing the UPDATE Requests", () => {
  // Update Customer
  test("should update Customer by ID", async () => {
    const response = await request(app)
      .put(`/api/customer/${testUnivlId}`)
      .send({ middle_name: "H" });
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.updatedCustomer.middle_name).toBe("H");
    expect(response.statusCode).toBe(200);
  });

  // Update Contract
  test("should update Contract by ID", async () => {
    const response = await request(app)
      .put(`/api/contract/${testContractNum}`)
      .send({ company_code: "WLMT" });
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.updatedContract.company_code).toBe("WLMT");
    expect(response.statusCode).toBe(200);
  });

  // Update Address
  test("should update Address by ID", async () => {
    const response = await request(app)
      .put(`/api/address/${testAddressId}`)
      .send({ zip: 12345 });
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.updatedAddress.zip).toBe(12345);
    expect(response.statusCode).toBe(200);
  });

  // Update Phone
  test("should update Phones by ID", async () => {
    const response = await request(app)
      .put(`/api/phone/${testPhoneId}`)
      .send({ phone_ext: 12345 });
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.updatedPhone.phone_ext).toBe(12345);
    expect(response.statusCode).toBe(200);
  });

  // Update Email
  test("should update Emails by ID", async () => {
    const response = await request(app)
      .put(`/api/email/${testEmailId}`)
      .send({ email: "test123@pru.com" });
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.body.updatedEmail.email).toBe("test123@pru.com");
    expect(response.statusCode).toBe(200);
  });
});

describe("Testing the Delete Requests", () => {
  // Delete an Address
  test("should delete Address By ID", async () => {
    const response = await request(app).delete(`/api/address/${testAddressId}`);
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.statusCode).toBe(200);
  });

  // Delete an Phone
  test("should delete Phone By ID", async () => {
    const response = await request(app).delete(`/api/phone/${testPhoneId}`);
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.statusCode).toBe(200);
  });

  // Delete an Email
  test("should delete Email By ID", async () => {
    const response = await request(app).delete(`/api/email/${testEmailId}`);
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.statusCode).toBe(200);
  });

  // Deactivate a Contract
  test("should deactivate Contract By Contract Number", async () => {
    const response = await request(app).delete(
      `/api/contract/${testContractNum}`
    );
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.statusCode).toBe(200);
  });

  // Deactivate a Customer
  test("should deactivate Customer By ID", async () => {
    const response = await request(app).delete(`/api/customer/${testUnivlId}`);
    expect(response.body.message.toLowerCase()).toContain("success");
    expect(response.statusCode).toBe(200);
  });
});

afterAll((done) => {
  // Closing the connection allows Jest to exit successfully.
  server.close();
  done();
});
