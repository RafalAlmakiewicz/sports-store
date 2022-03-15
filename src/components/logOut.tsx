import { useHistory } from "react-router";
import { useUser } from "../contexts/userContext";

const LogOut = () => {
  const { logOut } = useUser();
  const history = useHistory();
  logOut();
  history.push("/");
  return null;
};

export default LogOut;
