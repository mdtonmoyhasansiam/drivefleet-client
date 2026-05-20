"use client";

import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import auth from "@/services/firebase.config";

export const AuthContext =
  createContext(null);

const googleProvider =
  new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // REGISTER
  const createUser = (email, password) => {

    setLoading(true);

    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // LOGIN
  const loginUser = (email, password) => {

    setLoading(true);

    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // GOOGLE LOGIN
  const googleLogin = () => {

    setLoading(true);

    return signInWithPopup(
      auth,
      googleProvider
    );
  };

  // LOGOUT
  const logoutUser = () => {

    setLoading(true);

    return signOut(auth);
  };

  // OBSERVER
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);

          setLoading(false);
        }
      );

    return () => unsubscribe();

  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    googleLogin,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;