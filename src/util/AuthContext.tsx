import React, { createContext, useState, useEffect, useContext } from "react";
import uuid from "react-uuid";
import { useLocalStorage } from "@mantine/hooks";

import Ripple from "../components/ripple/Ripple";

interface AuthContextData {
  user: any;
  session: any;
  handleUserLogin: (credentials: any) => void;
  handleUserLogout: () => void;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  session: null,
  handleUserLogin: (_credentials: any) => {},
  handleUserLogout: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [session, setSession, removeSession] = useLocalStorage({
    key: "session-key",
    defaultValue: "",
  });

  const getUserOnLoad = () => {
    setUser({ name: "Raffy", email: "raffyamoguis@gmail.com" });

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleUserLogin = async (credentials?: any) => {
    console.log(credentials);
    setSession(uuid());
  };

  const handleUserLogout = async () => {
    removeSession();
  };

  const contextData = {
    user,
    session,
    handleUserLogin,
    handleUserLogout,
  };

  useEffect(() => {
    getUserOnLoad();
  }, []);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <Ripple /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
