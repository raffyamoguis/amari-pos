import React, { createContext, useState, useEffect, useContext } from "react";
import uuid from "react-uuid";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";

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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleUserLogin = async (credentials?: {
    username: string;
    password: string;
  }) => {
    setLoggingIn(true);
    try {
      const result = await axios.post(
        "http://localhost:3001/api/login",
        credentials
      );
      const user = result.data.user;
      if (user.length !== 0) {
        setUser(user);
        setTimeout(() => {
          setLoggingIn(false);
          setSession(uuid());
          notifications.show({
            message: "Welcome.",
            color: "green",
          });
        }, 1000);
      } else {
        setTimeout(() => {
          setLoggingIn(false);
          notifications.show({
            message: "Username or password is incorrect.",
            color: "red",
          });
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserLogout = async () => {
    setTimeout(() => {
      removeSession();
      notifications.show({
        message: "Successfully log out.",
        color: "blue",
      });
    }, 1000);
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
