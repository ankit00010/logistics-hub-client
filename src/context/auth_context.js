import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const isLogout = localStorage.getItem("isLogout");
    
    if (isLogout !== null) {
      setLogout(JSON.parse(isLogout));
    }
  }, []);

  const handleLogout = (value) => {
    localStorage.setItem("isLogout", value);
    setLogout(value);
  };

  const auth_values = { 
    logout, 
    handleLogout 
  };
  
  return (
    <AuthContext.Provider value={auth_values}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;