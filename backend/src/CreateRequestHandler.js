module.exports = function (dao) {
  this.createCustomer = async (req, res) => {
    const request = req.body;
    const is_orgStr = "" + request.is_org;
    if (
      !request ||
      !request.first_name ||
      !request.last_name ||
      !request.dob ||
      !request.cis_id ||
      !request.first_name ||
      is_orgStr === "undefined" ||
      is_orgStr === "null" ||
      (is_orgStr === "true" && !request.org_name)
    ) {
      console.error("Bad Request: Create Customer.");
      res.status(400).json({
        message: "Unable to create new Customer. Required fields missing.",
        requiredFields: [
          "cis_id",
          "first_name",
          "last_name",
          "dob",
          "is_org",
          "org_name (if 'is_org' is true)",
        ],
      });
      return;
    }

    const params = [
      request.cis_id,
      request.first_name,
      request.last_name,
      request.middle_name || "",
      request.is_org ? request.org_name : "",
      request.gender || "Unknown",
      request.marital_status || "Unknown",
      request.dob,
      request.is_org,
      request.pref_address_type || "HOME",
      request.pref_phone_type || "HOME",
      request.pref_email_type || "HOME",
      request.pref_language || "ENGLISH",
    ];
    const results = await dao.createCustomer(params);

    // Handle DB Errors
    if (results.error) {
      res.status(500).json({
        message: `Error occurred while creating Customer.`,
      });
      return;
    }
    const newCustomer = results.data[0];
    res.status(200).json({
      message: `Successfully Created Customer (ID: ${newCustomer.universal_id})`,
      newCustomer,
    });
    return;
  };

  this.createContract = async (req, res) => {
    const request = req.body;
    if (
      !request ||
      !request.line_of_business_code ||
      !request.company_code ||
      !request.product_code ||
      !request.effective_date ||
      !request.issue_date ||
      !request.universal_id
    ) {
      console.error("Bad Request: Create Contract.");
      res.status(400).json({
        message: "Unable to create new Contract. Required fields missing.",
        requiredFields: [
          "universal_id",
          "line_of_business_code",
          "company_code",
          "product_code",
          "effective_date",
          "issue_date",
        ],
      });
      return;
    }

    const params = [
      request.line_of_business_code,
      request.company_code,
      request.product_code,
      request.effective_date,
      request.issue_date,
      request.termination_date || null,
      request.universal_id,
    ];
    const results = await dao.createContract(params);

    // Handle DB Errors
    if (results.error) {
      res.status(500).json({
        message: `Error occurred while creating Contract.`,
      });
      return;
    }
    const newContract = results.data[0];
    res.status(200).json({
      message: `Successfully Created Contract (ID: ${newContract.contract_num})`,
      newContract,
    });
    return;
  };

  this.createAddress = async (req, res) => {
    const request = req.body;
    if (
      !request ||
      !request.universal_id ||
      !request.type ||
      !request.addr_line_1 ||
      !request.city ||
      !request.state ||
      !request.zip ||
      !request.privacy_code
    ) {
      console.error("Bad Request: Create Address.");
      res.status(400).json({
        message: "Unable to create new Address. Required fields missing.",
        requiredFields: [
          "universal_id",
          "type",
          "addr_line_1",
          "city",
          "state",
          "zip",
          "privacy_code",
        ],
      });
      return;
    }

    const params = [
      request.universal_id,
      request.type,
      request.addr_line_1,
      request.addr_line_2 || "",
      request.city,
      request.state,
      request.zip,
      request.privacy_code,
    ];
    const results = await dao.createAddress(params);

    // Handle DB Errors
    if (results.error) {
      res.status(500).json({
        message: `Error occurred while creating Address.`,
      });
      return;
    }
    const newAddress = results.data[0];
    res.status(200).json({
      message: `Successfully Created Address (ID: ${newAddress.id})`,
      newAddress,
    });
    return;
  };

  this.createPhone = async (req, res) => {
    const request = req.body;
    if (
      !request ||
      !request.type ||
      !request.phone_num ||
      !request.universal_id ||
      !request.privacy_code
    ) {
      console.error("Bad Request: Create Phone.");
      res.status(400).json({
        message: "Unable to create new Phone. Required fields missing.",
        requiredFields: ["type", "phone_num", "privacy_code", "universal_id"],
      });
      return;
    }

    const params = [
      request.universal_id,
      request.type,
      request.phone_num,
      request.phone_ext || "",
      request.privacy_code,
    ];
    const results = await dao.createPhone(params);

    // Handle DB Errors
    if (results.error) {
      res.status(500).json({
        message: `Error occurred while creating Phone.`,
      });
      return;
    }
    const newPhone = results.data[0];
    res.status(200).json({
      message: `Successfully Created Phone (ID: ${newPhone.id})`,
      newPhone,
    });
    return;
  };

  this.createEmail = async (req, res) => {
    const request = req.body;
    if (
      !request ||
      !request.type ||
      !request.email ||
      !request.universal_id ||
      !request.privacy_code
    ) {
      console.error("Bad Request: Create Email.");
      res.status(400).json({
        message: "Unable to create new Email. Required fields missing.",
        requiredFields: ["type", "email", "privacy_code", "universal_id"],
      });
      return;
    }

    const params = [
      request.universal_id,
      request.type,
      request.email,
      request.privacy_code,
    ];
    const results = await dao.createEmail(params);

    // Handle DB Errors
    if (results.error) {
      res.status(500).json({
        message: `Error occurred while creating Email.`,
      });
      return;
    }
    const newEmail = results.data[0];
    res.status(200).json({
      message: `Successfully Created Email (ID: ${newEmail.id})`,
      newEmail,
    });
    return;
  };
};
