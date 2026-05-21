"use client";

import {
  useRouter,
} from "next/navigation";

import {
  useEffect,
} from "react";

import useAuth from "@/hooks/useAuth";

const PrivateRoute = ({
  children,
}) => {

  const {
    user,
    loading,
  } = useAuth();

  const router =
    useRouter();



  useEffect(() => {

    if (
      !loading &&
      !user
    ) {

      router.push(
        "/login"
      );
    }

  }, [
    user,
    loading,
    router,
  ]);



  if (loading) {

    return (

      <div
        className="
        h-screen
        flex
        justify-center
        items-center
        text-3xl
        font-bold
      "
      >
        Loading...
      </div>
    );
  }



  if (!user) {

    return null;
  }



  return children;
};

export default PrivateRoute;