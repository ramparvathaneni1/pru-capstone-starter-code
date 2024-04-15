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

  // Testing GET All Active Customers
  test("should return all active Customers", async () => {
    const response = await request(app).get("/api/customer");
    const customers = response.body;
    expect(Array.isArray(customers)).toBe(true);
    expect(customers.length).toBeGreaterThan(0);
    expect(response.statusCode).toBe(200);
  });

  // Testing GET All Active Contracts for Given Customer ID
  test("should return all active Contracts by Customer ID", async () => {
    const response = await request(app).get("/api/customer/1/contract");
    const contracts = response.body;
    expect(Array.isArray(contracts)).toBe(true);
    expect(contracts.length).toBeGreaterThan(0);
    expect(response.statusCode).toBe(200);
  });

  // Testing GET All Customer Details for Given Customer ID
  test.only("should return all Customer Details for given Customer", async () => {
    const response = await request(app).get("/api/customer/10");
    const customer = response.body;
    expect(customer).not.toBeNull();
    expect(customer.universal_id).toBe(1);
    expect(customer.contract).not.toBeNull();
    expect(customer.address).not.toBeNull();
    expect(customer.phone).not.toBeNull();
    expect(customer.email).not.toBeNull();
  });


});

afterAll((done) => {
  // Closing the connection allows Jest to exit successfully.
  server.close();
  done();
});
