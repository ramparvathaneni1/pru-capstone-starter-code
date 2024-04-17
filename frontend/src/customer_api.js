/**
 * All API/Data functions
 */

const baseUrl = "http://localhost:3001/api";

export async function getAllActiveCustomers() {
  console.log("Loading All Active Customers from API");
  const response = await fetch(`${baseUrl}/customer`);
  const data = await response.json();

  if (data.message) {
    return {message: data.message, customers: null};
  }

  return {customers: data, message: ""};
}

export async function getCustomerById(universalId) {
  const response = await fetch(`${baseUrl}/customer/${universalId}`);
  const data = await response.json();
  if (data.message) {
    return {message: data.message, customer: null};    
  }
  return {customer: data, message: ""};
}

export async function updateCustomerById(customerToUpdate) {
  console.log("Updating Customer: ", customerToUpdate);
  const universalId = customerToUpdate.universal_id;
  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerToUpdate),
  };

  try {
    const response = await fetch(`${baseUrl}/customer/${universalId}`, options);
    const data = await response.json();
    console.log(`Customer (universalId: ${universalId}) Update Response: `, data);
    return data;
  } catch (error) {
    console.log(`Error updating Customer (universalId: ${universalId}): `, error);
    return error;
  }
}

export async function deleteCustomerById(customerToUpdate) {
  const universalId = customerToUpdate.universal_id;
  console.log("Deleting Customer with universalId: ", universalId);
  const options = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${baseUrl}/customer/${universalId}`, options);
    const data = await response.json();
    console.log("Customer Delete Response: ", data);
  } catch (error) {
    console.log(`Error deleting Customer (universalId: ${universalId}): `, error);
  }
}
