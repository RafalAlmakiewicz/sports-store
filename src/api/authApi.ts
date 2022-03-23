import axios from "axios";
import jwtDecode from "jwt-decode";
import { apiEndpoint } from "../apiEndpoint";
import { User } from "../types";

const login = async (login: string, password: string) => {
  return await axios.post(`${apiEndpoint}/auth`, { login, password });
};

const register = async (login: string, password: string) => {
  return await axios.post(`${apiEndpoint}/users`, { login, password });
};

const AuthApi: AuthApi = { login, register };

interface AuthApi {
  login: (login: string, password: string) => Promise<any>;
  register: (login: string, password: string) => Promise<any>;
}

export default AuthApi;
