import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import TestApp from "../../testUtils/testApp";

const { getByRole, getByText, findByText, getByLabelText, findByRole } = screen;

describe("login page", () => {
  let loginInput: HTMLElement,
    passwordInput: HTMLElement,
    submitButton: HTMLElement;

  beforeEach(async () => {
    await act(async () => {
      render(<TestApp path={["/login"]} />);
    });
    loginInput = getByLabelText(/login/i);
    passwordInput = getByLabelText(/password/i);
    submitButton = getByRole("button", { name: /submit/i });
  });

  it("submit button is disabled", () => {
    expect(submitButton).toBeDisabled();
  });

  it("displays error when login is empty", () => {
    userEvent.clear(loginInput);
    userEvent.tab();
    expect(getByText(/login is required/i));
  });

  it("displays error when password is empty", () => {
    userEvent.clear(passwordInput);
    userEvent.tab();
    expect(getByText(/password is required/i));
  });

  it("displays error when login is less than 5 characters", () => {
    userEvent.type(loginInput, "*");
    userEvent.tab();
    expect(getByText(/login must be at least 5 characters/i));
  });

  it("should display error when password is less than 5 characters", () => {
    userEvent.type(passwordInput, "*");
    userEvent.tab();
    expect(getByText(/password must be at least 5 characters/i));
  });

  it("redirect to admin panel after logging in", async () => {
    userEvent.type(loginInput, "*****");
    userEvent.type(passwordInput, "*****");
    userEvent.tab();
    userEvent.click(submitButton);
    expect(await findByRole("link", { name: /new item/i })).toBeInTheDocument();
    expect(await findByText("admin")).toBeInTheDocument();
  });
});
