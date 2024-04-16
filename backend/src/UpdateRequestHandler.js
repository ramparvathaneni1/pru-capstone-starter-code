module.exports = function (dao) {
  this.updateCustomerById = async (req, res) => {
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
        message: `Customer with ID ${universalId} Not Found.`,
      });
      return;
    }
    const customer = customerResults.data[0];

    // Build Update Request
    const itemToUpdate = { ...customer, ...req.body };
    const params = [
      universalId,
      itemToUpdate.cis_id,
      itemToUpdate.first_name,
      itemToUpdate.last_name,
      itemToUpdate.middle_name,
      itemToUpdate.org_name,
      itemToUpdate.is_org,
      itemToUpdate.gender,
      itemToUpdate.marital_status,
      itemToUpdate.dob,
      itemToUpdate.pref_address_type,
      itemToUpdate.pref_phone_type,
      itemToUpdate.pref_email_type,
      itemToUpdate.pref_language,
      itemToUpdate.is_active,
    ];

    // Update Customer
    const updateResults = await dao.updateCustomerById(params);
    // Handle DB Errors
    if (updateResults.error) {
      res.status(500).json({
        message: `Error occurred while updating Customer with ID ${universalId}`,
      });
      return;
    }
    // Handle Customer Not Found
    if (updateResults.data && updateResults.data.length <= 0) {
      res.status(404).json({
        message: `Customer with ID ${universalId} Not Found.`,
      });
      return;
    }
    const updatedCustomer = updateResults.data[0];
    res.status(200).json({
      message: `Successfully Updated Customer (ID: ${universalId})`,
      updatedCustomer,
    });
    return;
  };

  this.updateContractByContractNum = async (req, res) => {
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

    const contract = contractResults.data[0];

    // Build Update Request
    const itemToUpdate = { ...contract, ...req.body };
    const params = [
      contractNum,
      itemToUpdate.line_of_business_code,
      itemToUpdate.company_code,
      itemToUpdate.product_code,
      itemToUpdate.effective_date,
      itemToUpdate.issue_date,
      itemToUpdate.termination_date,
      itemToUpdate.universal_id,
      itemToUpdate.is_active,
    ];

    // Update Contract
    const updateResults = await dao.updateContractByContractNum(params);
    // Handle DB Errors
    if (updateResults.error) {
      res.status(500).json({
        message: `Error occurred while updating Contract with Contract Number ${contractNum}`,
      });
      return;
    }
    // Handle Contract Not Found
    if (updateResults.data && updateResults.data.length <= 0) {
      res.status(404).json({
        message: `Contract with Contract Number ${contractNum} Not Found.`,
      });
      return;
    }
    const updatedContract = updateResults.data[0];
    res.status(200).json({
      message: `Successfully Updated Contract (ID: ${contractNum})`,
      updatedContract,
    });
    return;
  };

  this.updateAddressById = async (req, res) => {
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

    const address = results.data[0];

    // Build Update Request
    const itemToUpdate = { ...address, ...req.body };
    const params = [
      id,
      itemToUpdate.universal_id,
      itemToUpdate.type,
      itemToUpdate.addr_line_1,
      itemToUpdate.addr_line_2,
      itemToUpdate.city,
      itemToUpdate.state,
      itemToUpdate.zip,
      itemToUpdate.privacy_code,
    ];

    // Update Address
    const updateResults = await dao.updateAddressById(params);
    // Handle DB Errors
    if (updateResults.error) {
      res.status(500).json({
        message: `Error occurred while updating Address (ID: ${id}).`,
      });
      return;
    }
    // Handle Address Not Found
    if (updateResults.data && updateResults.data.length <= 0) {
      res.status(404).json({
        message: `Address with ID: ${id} Not Found.`,
      });
      return;
    }
    const updatedAddress = updateResults.data[0];
    res.status(200).json({
      message: `Successfully Updated Address (ID: ${id})`,
      updatedAddress,
    });
    return;
  };

  this.updatePhoneById = async (req, res) => {
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

    const phone = results.data[0];

    // Build Update Request
    const itemToUpdate = { ...phone, ...req.body };
    const params = [
      id,
      itemToUpdate.universal_id,
      itemToUpdate.type,
      itemToUpdate.phone_num,
      itemToUpdate.phone_ext,
      itemToUpdate.privacy_code,
    ];

    // Update Phone
    const updateResults = await dao.updatePhoneById(params);
    // Handle DB Errors
    if (updateResults.error) {
      res.status(500).json({
        message: `Error occurred while updating Phone (ID: ${id}).`,
      });
      return;
    }
    // Handle Phone Not Found
    if (updateResults.data && updateResults.data.length <= 0) {
      res.status(404).json({
        message: `Phone with ID: ${id} Not Found.`,
      });
      return;
    }
    const updatedPhone = updateResults.data[0];
    res.status(200).json({
      message: `Successfully Updated Phone (ID: ${id})`,
      updatedPhone,
    });
    return;
  };

  this.updateEmailById = async (req, res) => {
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

    const email = results.data[0];

    // Build Update Request
    const itemToUpdate = { ...email, ...req.body };
    const params = [
      id,
      itemToUpdate.universal_id,
      itemToUpdate.type,
      itemToUpdate.email,
      itemToUpdate.privacy_code,
    ];

    // Update Email
    const updateResults = await dao.updateEmailById(params);
    // Handle DB Errors
    if (updateResults.error) {
      res.status(500).json({
        message: `Error occurred while updating Email (ID: ${id}).`,
      });
      return;
    }
    // Handle Email Not Found
    if (updateResults.data && updateResults.data.length <= 0) {
      res.status(404).json({
        message: `Email with ID: ${id} Not Found.`,
      });
      return;
    }
    const updatedEmail = updateResults.data[0];
    res.status(200).json({
      message: `Successfully Updated Email (ID: ${id})`,
      updatedEmail,
    });
    return;
  };
};
