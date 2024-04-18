import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
  getContractsByCustomerId
} from "./customer_api";

export default function CustomerDetail({
  handleDeleteCustomer,
  handleUpdateCustomer,
}) {
  const { id } = useParams();
  console.log("id = ", id);
  const [customer, setCustomer] = useState(null);
  const [customerToUpdate, setCustomerToUpdate] = useState(customer);
  const [message, setMessage] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // GET Customer By ID from API
  async function getCustomer(id) {
    const response = await getCustomerById(id);
    setCustomer(response.customer);
    setMessage(response.message);
    setCustomerToUpdate(response.customer);
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
  const handleEditBtnClick = (event) => {
    event.preventDefault();
    setEditMode(!isEditMode);
  };

  // Handle Reset/Cancel Button click
  const handleResetBtnClick = async (event, isCancel) => {
    event.target.form.reset();
    setCustomerToUpdate(customer);
    setEditMode(!isEditMode);
    if (isCancel) {
      navigate("/customers");
    }
  };

  // Toggle the Edit Mode, before sending the form data for Update API.
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setEditMode(!isEditMode);
    await updateCustomerById(customerToUpdate);
    await getCustomer(id);
    handleUpdateCustomer(event);
  };

  // Get Customer to delete and send to API
  const handleDeleteBtnClick = async (event) => {
    event.preventDefault();
    const response = await deleteCustomerById(customerToUpdate);
    console.log("Delete Customer Response = ", response);
    handleDeleteCustomer(event);
  };

  // OnChange of each field, update the Customer Object
  const handleOnChangeFormField = async (event, fieldName) => {
    const value = event.target.value;
    const updateObj = { ...customerToUpdate };
    updateObj[fieldName] = value;
    setCustomerToUpdate(updateObj);
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
        <CustomerForm
          customerToUpdate={customerToUpdate}
          isEditMode={isEditMode}
          getHeading={getHeading}
          handleFormSubmit={handleFormSubmit}
          handleOnChangeFormField={handleOnChangeFormField}
          handleEditBtnClick={handleEditBtnClick}
          handleResetBtnClick={handleResetBtnClick}
          handleDeleteBtnClick={handleDeleteBtnClick} ></CustomerForm>
          <ContractForm></ContractForm>
          </>
      )}
    </>
  );
}

function CustomerForm({customerToUpdate, isEditMode, getHeading, handleFormSubmit, handleOnChangeFormField, handleEditBtnClick, handleResetBtnClick, handleDeleteBtnClick}) {
  if (!customerToUpdate) {
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
}

function ContractForm() {
  const { id } = useParams();
  const [contracts, setContracts] = useState(null);

  async function getContractsByUnivlId(id) {
    const response = await getContractsByCustomerId(id);
    setContracts(response.contracts || null);
  }

  useEffect(() => {
    getContractsByUnivlId(id);
  }, [id]);

  if (!contracts || contracts.length <= 0) {
    return <></>;
  }
  return (
    <>
      <h3>Contracts</h3>
      <form name="contract-form">
        {contracts.map((contract, index) => {
          return (
            <div key={`contract-wrapper-${index}`}>
              <div className="form-inline" key={`contract-div-${index}`}>
                <label>
                  Contract Number
                  <br />
                  <input type="text"
                    name={`contract-${index}-num`}
                    defaultValue={contract.contract_num}
                    disabled={true}
                  />
                </label>
                <label>
                  LOB Code
                  <br />
                  <input type="text"
                    name={`contract-${index}-lob-code`}
                    defaultValue={contract.line_of_business_code}
                    disabled={true}
                  />
                </label>
                <label>
                  Company Code
                  <br />
                  <input type="text"
                    name={`contract-${index}-company-code`}
                    defaultValue={contract.company_code}
                    disabled={true}
                  />
                </label>
                <label>
                  Product Code
                  <br />
                  <input type="text"
                    name={`contract-${index}-product-code`}
                    defaultValue={contract.product_code}
                    disabled={true}
                  />
                </label>
                <label>
                  Issue Date
                  <br />
                  <input type="text"
                    name={`contract-${index}-issue-date`}
                    defaultValue={contract.issue_date ? contract.issue_date.split("T")[0] : ""}
                    disabled={true}
                  />
                </label>
                <label>
                  Effective Date
                  <br />
                  <input type="text"
                    name={`contract-${index}-effective-date`}
                    defaultValue={contract.effective_date ? contract.effective_date.split("T")[0] : ""}
                    disabled={true}
                  />
                </label>
                <label>
                  Termination Date
                  <br />
                  <input type="text"
                    name={`contract-${index}-termination-date`}
                    defaultValue={contract.termination_date ? contract.termination_date.split("T")[0] : ""}
                    disabled={true}
                  />
                </label>
              </div>
              <br/>
            </div>
          );
        })}
      </form>
    </>
  );
}
