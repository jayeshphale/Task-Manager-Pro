import { createContext, useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // Load logged user
  const loadUser = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const { data } = await API.get("/api/auth/profile");

      setUser(data.user);

    } catch (error) {

      localStorage.removeItem("token");

      setUser(null);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // LOGIN
  const login = async (formData) => {

    try {

      const { data } = await API.post(
        "/api/auth/login",
        formData
      );

      localStorage.setItem("token", data.token);

      setUser(data.user);

      toast.success("Login successful");

      return true;

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Login failed"
      );

      return false;
    }
  };

  // SIGNUP
  const signup = async (formData) => {

    try {

      const { data } = await API.post(
        "/api/auth/signup",
        formData
      );

      localStorage.setItem("token", data.token);

      setUser(data.user);

      toast.success("Account created successfully");

      return true;

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Signup failed"
      );

      return false;
    }
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;