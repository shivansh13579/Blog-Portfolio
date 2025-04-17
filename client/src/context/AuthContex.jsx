import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    try {
      const user = localStorage.getItem("user") || null;
      return { user };
    } catch (error) {
      console.log("some issues", error);
      return {
        user: null,
      };
    }
  });

  const login = (user) => {
    try {
      setAuthData({ user });
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log("Error saving user data:", error);
    }
  };

  const logout = () => {
    try {
      setAuthData({
        user: null,
      });
      localStorage.removeItem("user");
      toast.success("Logout successfully");
    } catch (error) {
      console.log("Error deleting user:", error);
      return {
        user: null,
      };
    }
  };
  return (
    <AuthContext.Provider value={{ ...authData, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
