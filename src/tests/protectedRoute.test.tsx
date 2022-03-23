import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TestApp from "./testApp";

const { getByRole } = screen;

describe("protected route", () => {
  it("redirects to login page when trying to acces /admin path unauthenticated", async () => {
    await act(async () => {
      render(<TestApp path={["/admin"]} />);
    });
    expect(getByRole("heading", { name: /login/i })).toBeInTheDocument();
  });

  it("redirects to login page when trying to acces /productForm/:id path unauthenticated", async () => {
    await act(async () => {
      render(<TestApp path={["/productForm/p1"]} />);
    });
    expect(getByRole("heading", { name: /login/i })).toBeInTheDocument();
  });
});
