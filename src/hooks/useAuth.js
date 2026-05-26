"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const token =
      localStorage.getItem(
        "access-token"
      );

    if (token) {

      try {

        const payload =
          JSON.parse(
            atob(
              token.split(".")[1]
            )
          );

        setUser(payload);

      } catch (error) {

        console.log(error);

        localStorage.removeItem(
          "access-token"
        );
      }
    }

    setLoading(false);

  }, []);

  const logoutUser = () => {

    localStorage.removeItem(
      "access-token"
    );

    setUser(null);
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logoutUser,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

const useAuth = () =>
  useContext(AuthContext);

export default useAuth;