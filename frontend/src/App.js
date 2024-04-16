import "./App.css";
import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import CustomerList from "./CustomerList";
import AddCustomer from "./AddCustomer";
import About from "./About";

const backendApiUrl = "http://localhost:3001";

function App() {
  async function fetchData() {
    let response = await fetch(`${backendApiUrl}/api/customer`);
    response = await response.json();
    console.log(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <h1>Prudential Customer Gateway</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/customers">View All</Link>
            </li>
            <li>
              <Link to="/new">Add Customer</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/new" element={<AddCustomer />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
