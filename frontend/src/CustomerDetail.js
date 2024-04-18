import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
  getContractsByCustomerId,
} from "./customer_api";
import Contracts from "./Contracts";
import Customer from "./Customer";

export default function CustomerDetail({
  handleDeleteCustomer,
  handleUpdateCustomer,
}) {
  const { id } = useParams();
  console.log("id = ", id);
  const [customer, setCustomer] = useState(null);
  const [customerApiMsg, setCustomerApiMsg] = useState(null);
  const [contracts, setContracts] = useState(null);
  const [contractApiMsg, setContractApiMsg] = useState(null);

  // GET Customer By ID from API
  async function getCustomer(id) {
    const response = await getCustomerById(id);
    setCustomer(response.customer);
    setCustomerApiMsg(response.message);
  }

  // GET Contracts for Customer from API
  async function getContracts(id) {
    const response = await getContractsByCustomerId(id);
    setContracts(response.contracts);
    setContractApiMsg(response.message);
  }

  useEffect(() => {
    getCustomer(id);
    getContracts(id);
  }, [id]);

  // Call API to Delete Customer and bubble event to App Component
  const deleteCustomer = async (event) => {
    event.preventDefault();
    const response = await deleteCustomerById(customer);
    console.log("Delete Customer Response = ", response);
    handleDeleteCustomer(event);
  };

  // Call API to Update Customer and bubble even tto App Component
  const updateCustomer = async (event, customerToUpdate) => {
    await updateCustomerById(customerToUpdate);
    await getCustomer(id);
    handleUpdateCustomer(event);
  };

  return (
    <>
      <Customer
        customer={customer}
        message={customerApiMsg}
        deleteCustomer={deleteCustomer}
        updateCustomer={updateCustomer}
      ></Customer>
      <Contracts contracts={contracts} message={contractApiMsg}></Contracts>
    </>
  );
}
