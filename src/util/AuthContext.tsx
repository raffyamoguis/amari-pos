import React, { createContext, useState, useEffect, useContext } from "react";

import Ripple from "../components/ripple/Ripple";

interface AuthContextData {
  user: any;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  const getUserOnLoad = () => {
    setUser({ name: "Raffy", email: "raffyamoguis@gmail.com" });

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const contextData = {
    user,
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
