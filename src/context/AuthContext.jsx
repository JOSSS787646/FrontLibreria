import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [tokenAuth, setTokenAuth] = useState(null); // token de login general
  const [tokenMicroservicio, setTokenMicroservicio] = useState(null); // token microservicio

  // Cargar tokens guardados en localStorage al inicio
  useEffect(() => {
    const savedTokenAuth = localStorage.getItem("tokenAuth");
    const savedTokenMicro = localStorage.getItem("token");
    if (savedTokenAuth) setTokenAuth(savedTokenAuth);
    if (savedTokenMicro) setTokenMicroservicio(savedTokenMicro);
  }, []);

  // Guardar tokens y actualizar estado (login)
  const login = (authToken, microToken) => {
    localStorage.setItem("tokenAuth", authToken);
    localStorage.setItem("token", microToken);
    setTokenAuth(authToken);
    setTokenMicroservicio(microToken);
  };

  const logout = () => {
    localStorage.removeItem("tokenAuth");
    localStorage.removeItem("token");
    setTokenAuth(null);
    setTokenMicroservicio(null);
  };

  return (
    <AuthContext.Provider
      value={{
        tokenAuth,
        tokenMicroservicio,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
