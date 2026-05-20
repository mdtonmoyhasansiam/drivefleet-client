"use client";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import axios from "axios";

import {
  useEffect,
  useState,
} from "react";

import AuthContext from "@/context/AuthContext";

import { auth } from "@/services/firebase.config";

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

    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };



  // GOOGLE LOGIN
  const googleLogin = () => {

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

    return signOut(auth);
  };



  // OBSERVER
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (currentUser) => {

          setUser(currentUser);

          if (currentUser?.email) {

            const userData = {
              email:
                currentUser.email,
            };

            await axios.post(
              "http://localhost:5000/jwt",
              userData,
              {
                withCredentials: true,
              }
            );
          } else {

            await axios.post(
              "http://localhost:5000/logout",
              {},
              {
                withCredentials: true,
              }
            );
          }

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