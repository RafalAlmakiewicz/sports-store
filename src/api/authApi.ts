import axios from "axios";
import { apiEndpoint } from "./apiEndpoint";

const login = async (login: string, password: string) => {
  return await axios.post(`${apiEndpoint}/auth`, { login, password });
};

const register = async (login: string, password: string) => {
  return await axios.post(`${apiEndpoint}/users`, { login, password });
};

const AuthApi = { login, register };

export default AuthApi;
