const express = require("express");
const cors = require("cors");
const Pool = require("pg").Pool;

// TO RUN YOUR SERVER LOCALLY, USE THIS POOL VARIABLE
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "capstone_db",
//   password: "postgres",s
//   port: 5432,
//   });

// FOR DOCKER COMPOSE, USE THIS VARIABLE
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
  res.send("Backend is running!!")
});

app.get("/api/capstone", (req, res) => {
  pool.query("SELECT * FROM capstone ORDER BY id ASC", (error, results) => {
    if (error) throw error;

    console.log(results);
    res.status(200).json({ capstone_table_results: results.rows });
  });
});

// app.listen("3001", () => { });
const server = app.listen("3001", () => { });

module.exports = { app, server };
