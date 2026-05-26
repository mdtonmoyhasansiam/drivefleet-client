"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import Cookies from "js-cookie";

const SocialLoginPage = () => {

  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {

    const token = searchParams.get("token");

    if (token) {

      Cookies.set("token", token, {
        expires: 7,
      });

      router.push("/");
    }

    else {

      router.push("/login");
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