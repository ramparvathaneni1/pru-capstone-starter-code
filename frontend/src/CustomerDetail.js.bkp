import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCustomerById,
  updateCustomerById,
  updateAddressById,
  updatePhoneById,
  updateEmailById,
  deleteCustomerById,
} from "./customer_api";

export default function CustomerDetail({handleDeleteCustomer}) {
  const { id } = useParams();
  console.log("id = ", id);
  // const [customerData, setCustomer] = useState({});
  const [customerToUpdate, setCustomerToUpdate] = useState(null);
  const [message, setMessage] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  

  // GET Customer By ID from API
  async function getCustomer(id) {
    const { customer, message } = await getCustomerById(id);
    setCustomerToUpdate(customer);
    setMessage(message);
  }

  useEffect(() => {
    getCustomer(id);
  }, [id]);

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

  // Handle OnChange Form Fields
  const handleOnChangeFormFields = async (event, fieldName) => {
    const updateObj = {...customerToUpdate};
    let [rootLevelField, index, field] = fieldName.split(".");
    const value = field && (field === "zip" || field === "phone_ext") ? parseInt(event.target.value) : event.target.value;

    index = index ? parseInt(index) : null;
    
    if (field) {
      updateObj[rootLevelField][parseInt(index)][field] = value;
    } else {
      updateObj[rootLevelField] = value;
    }
    
    setCustomerToUpdate(updateObj);
  };

  // Toggle the Edit Mode, before sending the form data for Update API.
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    handleEditBtnToggle(event);
    await updateCustomerById(customerToUpdate);
    await getCustomer(id);
  };

  // Get Customer to delete and send to API
  const handleDeleteBtnClick = async (event) => {
    event.preventDefault();
    const {message} = await deleteCustomerById(customerToUpdate);
    console.log("Delete Customer Response = ", message);
    handleDeleteCustomer(event);
  };

  const loadForm = () => {
    if (customerToUpdate) {
      console.log("customerToUpdate = ", customerToUpdate);
      return (
        <>
          <h2>{getHeading()}</h2>
          <form name="customer-edit-form" onSubmit={(e) => handleFormSubmit(e)}>
            <div className="form-inline">
              <button onClick={(e) => handleEditBtnToggle(e)}>{!isEditMode ? "Edit" : "Cancel"}</button>
              <button className="delete-btn" onClick={(e) => handleDeleteBtnClick(e)}>Delete</button>
              <button className="submit-btn" type="submit">Submit</button>
            </div>
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
                  onChange={(e) => handleOnChangeFormFields(e, "cis_id")}
                  disabled={!isEditMode}
                />
              </label>
            </div>
            {!customerToUpdate.is_org ? (
              <>
                <div className="form-inline">
                  <label htmlFor="first-name">
                    First Name
                    <br />
                    <input
                      type="text"
                      name="first-name"
                      defaultValue={customerToUpdate.first_name}
                      onChange={(e) => handleOnChangeFormFields(e, "first_name")}
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
                      onChange={(e) => handleOnChangeFormFields(e, "middle_name")}
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
                      onChange={(e) => handleOnChangeFormFields(e, "last_name")}
                      disabled={!isEditMode}
                    />
                  </label>
                </div>
              </>
            ) : (
              <>
                <div className="form-inline">
                  <label htmlFor="org-name">
                    Org Name
                    <br />
                    <input
                      type="text"
                      name="org-name"
                      defaultValue={customerToUpdate.org_name}
                      onChange={(e) => handleOnChangeFormFields(e, "org_name")}
                      disabled={!isEditMode}
                    />
                  </label>
                </div>
              </>
            )}

            <div className="form-inline">
              <label htmlFor="gender">
                Gender
                <br />
                <select
                  name="gender"
                  defaultValue={customerToUpdate.gender}
                  onChange={(e) => handleOnChangeFormFields(e, "gender")}
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
                  defaultValue={customerToUpdate.marital_status}
                  onChange={(e) => handleOnChangeFormFields(e, "marital_status")}
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
                  onChange={(e) => handleOnChangeFormFields(e, "dob")}
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
                    <div key={`addr-wrapper-${index}`}>
                      <div className="form-inline" key={`addr-div-${index}`}>
                        <label
                          htmlFor={`addr-${index}-type`}
                          key={`addr-${index}-type`}
                        >
                          Type
                          <br />
                          <select
                            name={`addr-${index}-type`}
                            defaultValue={address.type}
                            onChange={(e) => handleOnChangeFormFields(e, `addresses.${index}.type`)}
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
                            onChange={(e) => handleOnChangeFormFields(e, `addresses.${index}.addr_line_1`)}
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
                            onChange={(e) => handleOnChangeFormFields(e, `addresses.${index}.addr_line_2`)}
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
                            onChange={(e) => handleOnChangeFormFields(e, `addresses.${index}.city`)}
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
                            onChange={(e) => handleOnChangeFormFields(e, `addresses.${index}.state`)}
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
                            onChange={(e) => handleOnChangeFormFields(e, `addresses.${index}.zip`)}
                            disabled={!isEditMode}
                          />
                        </label>
                      </div>
                      <br key={`addr-break-${index}`} />
                    </div>
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
                    <div key={`phone-wrapper-${index}`}>
                      <div className="form-inline" key={`phone-div-${index}`}>
                        <label htmlFor={`phone-${index}-type`}>
                          Type
                          <br />
                          <select
                            name={`phone-${index}-type`}
                            defaultValue={phone.type}
                            onChange={(e) => handleOnChangeFormFields(e, `phones.${index}.type`)}
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
                            onChange={(e) => handleOnChangeFormFields(e, `phones.${index}.phone_num`)}
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
                            onChange={(e) => handleOnChangeFormFields(e, `phones.${index}.phone_ext`)}
                            disabled={!isEditMode}
                          />
                        </label>
                      </div>
                      <br key={`phone-break-${index}`} />
                    </div>
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
                    <div key={`email-wrapper-${index}`}>
                      <div className="form-inline" key={`email-div-${index}`}>
                        <label htmlFor={`email-${index}-type`}>
                          Type
                          <br />
                          <select
                            name={`email-${index}-type`}
                            defaultValue={email.type}
                            onChange={(e) => handleOnChangeFormFields(e, `emails.${index}.type`)}
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
                            onChange={(e) => handleOnChangeFormFields(e, `emails.${index}.email`)}
                            disabled={!isEditMode}
                          />
                        </label>
                      </div>
                      <br key={`email-break-${index}`} />
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </form>
        </>
      );
    }
    return <p>Loading...</p>;
  };

  return (
    <>
      {message ? (
        <>
          <h2>Customer Details</h2>
          <p>{message}</p>
        </>
      ) : (
        loadForm()
      )}
    </>
  );
}
