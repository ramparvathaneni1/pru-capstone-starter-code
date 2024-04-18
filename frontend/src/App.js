import "./App.css";
import logo from "./images/pru-logo.png";
import { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { getAllActiveCustomers } from "./customer_api";
import CustomerList from "./CustomerList";
import CustomerDetail from "./CustomerDetail";
import AddCustomer from "./AddCustomer";
import LoadCustomers from "./LoadCustomers";
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

  const handleUpdateCustomer = async () => {
    await getCustomers();
  };

  const handleAddCustomer = async () => {
    await getCustomers();
    navigate("/customers");
  };

  return (
    <>
      <div className="App">
        <div className="heading">
          <div className="logo"><img src={logo} className="pru-logo" alt="pru-logo"/></div>
          <h1>Prudential Customer Gateway</h1>
        </div>
        <div className="clear"></div>
        <nav>
          <ul>
            <li>
              <Link to="/customers">Home</Link>
            </li>
            <li>
              <Link to="/customers/new">Add Customer</Link>
            </li>
            <li>
              <Link to="/customers/load">Load Customers</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route
            path="/customers"
            element={<CustomerList customers={customers} message={message} />}
          />
          <Route
            path="/customers/:id"
            element={
              <CustomerDetail
                handleDeleteCustomer={handleDeleteCustomer}
                handleUpdateCustomer={handleUpdateCustomer}
              />
            }
          />
          <Route
            path="/customers/new"
            element={<AddCustomer handleAddCustomer={handleAddCustomer} />}
          />
          <Route path="/customers/load" element={<LoadCustomers handleAddCustomer={handleAddCustomer} />}/>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/customers" replace />} />
        </Routes>
      </div>
    </>
  );
}
