"use client";

import { useContext, useEffect } from "react";

import { useRouter } from "next/navigation";

import { AuthContext }
  from "@/providers/AuthProvider";

const PrivateRoute = ({ children }) => {

  const {
    user,
    loading,
  } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {

    if (!loading && !user) {
      router.push("/login");
    }

  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl">
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