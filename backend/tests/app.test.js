const request = require("supertest");
const { app, server } = require("../index.js");

describe("Test the root path", () => {
  test('It should respond with "Backend is running!!"', async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("Backend is running!!");
    expect(response.statusCode).toBe(200);
  });
});

afterAll((done) => {
  // Closing the connection allows Jest to exit successfully.
  server.close();
  done();
});
