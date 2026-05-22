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
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import auth from "@/lib/firebase.config";

export const AuthContext =
  createContext(null);

const googleProvider =
  new GoogleAuthProvider();

const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);



  // REGISTER

  const createUser = (
    email,
    password
  ) => {

    setLoading(true);

    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };



  // LOGIN

  const loginUser = (
    email,
    password
  ) => {

    setLoading(true);

    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };



  // GOOGLE LOGIN

  const googleLogin =
    () => {

      setLoading(true);

      return signInWithPopup(
        auth,
        googleProvider
      );
    };



  // UPDATE PROFILE

  const updateUserProfile = (
    name,
    photo
  ) => {

    return updateProfile(
      auth.currentUser,
      {
        displayName:
          name,

        photoURL:
          photo,
      }
    );
  };



  // LOGOUT

  const logoutUser =
    async () => {

      setLoading(true);

      await signOut(auth);

      setUser(null);

      setLoading(false);
    };



  // OBSERVER

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        currentUser => {

          setUser(
            currentUser
          );

          setLoading(false);
        }
      );

    return () =>
      unsubscribe();

  }, []);




  const authInfo = {

    user,
    loading,

    createUser,

    loginUser,

    googleLogin,

    logoutUser,

    updateUserProfile,
  };



  return (

    <AuthContext.Provider
      value={authInfo}
    >
      {children}
    </AuthContext.Provider>

  );
};

export default AuthProvider;