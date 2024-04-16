# Prudential Customer API (MEF Capstone Project)

## Background and Inspiration
Various sources feed Contract and Constituent data into Prudential through Admin Systems, with the primary aggregator being the IBM Mainframe known as Client Information System (CIS).
CIS processes, normalizes, and masters this data, generating Customer and Contract records for dissemination to requesting Business Units, applying filters as needed.

The Customer Domain Data Gateway (CDDG) and Customer Domain Microservices (CDMS) Projects are endeavors to modernize the Client Information System by leveraging AWS and Spring technologies. This initiative aims to enhance maintainability, scalability, performance, and interoperability with other applications within Prudential. Upon completion, the project is expected to catalyze a transformative shift in how Prudential serves its customers.

## MEF Capstone Project
While the complexity of real Customer Domain projects (CDDG and CDMS) surpasses this endeavor, I draw inspiration from them to develop a CRUD Application for Customer Data utilizing Express, React, and Postgres. 

For instance, Admin Systems provide Contract information inclusive of Constituent data.
- Based on pre-defined business rules, CIS, may or may not transition every Constituent into a Customer.
- Each Contract record encompasses multiple Constituents, and each Constituent can be linked to multiple Contracts.
- Additionally, multiple Constituent records can merge into a single Customer record (e.g., Jane Smith associated with one Contract in a given Admin System may correspond to Jane Doe in another Contract within a different Admin System).

***Unlike real Customer Domain projects, this simplified CRUD Application does not address such intricacies, maintaining focus on simplicity and functionality.***

## Entities and Relationships
- **Customer**
  - The main entity in this application representing a Customer.
  - Primary Key = `universal_id`

- **Contract**
  - Entity representing a Contract Object
  - Primary Key = `contract_num`
  - Foreign Key = `customer.univeral_id`

- **Address**, **Phone** and **Email**
  - Entities representing Addresses, Phones and Emails associated with a **Customer**.
  - Primary Key = `id`
  - Foreign Key = `customer.universal_id`

## API
- POST, GET, PUT and DELETE Requests are provided through an Express.
- [Postman Collection](./assets/MEF%20Ram%20P%20Pru%20Customer%20API.postman_collection.json) is attached.

