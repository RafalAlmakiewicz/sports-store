import axios from "axios";

const login = (user) =>
  axios.post("http://localhost:3000/SportsStore/api/auth", user);

export default login;
