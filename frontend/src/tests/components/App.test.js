import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../../App";

describe("Testing App Component", () => {
  beforeAll(() => {
    render(<App />, { wrapper: BrowserRouter });
  });

  test("should display heading", () => {
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("Prudential Customer Gateway");
  });

  test("should display navigation", () => {
    const navItemArr = screen.queryAllByRole("listitem");
    const expectedNavArr = ["Home", "View All", "Add Customer", "About"];

    for (let navItem of navItemArr) {
      expect(expectedNavArr).toContain(navItem.textContent);
    }
  });
});
