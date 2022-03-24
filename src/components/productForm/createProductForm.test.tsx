import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import TestApp from "../../testUtils/testApp";
import testToken from "../../testUtils/testToken";
import { getAxiosMock } from "../../testUtils/createAxiosMock";

const { getByRole, findByText, getByLabelText, findByRole, findAllByText } =
  screen;

localStorage.setItem("token", testToken);

describe("create product form", () => {
  let nameInput: HTMLElement,
    priceInput: HTMLElement,
    stockInput: HTMLElement,
    activitySelect: HTMLElement,
    descriptionTextArea: HTMLElement,
    submitButton: HTMLElement,
    formFields: HTMLElement[];

  beforeEach(async () => {
    await act(async () => {
      render(<TestApp path={["/productForm"]} />);
    });
    nameInput = getByLabelText(/name/i);
    priceInput = getByLabelText(/price/i);
    stockInput = getByLabelText(/stock/i);
    activitySelect = getByLabelText(/activity/i);
    descriptionTextArea = getByLabelText(/description/i);
    submitButton = getByRole("button", { name: /submit/i });
    formFields = [
      nameInput,
      priceInput,
      stockInput,
      activitySelect,
      descriptionTextArea,
    ];
  });

  it("submit button is disabled", () => {
    expect(submitButton).toBeDisabled();
  });

  it("all fields are empty or default", () => {
    formFields.forEach((element) =>
      expect(element).toHaveDisplayValue(/^$|^0$|^0.00$/)
    );
  });

  it("name, activity and description are required", async () => {
    [nameInput, activitySelect, descriptionTextArea].forEach((field) => {
      fireEvent.focus(field);
      fireEvent.blur(field);
    });
    expect(await findAllByText(/is required/i)).toHaveLength(3);
  });

  it("price is auto-formatted", async () => {
    userEvent.clear(priceInput);
    userEvent.type(priceInput, "1.999");
    userEvent.tab();
    await waitFor(() => {
      expect(priceInput).toHaveDisplayValue("2.00");
    });
  });

  it("price must be at least 0.01", async () => {
    userEvent.clear(priceInput);
    userEvent.type(priceInput, "-1");
    userEvent.tab();
    expect(
      await findByText(/price must be at least 0.01/i)
    ).toBeInTheDocument();
  });

  it("stock must be at least 0", async () => {
    userEvent.clear(stockInput);
    userEvent.type(stockInput, "-1");
    userEvent.tab();
    expect(await findByText(/stock must be at least 0/i)).toBeInTheDocument();
  });

  it("stock must be an integer", async () => {
    userEvent.type(stockInput, ".1");
    userEvent.tab();
    expect(await findByText(/stock must be an integer/i)).toBeInTheDocument();
  });

  it("creates product and redirects to admin panel", async () => {
    const product = {
      _id: "p5",
      name: "prod-name diving fins",
      price: 300,
      stock: 1,
      description: "description of diving fins",
      activity: {
        _id: "swimming",
        name: "Swimming",
      },
    };
    getAxiosMock()
      .onPost(/products/i)
      .reply(200, product);
    userEvent.type(nameInput, product.name);
    userEvent.clear(priceInput);
    userEvent.type(priceInput, product.price.toString());
    userEvent.type(stockInput, product.stock.toString());
    userEvent.selectOptions(activitySelect, product.activity.name);
    userEvent.type(descriptionTextArea, product.description);
    userEvent.tab();
    userEvent.click(submitButton);

    expect(
      await findByRole("heading", { name: /admin panel/i })
    ).toBeInTheDocument();
    expect(
      getByRole("row", { name: /diving fins 300 1 swimming/i })
    ).toBeInTheDocument();
  });
});
