import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
} from "./customer_api";

export default function CustomerDetail({ handleDeleteCustomer, handleUpdateCustomer }) {
  const { id } = useParams();
  console.log("id = ", id);
  const [customer, setCustomer] = useState(null);
  const [message, setMessage] = useState(null);
  const [isEditMode, setEditMode] = useState(false);

  // GET Customer By ID from API
  async function getCustomer(id) {
    const response = await getCustomerById(id);
    setCustomer(response.customer);
    setMessage(response.message);
  }

  useEffect(() => {
    getCustomer(id);
  }, [id]);

  // Make Heading from Org Name or Customer's Name
  const getHeading = () => {
    if (!customer) {
      return "";
    }

    if (customer.is_org) {
      return customer.org_name + " (Org)";
    } else if (customer.middle_name) {
      return (
        customer.first_name +
        " " +
        customer.middle_name +
        " " +
        customer.last_name
      );
    } else {
      return customer.first_name + " " + customer.last_name;
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
    await updateCustomerById(customer);
    await getCustomer(id);
    handleUpdateCustomer(event);
  };

  // Get Customer to delete and send to API
  const handleDeleteBtnClick = async (event) => {
    event.preventDefault();
    const response = await deleteCustomerById(customer);
    console.log("Delete Customer Response = ", response);
    handleDeleteCustomer(event);
  };

  // OnChange of each field, update the Customer Object
  const handleOnChangeFormField = async (event, fieldName) => {
    const value = event.target.value;
    const updateObj = { ...customer };
    updateObj[fieldName] = value;
    setCustomer(updateObj);
  };

  const loadCustomerForm = () => {
    if (!customer) {
      return <p>Loading...</p>;
    }
    return (
      <>
        <h2>{getHeading()}</h2>
        <form name="customer-edit-form" onSubmit={(e) => handleFormSubmit(e)}>
          <div className="form-inline">
            <label htmlFor="universal-id">
              Universal ID
              <br />
              <input
                type="text"
                name="universal-id"
                defaultValue={customer.universal_id}
                disabled={true}
              />
            </label>
            <label htmlFor="cis-id">
              CIS ID
              <br />
              <input
                type="text"
                name="cis-id"
                defaultValue={customer.cis_id}
                onChange={(e) => handleOnChangeFormField(e, "cis_id")}
                disabled={!isEditMode}
              />
            </label>
          </div>
          {!customer.is_org ? (
            <>
              <div className="form-inline">
                <label htmlFor="first-name">
                  First Name
                  <br />
                  <input
                    type="text"
                    name="first-name"
                    defaultValue={customer.first_name}
                    onChange={(e) => handleOnChangeFormField(e, "first_name")}
                    disabled={!isEditMode}
                  />
                </label>
                <label htmlFor="middle-name">
                  Middle Name
                  <br />
                  <input
                    type="text"
                    name="middle-name"
                    defaultValue={customer.middle_name}
                    onChange={(e) => handleOnChangeFormField(e, "middle_name")}
                    disabled={!isEditMode}
                  />
                </label>
                <label htmlFor="last-name">
                  Last Name
                  <br />
                  <input
                    type="text"
                    name="last-name"
                    defaultValue={customer.last_name}
                    onChange={(e) => handleOnChangeFormField(e, "last_name")}
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
                    defaultValue={customer.org_name}
                    onChange={(e) => handleOnChangeFormField(e, "org_name")}
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
                defaultValue={customer.gender}
                onChange={(e) => handleOnChangeFormField(e, "gender")}
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
                defaultValue={customer.marital_status}
                onChange={(e) => handleOnChangeFormField(e, "marital_status")}
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
                  customer.dob ? customer.dob.split("T")[0] : ""
                }
                onChange={(e) => handleOnChangeFormField(e, "dob")}
                disabled={!isEditMode}
              />
            </label>
          </div>
          <div className="form-inline">
            <button onClick={(e) => handleEditBtnToggle(e)}>
              {!isEditMode ? "Edit" : "Cancel"}
            </button>
            <button className="submit-btn" type="submit" disabled={!isEditMode}>
              Submit
            </button>
            <button
              className="delete-btn"
              onClick={(e) => handleDeleteBtnClick(e)}
            >
              Delete
            </button>
          </div>
        </form>
      </>
    );
  };

  return (
    <>
      {message ? (
        <>
          <h2>Customer Details</h2>
          <p>{message}</p>
        </>
      ) : (
        loadCustomerForm()
      )}
    </>
  );
}
