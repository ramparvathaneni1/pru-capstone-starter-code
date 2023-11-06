const express = require("express");
const cors = require("cors");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "your_app_db",
  password: "postgres",
  port: 5432,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi There");
});

const server = app.listen("3001", () => {});

module.exports = { app, server };
