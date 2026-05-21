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
  updateProfile,
} from "firebase/auth";

import auth from "@/services/firebase.config";

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
  const googleLogin = () => {

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
        displayName: name,
        photoURL: photo,
      }
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
        async (
          currentUser
        ) => {

          setUser(
            currentUser
          );

          try {

            if (
              currentUser?.email
            ) {

              const userData =
                {
                  email:
                    currentUser.email,
                };

              await fetch(
                "http://localhost:5000/jwt",
                {
                  method:
                    "POST",

                  headers: {
                    "content-type":
                      "application/json",
                  },

                  credentials:
                    "include",

                  body: JSON.stringify(
                    userData
                  ),
                }
              );
            }

            else {

              await fetch(
                "http://localhost:5000/logout",
                {
                  method:
                    "POST",

                  credentials:
                    "include",
                }
              );
            }

          } catch (error) {

            console.log(
              error
            );
          }

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
    updateUserProfile,
    logoutUser,
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