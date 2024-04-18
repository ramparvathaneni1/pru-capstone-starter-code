export default function Contracts({
  contracts,
  contractMessage,
}) {
  const getDateStr = (isoDateStr) => {
    return isoDateStr ? isoDateStr.split("T")[0] : "";
  };

  if (contractMessage || !contracts || contracts.length <= 0) {
    return (
      <>
        <h3>Contracts</h3>
        <p>No Contracts Found</p>
      </>
    );
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
                  <input
                    type="text"
                    name={`contract-${index}-num`}
                    defaultValue={contract.contract_num}
                    disabled={true}
                  />
                </label>
                <label>
                  LOB Code
                  <br />
                  <input
                    type="text"
                    name={`contract-${index}-lob-code`}
                    defaultValue={contract.line_of_business_code}
                    disabled={true}
                  />
                </label>
                <label>
                  Company Code
                  <br />
                  <input
                    type="text"
                    name={`contract-${index}-company-code`}
                    defaultValue={contract.company_code}
                    disabled={true}
                  />
                </label>
                <label>
                  Product Code
                  <br />
                  <input
                    type="text"
                    name={`contract-${index}-product-code`}
                    defaultValue={contract.product_code}
                    disabled={true}
                  />
                </label>
                <label>
                  Issue Date
                  <br />
                  <input
                    type="text"
                    name={`contract-${index}-issue-date`}
                    defaultValue={getDateStr(contract.issue_date)}
                    disabled={true}
                  />
                </label>
                <label>
                  Effective Date
                  <br />
                  <input
                    type="text"
                    name={`contract-${index}-effective-date`}
                    defaultValue={getDateStr(contract.effective_date)}
                    disabled={true}
                  />
                </label>
                <label>
                  Termination Date
                  <br />
                  <input
                    type="text"
                    name={`contract-${index}-termination-date`}
                    defaultValue={getDateStr(contract.termination_date)}
                    disabled={true}
                  />
                </label>
              </div>
              <br />
            </div>
          );
        })}
      </form>
    </>
  );
}
