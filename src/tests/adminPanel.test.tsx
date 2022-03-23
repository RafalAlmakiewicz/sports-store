import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import TestApp from "./testApp";
import testProducts from "./testProducts";
import testToken from "./testToken";
import { getAxiosMock, setDefaultHandlers } from "./createAxiosMock";

const { queryByText, getAllByTestId, findByRole, getByRole, findByText } =
  screen;

localStorage.setItem("token", testToken);

describe("admin pamel", () => {
  let deletefirstProductButton: HTMLElement;
  beforeEach(async () => {
    await act(async () => {
      render(<TestApp path={["/admin"]} />);
    });
    deletefirstProductButton = getAllByTestId("delete")[0];
  });

  it("should delete product", async () => {
    getAxiosMock()
      .onDelete(/products\/p1/i)
      .reply(200, testProducts.slice(1));
    userEvent.click(deletefirstProductButton);
    await waitFor(() => {
      expect(queryByText(/goggles/i)).toBeNull();
    });
  });

  it("navigates to product update form", async () => {
    const updateFirstProductButton = getAllByTestId("update")[0];
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
    userEvent.click(deletefirstProductButton);
    expect(await findByText("internal server error")).toBeInTheDocument();
    setDefaultHandlers();
  });
});
