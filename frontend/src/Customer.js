import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Customer({
  customer,
  message,
  deleteCustomer,
  updateCustomer,
}) {
  const [customerToUpdate, setCustomerToUpdate] = useState(customer);
  const [apiMsg, setApiMsg] = useState(message);
  const [isEditMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setCustomerToUpdate(customer);
  }, [customer]);

  // Event Handlers
  // Edit Button Click: Reset Form and Set Edit Mode to True
  const handleEditBtnClick = (event) => {
    event.preventDefault();
    event.target.form.reset();
    setEditMode(true);
  };

  // Reset/Cancel Button Click: Reset Form, Reset customerToUpdate and Set Edit Mode to False
  const handleResetBtnClick = (event, isCancel) => {
    event.preventDefault();
    event.target.form.reset();
    setCustomerToUpdate(customer);
    setEditMode(false);

    if (isCancel) {
      navigate("/customers");
    }
  };
  
  // OnChange of each field, update the Customer Object
  const handleOnChangeFormField = async (event, fieldName) => {
    const value = event.target.value;
    const updateObj = { ...customerToUpdate };
    updateObj[fieldName] = value;
    setCustomerToUpdate(updateObj);
  };

  // Handle Delete Customer
  const handleDeleteBtnClick = (event) => {
    event.preventDefault();
    event.target.form.reset();
    setEditMode(false);
    deleteCustomer(event);
  }

  // Handle Submit Button Click
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setEditMode(false);
    updateCustomer(event, customerToUpdate);
  };

  // Rendering Helpers
  const getFullName = () => {
    console.log("customerToUpdate", customerToUpdate);
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

  const renderOrgNameField = () => {
    return (
      <>
        <div className="form-inline">
          <label htmlFor="org-name">
            Org Name
            <br />
            <input
              type="text"
              name="org-name"
              defaultValue={customerToUpdate.org_name}
              onChange={(e) => handleOnChangeFormField(e, "org_name")}
              disabled={!isEditMode}
            />
          </label>
        </div>
      </>
    );
  };

  const renderCustomerNameFields = () => {
    return (
      <>
        <div className="form-inline">
          <label htmlFor="first-name">
            First Name
            <br />
            <input
              type="text"
              name="first-name"
              defaultValue={customerToUpdate.first_name}
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
              defaultValue={customerToUpdate.middle_name}
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
              defaultValue={customerToUpdate.last_name}
              onChange={(e) => handleOnChangeFormField(e, "last_name")}
              disabled={!isEditMode}
            />
          </label>
        </div>
      </>
    );
  };

  const renderInactiveFlag = () => {
    return (
      <span className="inactive">DELETED</span>
    );
  }

  if (apiMsg || !customer || !customerToUpdate) {
    return (
      <>
        <h2>Customer Details</h2>
        <p>Unable to load customer details</p>
        <p>{apiMsg}</p>
      </>
    );
  }

  return (
    <>
      <h3>{getFullName()} {!customerToUpdate.is_active ? renderInactiveFlag() : ""}</h3>
      <form name="customer-edit-form" onSubmit={(e) => handleFormSubmit(e)}>
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
              onChange={(e) => handleOnChangeFormField(e, "cis_id")}
              disabled={!isEditMode}
            />
          </label>
        </div>
        {!customerToUpdate.is_org
          ? renderCustomerNameFields()
          : renderOrgNameField()}

        <div className="form-inline">
          <label htmlFor="gender">
            Gender
            <br />
            <select
              name="gender"
              defaultValue={customerToUpdate.gender}
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
              defaultValue={customerToUpdate.marital_status}
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
                customerToUpdate.dob ? customerToUpdate.dob.split("T")[0] : ""
              }
              onChange={(e) => handleOnChangeFormField(e, "dob")}
              disabled={!isEditMode}
            />
          </label>
        </div>
        <div className="form-inline">
          {!isEditMode ? (
            <button
              type="button"
              className="edit-btn"
              disabled={!customerToUpdate.is_active}
              onClick={(e) => handleEditBtnClick(e)}
            >
              Edit
            </button>
          ) : (
            <button
              type="reset"
              className="reset-btn"
              onClick={(e) => handleResetBtnClick(e, false)}
            >
              Reset
            </button>
          )}
          <button type="reset" onClick={(e) => handleResetBtnClick(e, true)}>
            Back
          </button>
          <button className="primary" type="submit" disabled={!isEditMode || !customerToUpdate.is_active}>
            Submit
          </button>
          <button className="delete" disabled={!customerToUpdate.is_active} onClick={(e) => handleDeleteBtnClick(e)}>
            Delete
          </button>
        </div>
      </form>
    </>
  );
}
