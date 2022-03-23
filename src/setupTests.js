import "@testing-library/jest-dom";
import createAxiosMock from "./tests/createAxiosMock";

beforeAll(() => {
  createAxiosMock();
});
