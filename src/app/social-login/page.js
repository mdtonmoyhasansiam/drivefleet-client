"use client";

import { useEffect } from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

const SocialLoginPage = () => {

  const router = useRouter();

  const searchParams =
    useSearchParams();

  useEffect(() => {

    const token =
      searchParams.get(
        "token"
      );

    if (token) {

      localStorage.setItem(
        "access-token",
        token
      );

      window.location.href =
        "/";
    }

    else {

      router.push(
        "/login"
      );
    }

  }, [router, searchParams]);

  return (

    <div
      className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
    "
    >

      <h1
        className="
        text-2xl
        font-bold
      "
      >
        Logging in...
      </h1>

    </div>
  );
};

export default SocialLoginPage;