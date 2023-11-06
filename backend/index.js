const express = require("express");
const cors = require("cors");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "capstone_db",
  password: "docker",
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
