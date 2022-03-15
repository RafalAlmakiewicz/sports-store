import { createContext, useContext, useEffect, useMemo, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { User } from "../types";

interface UserContext {
  user: User | null;
  decodeToken: (token: string | null) => void;
  logOut: () => void;
}

const userContext = createContext<UserContext>({} as UserContext);

export const useUser = () => useContext(userContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

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
  };

  useEffect(() => {
    decodeToken(localStorage.getItem("token"));
  }, []);

  const value = useMemo(() => {
    return {
      user,
      decodeToken,
      logOut,
    };
  }, [user]);

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
