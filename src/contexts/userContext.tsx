import { createContext, useContext, useEffect, useMemo, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { User } from "../types";
import { useApi } from "./apiContext";
import { useHistory } from "react-router";

interface UserContext {
  user: User | null;
  decodeToken: (token: string | null) => void;
  logOut: () => void;
  logIn: (login: string, password: string) => Promise<any>;
  register: (login: string, password: string) => Promise<any>;
}

const userContext = createContext<UserContext>({} as UserContext);

export const useUser = () => useContext(userContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const history = useHistory();
  const { authApi } = useApi();

  const decodeToken = (token: string | null) => {
    if (!token) return;
    axios.defaults.headers.common["x-auth-token"] = token;
    try {
      const user = jwtDecode<User>(token);
      setUser(user);
      localStorage.setItem("token", token);
    } catch (error) {
      console.log("Invalid token");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    history.push("/");
  };

  useEffect(() => {
    decodeToken(localStorage.getItem("token"));
  }, []);

  const value = useMemo(() => {
    return {
      user,
      decodeToken,
      logOut,
      logIn: authApi.login,
      register: authApi.register,
    };
  }, [user]);

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
