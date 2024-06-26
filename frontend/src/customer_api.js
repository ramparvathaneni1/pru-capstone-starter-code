/**
 * All API/Data functions
 */

const baseUrl = "http://localhost:3001/api";

export async function createCustomer(newCustomer) {
  console.log("Creating new Customer = ", newCustomer);
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCustomer),
  };

  try {
    const response = await fetch(`${baseUrl}/customer`, options);
    const data = await response.json();
    console.log("Customer Create Response: ", data);
    return data;
  } catch (error) {
    console.log(
      `Error creating new Customer with CIS ID: ${newCustomer.cis_id}`,
      error
    );
    return error;
  }
}

export async function createContract(newContract) {
  console.log("Creating new Contract = ", newContract);
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newContract),
  };

  try {
    const response = await fetch(`${baseUrl}/contract`, options);
    const data = await response.json();
    console.log("Contract Create Response: ", data);
    return data;
  } catch (error) {
    console.log(
      `Error creating new Contract for Customer ID: ${newContract.universal_id}`,
      error
    );
    return error;
  }
}

export async function createAddress(newAddress) {
  console.log("Creating new Address = ", newAddress);
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAddress),
  };

  try {
    const response = await fetch(`${baseUrl}/address`, options);
    const data = await response.json();
    console.log("Address Create Response: ", data);
    return data;
  } catch (error) {
    console.log(
      `Error creating new Address for Customer ID: ${newAddress.universal_id}`,
      error
    );
    return error;
  }
}

export async function createPhone(newPhone) {
  console.log("Creating new Phone = ", newPhone);
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPhone),
  };

  try {
    const response = await fetch(`${baseUrl}/phone`, options);
    const data = await response.json();
    console.log("Phone Create Response: ", data);
    return data;
  } catch (error) {
    console.log(
      `Error creating new Phone for Customer ID: ${newPhone.universal_id}`,
      error
    );
    return error;
  }
}

export async function createEmail(newEmail) {
  console.log("Creating new Email = ", newEmail);
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEmail),
  };

  try {
    const response = await fetch(`${baseUrl}/email`, options);
    const data = await response.json();
    console.log("Email Create Response: ", data);
    return data;
  } catch (error) {
    console.log(
      `Error creating new Email for Customer ID: ${newEmail.universal_id}`,
      error
    );
    return error;
  }
}

export async function getAllActiveCustomers() {
  console.log("Loading All Active Customers from API");
  const response = await fetch(`${baseUrl}/customer`);
  const data = await response.json();

  if (data.message) {
    return { message: data.message, customers: null };
  }

  return { customers: data, message: "" };
}

export async function getCustomerById(universalId) {
  const response = await fetch(`${baseUrl}/customer/${universalId}`);
  const data = await response.json();
  if (data.message) {
    return { message: data.message, customer: null };
  }
  return { customer: data, message: "" };
}

export async function getContractsByCustomerId(universalId) {
  const response = await fetch(`${baseUrl}/customer/${universalId}/contract`);
  const data = await response.json();
  if (data.message) {
    return { message: data.message, customer: null };
  }
  return { contracts: data, message: "" };
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
    console.log(
      `Customer (universalId: ${universalId}) Update Response: `,
      data
    );
    return data;
  } catch (error) {
    console.log(
      `Error updating Customer (universalId: ${universalId}): `,
      error
    );
    return error;
  }
}

export async function updateAddressById(address) {
  console.log("Updating Address: ", address);
  const id = address.id;
  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  };

  try {
    const response = await fetch(`${baseUrl}/address/${id}`, options);
    const data = await response.json();
    console.log(`Address (id: ${id}) Update Response: `, data);
    return data;
  } catch (error) {
    console.log(`Error updating Address (id: ${id}): `, error);
    return error;
  }
}

export async function updatePhoneById(phone) {
  console.log("Updating Phone: ", phone);
  const id = phone.id;
  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(phone),
  };

  try {
    const response = await fetch(`${baseUrl}/phone/${id}`, options);
    const data = await response.json();
    console.log(`Phone (id: ${id}) Update Response: `, data);
    return data;
  } catch (error) {
    console.log(`Error updating Phone (id: ${id}): `, error);
    return error;
  }
}

export async function updateEmailById(email) {
  console.log("Updating Email: ", email);
  const id = email.id;
  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  };

  try {
    const response = await fetch(`${baseUrl}/email/${id}`, options);
    const data = await response.json();
    console.log(`Email (id: ${id}) Update Response: `, data);
    return data;
  } catch (error) {
    console.log(`Error updating Email (id: ${id}): `, error);
    return error;
  }
}

export async function updateContractByContractNum(contract) {
  console.log("Updating Contract: ", contract);
  const id = contract.contract_num;
  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contract),
  };

  try {
    const response = await fetch(`${baseUrl}/contract/${id}`, options);
    const data = await response.json();
    console.log(`Contract (id: ${id}) Update Response: `, data);
    return data;
  } catch (error) {
    console.log(`Error updating Contract (id: ${id}): `, error);
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
    return data;
  } catch (error) {
    console.log(
      `Error deleting Customer (universalId: ${universalId}): `,
      error
    );
    return error;
  }
}
