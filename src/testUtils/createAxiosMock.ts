import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import testActivities from "./testActivities";
import testToken from "./testToken";
import testProducts from "./testProducts";

let mock: MockAdapter;

const createAxiosMock = () => {
  mock = new MockAdapter(axios);
  setDefaultHandlers();
  return mock;
};

export const setDefaultHandlers = () => {
  mock.resetHandlers();
  mock.onGet(/products/i).reply(200, testProducts);
  mock.onGet(/activities/i).reply(200, testActivities);
  mock.onPost(/auth|users/i).reply(200, testToken);
};

export const getAxiosMock = () => mock;

export default createAxiosMock;
