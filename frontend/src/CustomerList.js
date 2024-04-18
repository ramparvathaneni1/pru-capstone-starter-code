import { Link, useNavigate } from "react-router-dom";

export default function CustomerList({ customers, message }) {
  const navigate = useNavigate();

  return (
    <>
      <h2>All Active Customers</h2>
      {message ? (
        <p role="note">{message}</p>
      ) : (
        <div>
          <table className="customer-list">
            <thead>
              <tr>
                <th>Universal ID</th>
                <th>CIS ID</th>
                <th className="name">Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.universal_id}>
                  <td className="universal-id">
                    <center>{customer.universal_id}</center>
                  </td>
                  <td className="cis-id">
                    <center>{customer.cis_id}</center>
                  </td>
                  <td className="name">
                    {customer.is_org
                      ? `${customer.org_name} (Org)`
                      : `${customer.first_name} ${customer.middle_name} ${customer.last_name}`}
                  </td>
                  <td className="viewedit">
                    <center>
                      <Link to={"/customers/" + customer.universal_id}>
                        <button className="view-btn">View / Edit</button>
                      </Link>
                    </center>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="form-inline">
            <button
              className="add-btn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                navigate("/customers/new");
              }}
            >
              Add Customer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
