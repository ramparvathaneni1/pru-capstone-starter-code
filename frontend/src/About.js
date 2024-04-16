export default function About() {
  return (
    <>
      <h2 id="background-and-inspiration">Background and Inspiration</h2>
      <p>
        Various sources feed Contract and Constituent data into Prudential
        through Admin Systems, with the primary aggregator being the IBM
        Mainframe known as Client Information System (CIS). CIS processes,
        normalizes, and masters this data, generating Customer and Contract
        records for dissemination to requesting Business Units, applying filters
        as needed.
      </p>
      <p>
        The Customer Domain Data Gateway (CDDG) and Customer Domain
        Microservices (CDMS) Projects are endeavors to modernize the Client
        Information System by leveraging AWS and Spring technologies. This
        initiative aims to enhance maintainability, scalability, performance,
        and interoperability with other applications within Prudential. Upon
        completion, the project is expected to catalyze a transformative shift
        in how Prudential serves its customers.
      </p>
      <h2 id="mef-capstone-project">MEF Capstone Project</h2>
      <p>
        While the complexity of real Customer Domain projects (CDDG and CDMS)
        surpasses this endeavor, I draw inspiration from them to develop a CRUD
        Application for Customer Data utilizing Express, React, and Postgres.
      </p>
      <p>
        For instance, Admin Systems provide Contract information inclusive of
        Constituent data.
      </p>
      <ul>
        <li>
          Based on pre-defined business rules, CIS, may or may not transition
          every Constituent into a Customer.
        </li>
        <li>
          Each Contract record encompasses multiple Constituents, and each
          Constituent can be linked to multiple Contracts.
        </li>
        <li>
          Additionally, multiple Constituent records can merge into a single
          Customer record (e.g., Jane Smith associated with one Contract in a
          given Admin System may correspond to Jane Doe in another Contract
          within a different Admin System).
        </li>
      </ul>
      <p>
        <strong>
          <em>
            Unlike real Customer Domain projects, this simplified CRUD
            Application does not address such intricacies, maintaining focus on
            simplicity and functionality.
          </em>
        </strong>
      </p>
      <h2 id="entities-and-relationships">Entities and Relationships</h2>
      <ul>
        <li>
          <p>
            <strong>Customer</strong>
          </p>
          <ul>
            <li>
              The main entity in this application representing a Customer.
            </li>
            <li>
              Primary Key = <code>universal_id</code>
            </li>
          </ul>
        </li>
        <li>
          <p>
            <strong>Contract</strong>
          </p>
          <ul>
            <li>Entity representing a Contract Object</li>
            <li>
              Primary Key = <code>contract_num</code>
            </li>
            <li>
              Foreign Key = <code>customer.universal_id</code>
            </li>
          </ul>
        </li>
        <li>
          <p>
            <strong>Address</strong>, <strong>Phone</strong> and
            <strong>Email</strong>
          </p>
          <ul>
            <li>
              Entities representing Addresses, Phones and Emails associated with
              a <strong>Customer</strong>.
            </li>
            <li>
              Primary Key = <code>id</code>
            </li>
            <li>
              Foreign Key = <code>customer.universal_id</code>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
}
