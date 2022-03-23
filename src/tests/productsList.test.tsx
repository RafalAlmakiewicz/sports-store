import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import Products from "../components/products";
import TestApp from "./testApp";

const {
  getByRole,
  getByText,
  queryByText,
  getAllByText,
  getByPlaceholderText,
  getByDisplayValue,
  getByLabelText,
  getByAltText,
} = screen;

describe("filters sidebar functionalities", () => {
  beforeEach(async () => {
    await act(async () => {
      render(<TestApp />);
    });
  });

  it("displays products", async () => {
    expect(getByText(/goggles/i)).toBeInTheDocument();
    expect(getByText(/barbell/i)).toBeInTheDocument();
    expect(getByText("10$")).toBeInTheDocument();
    expect(getByText("200$")).toBeInTheDocument();
  });

  it("filters products after typing in search bar", () => {
    userEvent.type(getByPlaceholderText(/search/i), "ell");
    expect(queryByText(/goggles/i)).toBeNull();
    expect(getByText(/barbell/i)).toBeInTheDocument();
  });

  it("filters products after choosing activity", () => {
    userEvent.selectOptions(getByDisplayValue(/all activities/i), "swimming");
    expect(getByText(/goggles/i)).toBeInTheDocument();
    expect(queryByText(/barbell/i)).toBeNull();
  });

  it("filters products after choosing minimum price", () => {
    userEvent.type(getByLabelText(/min/i), "100");
    expect(queryByText(/goggles/i)).toBeNull();
    expect(getByText(/barbell/i)).toBeInTheDocument();
  });

  it("filters products after choosing maximum price", () => {
    userEvent.type(getByLabelText(/max/i), "100");
    expect(getByText(/goggles/i)).toBeInTheDocument();
    expect(queryByText(/barbell/i)).toBeNull();
  });

  it("sorts products by price ascending", () => {
    userEvent.selectOptions(getByLabelText(/sort by/i), "price");
    let prices = getAllByText(/\$/).map((p) => p.textContent);
    expect(JSON.stringify(prices)).toMatch(/.*10.*50.*100.*200.*/i);
  });

  it("sorts products by name descending", () => {
    userEvent.click(getByLabelText(/descending/i));
    let names = getAllByText(/prod-name/i).map((p) => p.textContent);
    expect(JSON.stringify(names.map((n) => n?.split(" ")[1]))).toMatch(
      /.*trunks.*goggles.*dumbbells.*barbell.*/i
    );
  });

  it("shows details after clicking product image", () => {
    userEvent.click(getByAltText(/goggles/i));
    expect(getByText(/description of goggles/i)).toBeInTheDocument();
  });
});

describe("change page navigation", () => {
  it("navigates to second page", async () => {
    await act(async () => {
      render(
        <TestApp>
          <Products pageSize={3} />
        </TestApp>
      );
    });
    expect(queryByText(/trunks/i)).toBeNull();
    const page2Button = getByRole("button", { name: "2" });
    userEvent.click(page2Button);
    expect(getByText(/trunks/i)).toBeInTheDocument();
  });
});
