import { Link } from "react-router-dom";

export default function CustomerList({ customers, message }) {
  return (
    <>
      <h2>All Active Customers</h2>
      {message ? (
        <p role="note">{message}</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Universal ID</th>
                <th>CIS ID</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>View / Edit</th>
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
                  <td className="dob">{customer.dob.split("T")[0]}</td>
                  <td className="viewedit">
                    <center>
                      <Link to={"/customers/" + customer.universal_id}>
                        <em>View/Edit</em>
                      </Link>
                    </center>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
