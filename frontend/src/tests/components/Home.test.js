import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../../Home";

describe("Testing Home Component", () => {
  beforeAll(() => {
    render(<Home />, { wrapper: BrowserRouter });
  });
  test("should load search box and button", () => {
    const searchBox = screen.getByRole("textbox");
    expect(searchBox).toBeTruthy();

    const searchBtn = screen.getByRole("button");
    expect(searchBtn).toHaveTextContent("Go");
  });
});
