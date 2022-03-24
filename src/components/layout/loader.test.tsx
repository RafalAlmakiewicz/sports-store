import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TestApp from "../../testUtils/testApp";
import {
  getAxiosMock,
  setDefaultHandlers,
} from "../../testUtils/createAxiosMock";

const { findByRole } = screen;

describe("loader", () => {
  beforeAll(() => {
    getAxiosMock().resetHandlers();
  });

  afterAll(() => {
    setDefaultHandlers();
  });

  it("displays error screen when server returns 500", async () => {
    getAxiosMock().onGet().reply(500, "internal server error");
    await act(async () => {
      render(<TestApp path={["/"]} />);
    });
    expect(
      await findByRole("heading", { name: "internal server error" })
    ).toBeInTheDocument();
  });
});
