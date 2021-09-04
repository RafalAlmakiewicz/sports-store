import axios from "axios";

const register = (user) =>
  axios.post("http://localhost:3000/SportsStore/api/users", user);

export default register;
