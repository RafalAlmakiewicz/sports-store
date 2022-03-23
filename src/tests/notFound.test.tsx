import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TestApp from "./testApp";

const { getByRole } = screen;

describe("not found page", () => {
  it("shows not found message", async () => {
    await act(async () => {
      render(<TestApp path={["/x"]} />);
    });
    expect(getByRole("heading", { name: /not found/i })).toBeInTheDocument();
  });
});
