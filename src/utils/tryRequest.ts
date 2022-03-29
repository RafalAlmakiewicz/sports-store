import { AxiosError } from "axios";

const tryRequest = async (request: Function, args?: unknown) => {
  try {
    await request(args);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (!axiosError.response) {
      return "Error: server did not respond.";
    } else return axiosError.response.data;
  }
  return "";
};

export default tryRequest;
