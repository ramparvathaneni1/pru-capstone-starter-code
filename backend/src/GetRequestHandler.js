module.exports = function (dao) {
  this.getAllCustomers = async (req, res) => {
    const customersResult = await dao.getAllCustomers();

    if (customersResult.error) {
      res.status(500).json({
        message: `Error occurred while fetching Customers.`,
      });
      return;
    }

    if (customersResult.data && customersResult.data.length <= 0) {
      res.status(404).json({
        message: `Customers Not Found.`,
      });
      return;
    }

    res.status(200).json(customersResult.data);
    return;
  };

  this.getCustomerDetailsById = async (req, res) => {
    const universalId = parseInt(req.params.id);

    // Get Customer By ID
    const customerResults = await dao.getCustomerById(universalId);
    // Handle DB Errors
    if (customerResults.error) {
      res.status(500).json({
        message: `Error occurred while fetching Customer with ID ${universalId}`,
      });
      return;
    }
    // Handle Customer Not Found
    if (customerResults.data && customerResults.data.length <= 0) {
      res.status(404).json({
        message: `Active Customer with ID ${universalId} Not Found.`,
      });
      return;
    }
    const customer = customerResults.data[0];

    // Fetch Address Data
    const addressResults = await dao.getAddressesByCustomerId(universalId);
    // Handle DB Errors
    if (addressResults.error) {
      console.log(`Error occurred while fetching Addresses for Customer ID ${universalId}`);
    }
    // Handle Addresses Not Found
    if (addressResults.data && addressResults.data.length <= 0) {
      console.log(`Addresses for Customer ID ${universalId} Not Found.`);
    }
    const addresses = addressResults && addressResults.data || [];

    // Fetch Phone Data
    const phoneResults = await dao.getPhonesByCustomerId(universalId);
    // Handle DB Errors
    if (phoneResults.error) {
      console.log(`Error occurred while fetching Phones for Customer ID ${universalId}`);
    }
    // Handle Phones Not Found
    if (phoneResults.data && phoneResults.data.length <= 0) {
      console.log(`Phones for Customer ID ${universalId} Not Found.`);
    }
    const phones = phoneResults && phoneResults.data || [];

    // Fetch Email Data
    const emailResults = await dao.getEmailsByCustomerId(universalId);
    // Handle DB Errors
    if (emailResults.error) {
      console.log(`Error occurred while fetching Emails for Customer ID ${universalId}`);
    }
    // Handle Emails Not Found
    if (emailResults.data && emailResults.data.length <= 0) {
      console.log(`Emails for Customer ID ${universalId} Not Found.`);
    }
    const emails = emailResults && emailResults.data || [];

    // Combine all data to make Customer Details Object
    customer.addresses = addresses;
    customer.phones = phones;
    customer.emails = emails;
    res.status(200).json(customer);
    return;
  };

  this.getContractByContractNum = async (req, res) => {
    const contractNum = parseInt(req.params.id);

    // Get Contract By Contract Number
    const contractResults = await dao.getContractByContractNum(contractNum);
    //Handle DB Errors
    if (contractResults.error) {
      res.status(500).json({
        message: `Error occurred while fetching Contract with Contract Number: ${contractNum}`,
      });
      return;
    }
    // Handle Contracts Not Found
    if (contractResults.data && contractResults.data.length <= 0) {
      res.status(404).json({
        message: `Contracts with Contract Number ${contractNum} Not Found.`,
      });
      return;
    }

    res.status(200).json(contractResults.data[0]);
    return;
  };

  this.getAddressById = async (req, res) => {
    const id = parseInt(req.params.id);

    // Get Address By ID
    const results = await dao.getAddressById(id);
    //Handle DB Errors
    if (results.error) {
      res.status(500).json({
        message: `Error occurred while fetching Address with ID: ${id}`,
      });
      return;
    }
    // Handle Address Not Found
    if (results.data && results.data.length <= 0) {
      res.status(404).json({
        message: `Address with ID ${id} Not Found.`,
      });
      return;
    }

    res.status(200).json(results.data[0]);
    return;
  };

  this.getPhoneById = async (req, res) => {
    const id = parseInt(req.params.id);

    // Get Email By ID
    const results = await dao.getEmailById(id);
    //Handle DB Errors
    if (results.error) {
      res.status(500).json({
        message: `Error occurred while fetching Email with ID: ${id}`,
      });
      return;
    }
    // Handle Email Not Found
    if (results.data && results.data.length <= 0) {
      res.status(404).json({
        message: `Email with ID ${id} Not Found.`,
      });
      return;
    }

    res.status(200).json(results.data[0]);
    return;
  };

  this.getEmailById = async (req, res) => {
    const id = parseInt(req.params.id);

    // Get Phone By ID
    const results = await dao.getPhoneById(id);
    //Handle DB Errors
    if (results.error) {
      res.status(500).json({
        message: `Error occurred while fetching Phone with ID: ${id}`,
      });
      return;
    }
    // Handle Phone Not Found
    if (results.data && results.data.length <= 0) {
      res.status(404).json({
        message: `Phone with ID ${id} Not Found.`,
      });
      return;
    }

    res.status(200).json(results.data[0]);
    return;
  };

  this.getContractsByCustomerId = async (req, res) => {
    const universalId = parseInt(req.params.id);

    // Get Contracts By Customer ID
    const contractResults = await dao.getContractsByCustomerId(universalId);
    //Handle DB Errors
    if (contractResults.error) {
      res.status(500).json({
        message: `Error occurred while fetching Contracts for Customer ID ${universalId}`,
      });
      return;
    }
    // Handle Contracts Not Found
    if (contractResults.data && contractResults.data.length <= 0) {
      res.status(404).json({
        message: `Active Contracts for Customer ID ${universalId} Not Found.`,
      });
      return;
    }

    res.status(200).json(contractResults.data);
    return;
  };
};
