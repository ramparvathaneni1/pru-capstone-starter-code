module.exports = function (dao) {

  this.deactivateCustomerById = async (req, res) => {
    const universalId = parseInt(req.params.id);
    const updateResults = await dao.deactivateCustomerById(universalId);

    // Handle DB Errors
    if (updateResults.error) {
      res.status(500).json({
        message: `Error occurred while deactivating Customer with ID ${universalId}`,
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
    res.status(200).json({
      message: `Successfully Deactivated Customer (ID: ${universalId})`
    });
    return;
  };

  this.deactivateContractByContractNum = async (req, res) => {
    const contractNum = parseInt(req.params.id);
    const updateResults = await dao.deactivateContractByContractNum(contractNum);
    // Handle DB Errors
    if (updateResults.error) {
      res.status(500).json({
        message: `Error occurred while deactivating Contract with Contract Number ${contractNum}`,
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
    res.status(200).json({
      message: `Successfully Deactivated Contract (ID: ${contractNum})`
    });
    return;
  };

  this.deleteAddressById = async (req, res) => {
    const id = parseInt(req.params.id);
    const deleteResult = await dao.deleteAddressById(id);
    // Handle DB Errors
    if (deleteResult.error) {
      res.status(500).json({
        message: `Error occurred while deleting Address with ID ${id}`,
      });
      return;
    }
    // Handle Address Not Found
    if (deleteResult.rowCount <= 0) {
      res.status(404).json({
        message: `Address with ID ${id} Not Found.`,
      });
      return;
    }
    res.status(200).json({
      message: `Successfully Deleted Address (ID: ${id})`
    });
    return;
  };

  this.deleteEmailById = async (req, res) => {
    const id = parseInt(req.params.id);
    const deleteResult = await dao.deleteEmailById(id);
    // Handle DB Errors
    if (deleteResult.error) {
      res.status(500).json({
        message: `Error occurred while deleting Email with ID ${id}`,
      });
      return;
    }
    // Handle Email Not Found
    if (deleteResult.rowCount <= 0) {
      res.status(404).json({
        message: `Email with ID ${id} Not Found.`,
      });
      return;
    }
    res.status(200).json({
      message: `Successfully Deleted Email (ID: ${id})`
    });
    return;
  };

  this.deletePhoneById = async (req, res) => {
    const id = parseInt(req.params.id);
    const deleteResult = await dao.deletePhoneById(id);
    // Handle DB Errors
    if (deleteResult.error) {
      res.status(500).json({
        message: `Error occurred while deleting Phone with ID ${id}`,
      });
      return;
    }
    // Handle Phone Not Found
    if (deleteResult.rowCount <= 0) {
      res.status(404).json({
        message: `Phone with ID ${id} Not Found.`,
      });
      return;
    }
    res.status(200).json({
      message: `Successfully Deleted Phone (ID: ${id})`
    });
    return;
  }

};