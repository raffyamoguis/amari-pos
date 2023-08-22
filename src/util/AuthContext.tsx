import React, { createContext, useState, useEffect, useContext } from "react";
import uuid from "react-uuid";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { API_HOST } from "../config";

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

  const getUserOnLoad = async () => {
    try {
      await axios.get(`${API_HOST}/api/check`);
      setLoading(false);
    } catch (error) {
      notifications.show({
        message: "Server is not ready.",
        color: "red",
      });
      setLoading(false);
    }
  };

  const handleUserLogin = async (credentials?: {
    username: string;
    password: string;
  }) => {
    setLoggingIn(true);
    try {
      const result = await axios.post(`${API_HOST}/api/login`, credentials);
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

    // Set up a repeating interval to check API status every 5 seconds
    const intervalId = setInterval(getUserOnLoad, 5000); // Adjust the interval as needed

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
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
