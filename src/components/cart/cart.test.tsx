import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import Cart from "./cart";
import testProducts from "../../testUtils/testProducts";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash, faEdit);

const { getByRole, getAllByTestId, getByText, getAllByRole, queryByRole } =
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
    incrementQuantityButtons: HTMLElement[];

  beforeEach(async () => {
    await act(async () => {
      render(<Cart />);
    });
    removeFromCartButtons = getAllByTestId("cart-delete");
    incrementQuantityButtons = getAllByRole("button", { name: "+" });
  });

  it("displays cart items from storage", async () => {
    expect(
      getByRole("row", {
        name: "prod-name goggles 10 - 1 + 20 10$",
      })
    ).toBeInTheDocument();
    expect(
      getByRole("row", {
        name: "prod-name Barbell 200 - 1 + 1 200$",
      })
    ).toBeInTheDocument();
  });

  it("displays total price", () => {
    expect(getByText("210$")).toBeInTheDocument();
  });

  it("increments goggles quantity and updates total price", () => {
    userEvent.click(incrementQuantityButtons[0]);
    expect(getByText("20$")).toBeInTheDocument();
    expect(getByText("220$")).toBeInTheDocument();
  });

  it("can not increment quantity of barbells beyond what is in stock", () => {
    expect(incrementQuantityButtons[1]).toBeDisabled();
  });

  it("removes barbell from cart", () => {
    userEvent.click(removeFromCartButtons[1]);
    expect(
      queryByRole("row", {
        name: "prod-name Barbell 200 - 1 + 1 200$",
      })
    ).toBeNull();
  });
});
