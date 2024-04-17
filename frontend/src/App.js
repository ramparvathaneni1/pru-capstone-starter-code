import "./App.css";
import { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { getAllActiveCustomers } from "./customer_api";
import Home from "./Home";
import CustomerList from "./CustomerList";
import CustomerDetail from "./CustomerDetail";
import AddCustomer from "./AddCustomer";
import About from "./About";

export default function App() {
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // GET CustomerList from API
  async function getCustomers() {
    const { customers, message } = await getAllActiveCustomers();
    setCustomers(customers);
    setMessage(message);
  }

  useEffect(() => {
    getCustomers();
  }, []);

  const handleDeleteCustomer = async () => {
    await getCustomers();
    navigate("/customers");
  };

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
          <Route
            path="/customers"
            element={<CustomerList customers={customers} message={message} />}
          />
          <Route path="/customers/:id" element={<CustomerDetail handleDeleteCustomer={handleDeleteCustomer} />} />
          <Route path="/new" element={<AddCustomer />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}
