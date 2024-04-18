import { useNavigate } from "react-router-dom";
import { createCustomer, createContract, createAddress, createPhone, createEmail } from "./customer_api";

export default function LoadCustomers({handleAddCustomer}) {

  const testData = `{ "cis_id": "CIS_900", "first_name": "Test A", "middle_name": "", "last_name": "Person 1", "is_org": false, "org_name": "", "gender": "Male", "marital_status": "Married", "dob": "1980-01-01T00:00:00.000Z", "pref_address_type": "HOME", "pref_phone_type": "WORK", "pref_email_type": "WORK", "pref_language": "ENGLISH", "is_active": true, "addresses": [ { "type": "HOME", "addr_line_1": "57058 Homewood Way", "addr_line_2": "Apt 1277", "city": "Brockton", "state": "MA", "zip": 2405, "privacy_code": 1 }, { "type": "WORK", "addr_line_1": "43662 Corscot Park", "addr_line_2": "Apt 160", "city": "Birmingham", "state": "AL", "zip": 35254, "privacy_code": 3 } ], "phones": [ { "type": "HOME", "phone_num": "5754121760", "phone_ext": null, "privacy_code": 1 }, { "type": "WORK", "phone_num": "6336927470", "phone_ext": 410, "privacy_code": 3 } ], "emails": [ { "type": "HOME", "email": "john.doe@email.com", "privacy_code": 1 }, { "type": "WORK", "email": "john.doe@pru.com", "privacy_code": 3 } ], "contracts": [ { "line_of_business_code": "GI", "company_code": "UMB", "product_code": "GI101", "issue_date": "2010-01-01T05:00:00.000Z", "effective_date": "2010-01-01T05:00:00.000Z", "termination_date": null, "is_active": true }, { "line_of_business_code": "GI", "company_code": "UMB", "product_code": "GI102", "issue_date": "2010-01-01T05:00:00.000Z", "effective_date": "2010-01-01T05:00:00.000Z", "termination_date": null, "is_active": true } ] }
{ "cis_id": "CIS_901", "first_name": "Test B", "middle_name": "", "last_name": "Person 2", "is_org": false, "org_name": "", "gender": "Male", "marital_status": "Married", "dob": "1980-01-01T00:00:00.000Z", "pref_address_type": "HOME", "pref_phone_type": "WORK", "pref_email_type": "WORK", "pref_language": "ENGLISH", "is_active": true, "addresses": [ { "type": "HOME", "addr_line_1": "57058 Homewood Way", "addr_line_2": "Apt 1277", "city": "Brockton", "state": "MA", "zip": 2405, "privacy_code": 1 }, { "type": "WORK", "addr_line_1": "43662 Corscot Park", "addr_line_2": "Apt 160", "city": "Birmingham", "state": "AL", "zip": 35254, "privacy_code": 3 } ], "phones": [ { "type": "HOME", "phone_num": 5754121760, "phone_ext": null, "privacy_code": 1 }, { "type": "WORK", "phone_num": 6336927470, "phone_ext": 410, "privacy_code": 3 } ], "emails": [ { "type": "HOME", "email": "john.doe@email.com", "privacy_code": 1 }, { "type": "WORK", "email": "john.doe@pru.com", "privacy_code": 3 } ], "contracts": [ { "line_of_business_code": "GI", "company_code": "UMB", "product_code": "GI101", "issue_date": "2010-01-01T05:00:00.000Z", "effective_date": "2010-01-01T05:00:00.000Z", "termination_date": null, "is_active": true }, { "line_of_business_code": "GI", "company_code": "UMB", "product_code": "GI102", "issue_date": "2010-01-01T05:00:00.000Z", "effective_date": "2010-01-01T05:00:00.000Z", "termination_date": null, "is_active": true } ] }
{ "cis_id": "CIS_902", "first_name": "Test C", "middle_name": "", "last_name": "Person 3", "is_org": false, "org_name": "", "gender": "Male", "marital_status": "Married", "dob": "1980-01-01T00:00:00.000Z", "pref_address_type": "HOME", "pref_phone_type": "WORK", "pref_email_type": "WORK", "pref_language": "ENGLISH", "is_active": true, "addresses": [ { "type": "HOME", "addr_line_1": "57058 Homewood Way", "addr_line_2": "Apt 1277", "city": "Brockton", "state": "MA", "zip": 2405, "privacy_code": 1 }, { "type": "WORK", "addr_line_1": "43662 Corscot Park", "addr_line_2": "Apt 160", "city": "Birmingham", "state": "AL", "zip": 35254, "privacy_code": 3 } ], "phones": [ { "type": "HOME", "phone_num": 5754121760, "phone_ext": null, "privacy_code": 1 }, { "type": "WORK", "phone_num": 6336927470, "phone_ext": 410, "privacy_code": 3 } ], "emails": [ { "type": "HOME", "email": "john.doe@email.com", "privacy_code": 1 }, { "type": "WORK", "email": "john.doe@pru.com", "privacy_code": 3 } ], "contracts": [ { "line_of_business_code": "GI", "company_code": "UMB", "product_code": "GI101", "issue_date": "2010-01-01T05:00:00.000Z", "effective_date": "2010-01-01T05:00:00.000Z", "termination_date": null, "is_active": true }, { "line_of_business_code": "GI", "company_code": "UMB", "product_code": "GI102", "issue_date": "2010-01-01T05:00:00.000Z", "effective_date": "2010-01-01T05:00:00.000Z", "termination_date": null, "is_active": true } ] }
{ "cis_id": "CIS_903", "first_name": "Test D", "middle_name": "", "last_name": "Person 4", "is_org": false, "org_name": "", "gender": "Male", "marital_status": "Married", "dob": "1980-01-01T00:00:00.000Z", "pref_address_type": "HOME", "pref_phone_type": "WORK", "pref_email_type": "WORK", "pref_language": "ENGLISH", "is_active": true, "addresses": [ { "type": "HOME", "addr_line_1": "57058 Homewood Way", "addr_line_2": "Apt 1277", "city": "Brockton", "state": "MA", "zip": 2405, "privacy_code": 1 }, { "type": "WORK", "addr_line_1": "43662 Corscot Park", "addr_line_2": "Apt 160", "city": "Birmingham", "state": "AL", "zip": 35254, "privacy_code": 3 } ], "phones": [ { "type": "HOME", "phone_num": 5754121760, "phone_ext": null, "privacy_code": 1 }, { "type": "WORK", "phone_num": 6336927470, "phone_ext": 410, "privacy_code": 3 } ], "emails": [ { "type": "HOME", "email": "john.doe@email.com", "privacy_code": 1 }, { "type": "WORK", "email": "john.doe@pru.com", "privacy_code": 3 } ], "contracts": [ { "line_of_business_code": "GI", "company_code": "UMB", "product_code": "GI101", "issue_date": "2010-01-01T05:00:00.000Z", "effective_date": "2010-01-01T05:00:00.000Z", "termination_date": null, "is_active": true }, { "line_of_business_code": "GI", "company_code": "UMB", "product_code": "GI102", "issue_date": "2010-01-01T05:00:00.000Z", "effective_date": "2010-01-01T05:00:00.000Z", "termination_date": null, "is_active": true } ] }
{ "cis_id": "CIS_904", "first_name": "Test E", "middle_name": "", "last_name": "Person 5", "is_org": false, "org_name": "", "gender": "Male", "marital_status": "Married", "dob": "1980-01-01T00:00:00.000Z", "pref_address_type": "HOME", "pref_phone_type": "WORK", "pref_email_type": "WORK", "pref_language": "ENGLISH", "is_active": true, "addresses": [ { "type": "HOME", "addr_line_1": "57058 Homewood Way", "addr_line_2": "Apt 1277", "city": "Brockton", "state": "MA", "zip": 2405, "privacy_code": 1 }, { "type": "WORK", "addr_line_1": "43662 Corscot Park", "addr_line_2": "Apt 160", "city": "Birmingham", "state": "AL", "zip": 35254, "privacy_code": 3 } ], "phones": [ { "type": "HOME", "phone_num": 5754121760, "phone_ext": null, "privacy_code": 1 }, { "type": "WORK", "phone_num": 6336927470, "phone_ext": 410, "privacy_code": 3 } ], "emails": [ { "type": "HOME", "email": "john.doe@email.com", "privacy_code": 1 }, { "type": "WORK", "email": "john.doe@pru.com", "privacy_code": 3 } ], "contracts": [ { "line_of_business_code": "GI", "company_code": "UMB", "product_code": "GI101", "issue_date": "2010-01-01T05:00:00.000Z", "effective_date": "2010-01-01T05:00:00.000Z", "termination_date": null, "is_active": true }, { "line_of_business_code": "GI", "company_code": "UMB", "product_code": "GI102", "issue_date": "2010-01-01T05:00:00.000Z", "effective_date": "2010-01-01T05:00:00.000Z", "termination_date": null, "is_active": true } ] }`;
  
const navigate = useNavigate();

  const handleBackBtnClick = (event) => {
    event.preventDefault();
    event.target.form.reset();
    navigate("/customers");
  };

  const loadCustomerData = async (line) => {
    if (!line) {
      return;
    }
    const customerDetails = JSON.parse(line);
    const addresses = customerDetails.addresses || [];
    const phones = customerDetails.phones || [];
    const emails = customerDetails.emails || [];
    const contracts = customerDetails.contracts || [];

    const customer = {...customerDetails};
    delete customer.addresses;
    delete customer.phones;
    delete customer.emails;
    delete customer.contracts;

    const customerResponse = await createCustomer(customer);
    if (!customerResponse.newCustomer) {
      console.log("Unable to create Customer = ", customer);
      return;
    }

    const universalId = customerResponse.newCustomer.universal_id;
    console.log("New Customer Universal ID = ", universalId);

    contracts.forEach(async (contract) => {
      if (!contract) {
        return;
      }
      contract.universal_id = universalId;
      const resp = await createContract(contract);
      console.log("contract resp = ", resp);
    });

    addresses.forEach(async (address) => {
      if (!address) {
        return;
      }
      address.universal_id = universalId;
      const resp = await createAddress(address);
      console.log("address resp = ", resp);
    });

    phones.forEach(async (phone) => {
      if (!phone) {
        return;
      }
      phone.universal_id = universalId;
      const resp = await createPhone(phone);
      console.log("phone resp = ", resp);
    });

    emails.forEach(async (email) => {
      if (!email) {
        return;
      }
      email.universal_id = universalId;
      const resp = await createEmail(email);
      console.log("email resp = ", resp);
    });
  };

  const handleLoadCustomer = async (event) => {
    event.preventDefault();
    const allLines = event.target.data.value;
    // console.log("jsonl = ", jsonl);

    const lineArr = allLines.replace(/\r\n/g, "\n").split("\n");

    await lineArr.forEach(async (line, index) => {
      console.log(index + ": " + line);
      await loadCustomerData(line.trim());
    });

    handleAddCustomer(event);
  };

  return (
    <>
      <h2>Load Customers from JSONL File</h2>
      <form name="load-customers-form" onSubmit={handleLoadCustomer}>
        <div className="data-wrapper">
          <textarea name="data" placeholder="Customer Data in JSONL format" defaultValue={testData}></textarea>
        </div>
        <div className="form-inline">
          <button type="reset">Reset</button>
          <button type="reset" onClick={handleBackBtnClick}>Back</button>
          <button type="submit" className="primary">Load</button>
        </div>
      </form>
    </>
  );
  
}