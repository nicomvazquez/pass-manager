import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from "../api/authApi.js";
import Cookie from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("context not exist");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //estaodo de usuario
  const [isAutenticated, setIsAutenticated] = useState(false); // estado de inicio de secion
  const [errors, setErrors] = useState([]); // estado de arreglo de errores

  // chequeo de inicio de sesion
  useEffect(() => {
    const checkLoguin = async () => {
      try {
        const res = await verifyTokenRequest();
        console.log(res)
        if (!res.data) return setIsAutenticated(false);
        setIsAutenticated(true);
        setUser(res.data);
      } catch (error) {
        setIsAutenticated(false);
      }
    };
    checkLoguin();
  }, []);

  //funcion de registro
  const singup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAutenticated(true);
    } catch (error) {
      console.log(error);
      setErrors([error.response.data]);
    }
  };

  //funcion de inicio de secion
  const singin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAutenticated(true);
    } catch (error) {
      console.log(error);
      setErrors([error.response.data]);
    }
  };

  const logout = () => {
    Cookie.remove("token");
    setIsAutenticated(false);
    setUser(null);
  }

  // chequeo de errores
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        singup,
        singin,
        logout,
        user,
        isAutenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
