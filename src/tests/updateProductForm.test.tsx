import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import TestApp from "./testApp";
import testProducts from "./testProducts";
import testToken from "./testToken";
import { getAxiosMock, setDefaultHandlers } from "./createAxiosMock";

const { getByRole, findByText, getByLabelText, findByRole } = screen;

localStorage.setItem("token", testToken);

describe("update product form", () => {
  let nameInput: HTMLElement,
    priceInput: HTMLElement,
    stockInput: HTMLElement,
    activitySelect: HTMLElement,
    descriptionTextArea: HTMLElement,
    submitButton: HTMLElement;

  beforeEach(async () => {
    await act(async () => {
      render(<TestApp path={["/productForm/p1"]} />);
    });
    nameInput = getByLabelText(/name/i);
    priceInput = getByLabelText(/price/i);
    stockInput = getByLabelText(/stock/i);
    activitySelect = getByLabelText(/activity/i);
    descriptionTextArea = getByLabelText(/description/i);
    submitButton = getByRole("button", { name: /submit/i });
  });

  it("submit button is enabled", () => {
    expect(submitButton).toBeEnabled();
  });

  it("form is filled", () => {
    expect(nameInput).toHaveDisplayValue("prod-name goggles");
    expect(priceInput).toHaveDisplayValue("10");
    expect(stockInput).toHaveDisplayValue("20");
    expect(activitySelect).toHaveDisplayValue("Swimming");
    expect(descriptionTextArea).toHaveDisplayValue("description of goggles");
  });

  it("displays validation errors and disables submit button", async () => {
    userEvent.clear(nameInput);
    userEvent.click(submitButton);
    expect(await findByText(/name is required/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("updates product and redirect to admin panel", async () => {
    getAxiosMock()
      .onPut(/products\/p1/i)
      .reply(200, { ...testProducts[0], name: "updated name" });
    userEvent.type(nameInput, "updated name");
    userEvent.click(submitButton);
    expect(
      await findByRole("heading", { name: /admin panel/i })
    ).toBeInTheDocument();
    expect(
      getByRole("row", { name: "updated name 10 20 Swimming" })
    ).toBeInTheDocument();
  });

  it("displays 400 error", async () => {
    getAxiosMock().resetHandlers();
    getAxiosMock().onPut().replyOnce(400, "Bad request");
    userEvent.click(submitButton);
    expect(await findByText("Bad request")).toBeInTheDocument();
    setDefaultHandlers();
  });
});
