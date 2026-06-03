"use client";

import {
  createContext,
  useContext,
} from "react";

import {
  authClient,
} from "@/lib/auth-client";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const {
    data: session,
    isPending: loading,
  } = authClient.useSession();

  const user =
    session?.user || null;

  const logoutUser =
    async () => {

      await authClient.signOut();
    };

  return (

    <AuthContext.Provider
      value={{
        user,
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