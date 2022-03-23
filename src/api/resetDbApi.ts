import axios from "axios";
import { apiEndpoint } from "../apiEndpoint";

const resetDatabase = async () => {
  return await axios.post(`${apiEndpoint}/seed`);
};

export default resetDatabase;
