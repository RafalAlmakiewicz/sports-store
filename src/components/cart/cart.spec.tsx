import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import Cart from "./cart";
import testProducts from "../../testUtils/testProducts";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash, faEdit);

const { getByRole, getByText, getAllByRole, getAllByLabelText, queryByRole } =
  screen;

const testCartItems = testProducts.slice(0, 2).map((product) => {
  return {
    _id: product._id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    quantity: 1,
  };
});

localStorage.setItem("cart", JSON.stringify(testCartItems));

describe("cart", () => {
  let removeFromCartButtons: HTMLElement[],
    incrementQuantityButtons: HTMLElement[],
    gogglesAccessibleName = "prod-name goggles 10.00$ - 1 + 20 10.00$",
    barbellAccessiblename = "prod-name Barbell 200.00$ - 1 + 1 200.00$";

  beforeEach(async () => {
    await act(async () => {
      render(<Cart />);
    });
    removeFromCartButtons = getAllByLabelText("remove from cart");
    incrementQuantityButtons = getAllByRole("button", { name: "+" });
  });

  it("displays cart items from storage", () => {
    expect(
      getByRole("row", {
        name: gogglesAccessibleName,
      })
    ).toBeInTheDocument();
    expect(
      getByRole("row", {
        name: barbellAccessiblename,
      })
    ).toBeInTheDocument();
  });

  it("displays total price", () => {
    expect(getByText("210.00$")).toBeInTheDocument();
  });

  it("increments goggles quantity and updates total price", () => {
    userEvent.click(incrementQuantityButtons[0]);
    expect(getByText("20.00$")).toBeInTheDocument();
    expect(getByText("220.00$")).toBeInTheDocument();
  });

  it("can not increment quantity of barbells beyond what is in stock", () => {
    expect(incrementQuantityButtons[1]).toBeDisabled();
  });

  it("removes barbell from cart", async () => {
    userEvent.click(removeFromCartButtons[1]);
    fireEvent.animationEnd(getByRole("row", { name: barbellAccessiblename }));
    await waitFor(() => {
      expect(
        queryByRole("row", {
          name: barbellAccessiblename,
        })
      ).toBeNull();
    });
  });
});
