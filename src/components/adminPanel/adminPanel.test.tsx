import {
  render,
  screen,
  waitFor,
  getByLabelText,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import TestApp from "../../testUtils/testApp";
import testToken from "../../testUtils/testToken";
import {
  getAxiosMock,
  setDefaultHandlers,
} from "../../testUtils/createAxiosMock";

const { findByRole, getByRole, findByText, queryByRole } = screen;

localStorage.setItem("token", testToken);

describe("admin panel", () => {
  let firstProduct: HTMLElement;
  let deleteFirstProductButton: HTMLElement;
  let updateFirstProductButton: HTMLElement;

  beforeEach(async () => {
    await act(async () => {
      render(<TestApp path={["/admin"]} />);
    });
    firstProduct = getByRole("row", {
      name: /prod-name goggles 10.00\$ 20 Swimming/i,
    });
    deleteFirstProductButton = getByLabelText(firstProduct, "delete product");
    updateFirstProductButton = getByLabelText(firstProduct, "update product");
  });

  it("should delete product", async () => {
    getAxiosMock()
      .onDelete(/products\/p1/i)
      .reply(200);
    userEvent.click(deleteFirstProductButton);
    fireEvent.animationEnd(firstProduct);
    await waitFor(() => {
      expect(
        queryByRole("row", {
          name: /prod-name goggles 10.00\$ 20 Swimming/i,
        })
      ).toBeNull();
    });
  });

  it("navigates to product update form", async () => {
    userEvent.click(updateFirstProductButton);
    await findByRole("heading", { name: /update product/i });
  });

  it("navigates to product create form", async () => {
    userEvent.click(getByRole("link", { name: /new item/i }));
    await findByRole("heading", { name: /create product/i });
  });

  it("displays 500 error", async () => {
    getAxiosMock().resetHandlers();
    getAxiosMock().onDelete().replyOnce(500, "internal server error");
    userEvent.click(deleteFirstProductButton);
    fireEvent.animationEnd(firstProduct);
    expect(await findByText("internal server error")).toBeInTheDocument();
    setDefaultHandlers();
  });
});
