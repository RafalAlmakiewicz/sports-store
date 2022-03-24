import "@testing-library/jest-dom";
import createAxiosMock from "./testUtils/createAxiosMock";

beforeAll(() => {
  createAxiosMock();
});
