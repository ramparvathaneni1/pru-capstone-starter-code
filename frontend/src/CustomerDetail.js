import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
} from "./customer_api";

export default function CustomerDetail() {
  const { id } = useParams();
  const [customerData, setCustomer] = useState({});
  const [customerToUpdate, setCustomerToUpdate] = useState({ ...customerData });
  const [message, setMessage] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // GET Customer By ID from API
  async function getCustomer() {
    const { customer, message } = await getCustomerById(id);
    setCustomer(customer);
    setMessage(message);
    setCustomerToUpdate({...customer});
  }

  useEffect(() => {
    getCustomer();
  }, [customerData]);

  // Make Heading from Org Name or Customer's Name
  const getHeading = () => {
    if (!customerToUpdate) {
      return "";
    }

    if (customerToUpdate.is_org) {
      return customerToUpdate.org_name + " (Org)";
    } else if (customerToUpdate.middle_name) {
      return (
        customerToUpdate.first_name +
        " " +
        customerToUpdate.middle_name +
        " " +
        customerToUpdate.last_name
      );
    } else {
      return customerToUpdate.first_name + " " + customerToUpdate.last_name;
    }
  };

  // Event Handlers
  // Toggle Edit Mode between Edit button and Cancel button
  const handleEditBtnToggle = (event) => {
    event.preventDefault();
    setEditMode(!isEditMode);
  };

  // Toggle the Edit Mode, before sending the form data for Update API.
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    handleEditBtnToggle(event);
    const { message, updatedCustomer } = await updateCustomerById(
      customerToUpdate
    );
    setCustomer(updatedCustomer);
    setMessage(message);
  };

  // Get Customer to delete and send to API
  const handleDeleteBtnClick = async (event) => {
    event.preventDefault();
    await deleteCustomerById(customerToUpdate);
    navigate("/customers");
  };

  return (
    <>
      {message ? (
        <>
          <h2>Customer Details</h2>
          <p>{message}</p>
        </>
      ) : (
        <>
          <h2>{getHeading()}</h2>
          <form name="customer-edit-form" onSubmit={handleFormSubmit}>
            <div className="form-inline">
              <label htmlFor="universal-id">
                Universal ID
                <br />
                <input
                  type="text"
                  name="universal-id"
                  defaultValue={customerToUpdate.universal_id}
                  disabled={true}
                />
              </label>
              <label htmlFor="cis-id">
                CIS ID
                <br />
                <input
                  type="text"
                  name="cis-id"
                  defaultValue={customerToUpdate.cis_id}
                  disabled={!isEditMode}
                />
              </label>
            </div>
            <div className="form-inline">
              <label htmlFor="first-name">
                First Name
                <br />
                <input
                  type="text"
                  name="first-name"
                  defaultValue={customerToUpdate.first_name}
                  disabled={!isEditMode}
                />
              </label>
              <label htmlFor="middle-name">
                Middle Name
                <br />
                <input
                  type="text"
                  name="middle-name"
                  defaultValue={customerToUpdate.middle_name}
                  disabled={!isEditMode}
                />
              </label>
              <label htmlFor="last-name">
                Last Name
                <br />
                <input
                  type="text"
                  name="last-name"
                  defaultValue={customerToUpdate.last_name}
                  disabled={!isEditMode}
                />
              </label>
            </div>
            <div className="form-inline">
              <label htmlFor="gender">
                Gender
                <br />
                <select
                  name="gender"
                  defaultValue={
                    customerToUpdate.gender
                      ? customerToUpdate.gender
                      : "Other"
                  }
                  disabled={!isEditMode}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label htmlFor="marital-status">
                Marital Status
                <br />
                <select
                  name="marital-status"
                  defaultValue={
                    customerToUpdate.marital_status
                      ? customerToUpdate.marital_status
                      : "Unknown"
                  }
                  disabled={!isEditMode}
                >
                  <option value="Married">Married</option>
                  <option value="Single">Single</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </label>
              <label htmlFor="dob">
                Date of Birth
                <br />
                <input
                  type="text"
                  name="dob"
                  defaultValue={
                    customerToUpdate.dob
                      ? customerToUpdate.dob.split("T")[0]
                      : ""
                  }
                  disabled={!isEditMode}
                />
              </label>
            </div>
            {customerToUpdate.addresses &&
            customerToUpdate.addresses.length > 0 ? (
              <>
                <h3>Addresses</h3>
                {customerToUpdate.addresses.map((address, index) => {
                  return (
                    <>
                      <div className="form-inline" key={`addr-div-${index}`}>
                        <label htmlFor={`addr-${index}-type`} key={`addr-${index}-type`}>
                          Type
                          <br />
                          <select
                            name={`addr-${index}-type`}
                            defaultValue={address.type}
                            disabled={!isEditMode}
                          >
                            <option value="HOME">Home</option>
                            <option value="WORK">Work</option>
                          </select>
                        </label>
                        <label htmlFor={`addr-${index}-addr-line-1`}>
                          Line 1
                          <br />
                          <input
                            type="text"
                            name={`addr-${index}-addr-line-1`}
                            defaultValue={address.addr_line_1}
                            disabled={!isEditMode}
                          />
                        </label>
                        <label htmlFor={`addr-${index}-addr-line-2`}>
                          Line 2
                          <br />
                          <input
                            type="text"
                            name={`addr-${index}-addr-line-2`}
                            defaultValue={address.addr_line_2}
                            disabled={!isEditMode}
                          />
                        </label>
                        <label htmlFor={`addr-${index}-city`}>
                          City
                          <br />
                          <input
                            type="text"
                            name={`addr-${index}-city`}
                            defaultValue={address.city}
                            disabled={!isEditMode}
                          />
                        </label>
                        <label htmlFor={`addr-${index}-state`}>
                          State
                          <br />
                          <input
                            type="text"
                            name={`addr-${index}-state`}
                            defaultValue={address.state}
                            disabled={!isEditMode}
                          />
                        </label>
                        <label htmlFor={`addr-${index}-zip`}>
                          Zip
                          <br />
                          <input
                            type="text"
                            name={`addr-${index}-zip`}
                            defaultValue={address.zip}
                            disabled={!isEditMode}
                          />
                        </label>
                      </div>
                      <br key={`addr-break-${index}`} />
                    </>
                  );
                })}
              </>
            ) : (
              <></>
            )}
            {customerToUpdate.phones && customerToUpdate.phones.length > 0 ? (
              <>
                <h3>Phones</h3>
                {customerToUpdate.phones.map((phone, index) => {
                  return (
                    <>
                      <div className="form-inline" key={`phone-div-${index}`}>
                        <label htmlFor={`phone-${index}-type`}>
                          Type
                          <br />
                          <select
                            name={`phone-${index}-type`}
                            defaultValue={phone.type}
                            disabled={!isEditMode}
                          >
                            <option value="HOME">Home</option>
                            <option value="WORK">Work</option>
                            <option value="MOBILE">Mobile</option>
                          </select>
                        </label>
                        <label htmlFor={`phone-${index}-phone-num`}>
                          Phone Number
                          <br />
                          <input
                            type="text"
                            name={`phone-${index}-phone-num`}
                            defaultValue={phone.phone_num}
                            disabled={!isEditMode}
                          />
                        </label>
                        <label htmlFor={`phone-${index}-phone-ext`}>
                          Extension
                          <br />
                          <input
                            type="text"
                            name={`phone-${index}-phone-ext`}
                            defaultValue={phone.phone_ext}
                            disabled={!isEditMode}
                          />
                        </label>
                      </div>
                      <br key={`phone-break-${index}`} />
                    </>
                  );
                })}
              </>
            ) : (
              <></>
            )}
            {customerToUpdate.emails && customerToUpdate.emails.length > 0 ? (
              <>
                <h3>Emails</h3>
                {customerToUpdate.emails.map((email, index) => {
                  return (
                    <>
                      <div className="form-inline" key={`email-div-${index}`}>
                        <label htmlFor={`email-${index}-type`}>
                          Type
                          <br />
                          <select
                            name={`email-${index}-type`}
                            defaultValue={email.type}
                            disabled={!isEditMode}
                          >
                            <option value="HOME">Home</option>
                            <option value="WORK">Work</option>
                          </select>
                        </label>
                        <label htmlFor={`email-${index}-email`}>
                          Email
                          <br />
                          <input
                            type="text"
                            name={`email-${index}-email`}
                            defaultValue={email.email}
                            disabled={!isEditMode}
                          />
                        </label>
                      </div>
                      <br key={`email-break-${index}`} />
                    </>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </form>
        </>
      )}
    </>
  );
}
