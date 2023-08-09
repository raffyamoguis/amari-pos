import React, { createContext, useState, useEffect, useContext } from "react";
import uuid from "react-uuid";
import { useLocalStorage } from "@mantine/hooks";

import Ripple from "../components/ripple/Ripple";

interface AuthContextData {
  user: any;
  session: any;
  isLoggingIn: boolean;
  handleUserLogin: (credentials: any) => void;
  handleUserLogout: () => void;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  session: null,
  isLoggingIn: false,
  handleUserLogin: (_credentials: any) => {},
  handleUserLogout: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggingIn, setLoggingIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [session, setSession, removeSession] = useLocalStorage({
    key: "session-key",
    defaultValue: "",
  });

  const getUserOnLoad = () => {
    setUser({ name: "Raffy", email: "raffyamoguis@gmail.com" });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleUserLogin = async (credentials?: any) => {
    setLoggingIn(true);
    console.log(credentials);
    setSession(uuid());

    // Fake login
    setTimeout(() => {
      setLoggingIn(false);
    }, 3000);
  };

  const handleUserLogout = async () => {
    removeSession();
  };

  const contextData = {
    user,
    session,
    isLoggingIn,
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
