import axios from "axios";

const resetDatabase = async () => {
  await axios.post("http://localhost:3000/SportsStore/api/seed");
};

export default resetDatabase;
