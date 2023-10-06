import React, { createContext, useState, useEffect, useContext } from "react";
import uuid from "react-uuid";
import { useLocalStorage } from "@mantine/hooks";
import { toast } from "sonner";
import axios from "axios";
import { API_HOST } from "../config";

import CheckContext from "./CheckContext";

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
  const [isServerReady, setServerReady] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [session, setSession, removeSession] = useLocalStorage({
    key: "session-key",
    defaultValue: "",
  });

  const checkServer = async () => {
    try {
      await axios.get(`${API_HOST}/api/check`);
      setLoading(false);
      setServerReady(true);
    } catch (error) {
      setServerReady(false);
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
          toast.success("Welcome");
        }, 1000);
      } else {
        setTimeout(() => {
          setLoggingIn(false);
          toast.error("Username or password is incorrect.");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserLogout = async () => {
    setTimeout(() => {
      removeSession();
      toast.success("Successfully logout.");
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
    checkServer();

    // Set up a repeating interval to check API status every 5 seconds
    const intervalId = setInterval(checkServer, 5000); // Adjust the interval as needed

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <AuthContext.Provider value={contextData}>
      <CheckContext
        isLoading={loading}
        isServerReady={isServerReady}
        children={children}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
