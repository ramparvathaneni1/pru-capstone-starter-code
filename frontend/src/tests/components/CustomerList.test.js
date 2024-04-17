import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CustomerList from "../../CustomerList";

const customerArr = [
  {
    universal_id: 1000,
    cis_id: "TEST_123",
    first_name: "Test1",
    last_name: "Person1",
    middle_name: "M",
    org_name: "",
    gender: "M",
    marital_status: "Married",
    dob: "1990-01-01",
    is_org: false,
    pref_address_type: "HOME",
    pref_phone_type: "HOME",
    pref_email_type: "HOME",
    pref_language: "ENGLISH",
  },
  {
    universal_id: 1001,
    cis_id: "TEST_124",
    first_name: "Test2",
    last_name: "Person2",
    middle_name: "M",
    org_name: "",
    gender: "M",
    marital_status: "Married",
    dob: "1990-01-01",
    is_org: false,
    pref_address_type: "HOME",
    pref_phone_type: "HOME",
    pref_email_type: "HOME",
    pref_language: "ENGLISH",
  },
];

describe("Testing CustomerList Component", () => {
  test("should load component heading 'All Active Customers'", () => {
    render(<CustomerList customers={customerArr} message={""} />, {
      wrapper: BrowserRouter,
    });
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("All Active Customers");
  });

  test("should load a list of customers", () => {
    render(<CustomerList customers={customerArr} message={""} />, {
      wrapper: BrowserRouter,
    });
    const tableCellArr = screen.getAllByRole("cell");
    const actual = tableCellArr.filter(
      (tableCell) =>
        tableCell.textContent === "TEST_123" ||
        tableCell.textContent === "TEST_124"
    );
    expect(actual.length).toBe(2);
  });

  test("should say 'No Active Customers Found' when there are no customers", () => {
    render(<CustomerList customers={null} message={"No Active Customers Found"} />, {
      wrapper: BrowserRouter,
    });
    const pElem = screen.getByRole("note");
    expect(pElem).toHaveTextContent("No Active Customers Found");
  });
});
