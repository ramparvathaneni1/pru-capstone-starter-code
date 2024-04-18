import {createCustomer} from "./customer_api.js";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function AddCustomer({ handleAddCustomer }) {
  const blankCustomer = {gender: "Other",
  marital_status: "Unknown",
  is_org: false};
  const [customer, setCustomer] = useState(blankCustomer);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const navigate = useNavigate(); 

  console.log("disableSubmit = ", disableSubmit);

  // Toggle the Edit Mode, before sending the form data for Update API.
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await createCustomer(customer);
    handleAddCustomer(event);
  };

  // OnChange of each field, update the Customer Object
  const handleOnChangeFormField = async (event, fieldName) => {
    const value = fieldName === "is_org" ? event.target.checked : event.target.value;
    const createObj = { ...customer };
    createObj[fieldName] = value;
    setCustomer(createObj);
    toggleSubmitBtn();
  };

  // Handle Cancel Button click
  const handleFormReset = (event, isCancel) => {
    setCustomer(blankCustomer);
    setDisableSubmit(true);
    if (isCancel) {
      navigate("/customers");
    }
  }

  const toggleSubmitBtn = () => {
    console.log("customer.dob = ", customer.dob);
    let isFormValid = customer.dob && customer.cis_id;
    if (customer.is_org) {
      isFormValid = isFormValid && customer.org_name;
    } else {
      isFormValid = isFormValid && customer.first_name && customer.last_name;
    }
    setDisableSubmit(!isFormValid);
  };

  return (
    <>
      <h2>Add New Customer</h2>
      <form name="customer-edit-form" onSubmit={(e) => handleFormSubmit(e)}>
        <div className="form-inline">
          <label htmlFor="cis-id">
            CIS ID
            <br />
            <input
              type="text"
              name="cis-id"
              placeholder="CID ID"
              onChange={(e) => handleOnChangeFormField(e, "cis_id")}
            />
          </label>
          <label htmlFor="is-org">
            Is An Organization?
            <br />
            <input
              type="checkbox"
              name="is-org"
              defaultValue={customer.is_org}
              onChange={(e) => handleOnChangeFormField(e, "is_org")}
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
                  placeholder="First Name"
                  onChange={(e) => handleOnChangeFormField(e, "first_name")}
                />
              </label>
              <label htmlFor="middle-name">
                Middle Name
                <br />
                <input
                  type="text"
                  name="middle-name"
                  placeholder="Middle Name"
                  onChange={(e) => handleOnChangeFormField(e, "middle_name")}
                />
              </label>
              <label htmlFor="last-name">
                Last Name
                <br />
                <input
                  type="text"
                  name="last-name"
                  placeholder="Last Name"
                  onChange={(e) => handleOnChangeFormField(e, "last_name")}
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
                  className="org-name"
                  type="text"
                  name="org-name"
                  placeholder="Organization Name"
                  onChange={(e) => handleOnChangeFormField(e, "org_name")}
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
              placeholder="YYYY-MM-DD"
              onChange={(e) => handleOnChangeFormField(e, "dob")}
            />
          </label>
        </div>
        <div className="form-inline">
          <button className="reset-btn" type="reset" onClick={(e) => handleFormReset(e, false)}>Reset</button>
          <button className="cancel-btn" type="reset" onClick={(e) => handleFormReset(e, true)}>Cancel</button>
          <button className="primary" type="submit" disabled={disableSubmit}>Submit</button>
        </div>
      </form>
    </>
  );
}
