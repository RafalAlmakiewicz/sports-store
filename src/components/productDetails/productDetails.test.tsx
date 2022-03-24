import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import TestApp from "../../testUtils/testApp";

const { getByRole, getByText } = screen;
describe("product details page", () => {
  let addToCartButton: HTMLElement, incrementQuantityButton: HTMLElement;

  beforeEach(async () => {
    await act(async () => {
      render(<TestApp path={["/products/p1"]} />);
    });
    addToCartButton = getByRole("button", { name: /add to cart/i });
    incrementQuantityButton = getByRole("button", { name: "+" });
  });

  it("displays product description", async () => {
    expect(getByText("description of goggles")).toBeInTheDocument();
  });

  it("2 pairs of goggles are added and displayed in cart", async () => {
    userEvent.click(incrementQuantityButton);
    userEvent.click(addToCartButton);
    const goToCartLink = getByRole("link", { name: /go to cart/i });
    userEvent.click(goToCartLink);
    const addedCartItem = getByRole("row", {
      name: "prod-name goggles 10 - 2 + 20 20$",
    });
    expect(addedCartItem).toBeInTheDocument();
  });
});
