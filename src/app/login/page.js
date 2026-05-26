"use client";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

const LoginPage = () => {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);



  const handleGoogleLogin =
    async () => {

      setLoading(true);

      try {

        window.open(
          "https://drivefleet-server-zqxb.onrender.com/auth/google",
          "_self"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Google Login Failed"
        );

        setLoading(false);
      }
    };



  return (

    <div
      className="
      bg-black
      text-white
      min-h-screen
      overflow-hidden
    "
    >

      <Navbar />



      {/* BACKGROUND GLOW */}
      <div
        className="
        fixed
        inset-0
        -z-10
      "
      >

        <div
          className="
          absolute
          top-[-120px]
          left-[-120px]
          w-[350px]
          h-[350px]
          bg-indigo-600/20
          blur-[120px]
          rounded-full
        "
        />

        <div
          className="
          absolute
          bottom-[-120px]
          right-[-120px]
          w-[350px]
          h-[350px]
          bg-purple-600/20
          blur-[120px]
          rounded-full
        "
        />

      </div>



      <div
        className="
        min-h-screen
        flex
        justify-center
        items-center
        px-5
        py-20
      "
      >

        <div
          className="
          w-full
          max-w-md
          bg-white/5
          border
          border-white/10
          backdrop-blur-xl
          rounded-3xl
          p-8
          shadow-[0_0_40px_rgba(99,102,241,0.15)]
        "
        >

          {/* TITLE */}
          <div
            className="
            text-center
            mb-8
          "
          >

            <h1
              className="
              text-4xl
              font-extrabold
              mb-3
            "
            >
              Welcome Back
            </h1>

            <p
              className="
              text-white/50
            "
            >
              Continue with your Google account
            </p>

          </div>



          {/* GOOGLE BUTTON */}
          <button
            type="button"
            disabled={loading}
            onClick={
              handleGoogleLogin
            }
            className="
            w-full
            py-4
            rounded-2xl
            border
            border-white/10
            bg-white/5
            hover:bg-white/10
            transition
            cursor-pointer
            disabled:opacity-50
            font-medium
          "
          >

            {
              loading
                ? "Redirecting..."
                : "Continue with Google"
            }

          </button>



          {/* REGISTER LINK */}
          <p
            className="
            mt-8
            text-center
            text-white/60
          "
          >

            Need a car rental account?

            <span
              className="
              ml-2
              text-indigo-400
              font-semibold
            "
            >
              Login with Google
            </span>

          </p>

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default LoginPage;