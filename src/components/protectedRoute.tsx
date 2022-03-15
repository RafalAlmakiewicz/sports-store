import { Redirect } from "react-router-dom";
import { useUser } from "../contexts/userContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectPath?: string;
}

const ProtectedRoute = ({
  redirectPath = "/login",
  children,
}: ProtectedRouteProps) => {
  const { user } = useUser();
  if (!user) {
    return <Redirect to={redirectPath} />;
  } else return children;
};

export default ProtectedRoute;
