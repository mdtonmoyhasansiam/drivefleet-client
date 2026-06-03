"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  // ======================================
  // EMAIL LOGIN
  // ======================================

  const handleLogin = async e => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const email =
      form.email.value;

    const password =
      form.password.value;

    try {
      const result =
        await authClient.signIn.email(
          {
            email,
            password,
          }
        );

      if (result?.error) {
        toast.error(
          result.error.message
        );

        return;
      }

      toast.success(
        "Login Successful"
      );

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);

      toast.error(
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // GOOGLE LOGIN
  // ======================================

  const handleGoogleLogin =
    async () => {
      try {
        await authClient.signIn.social(
          {
            provider:
              "google",

            callbackURL:
              "/",
          }
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Google Login Failed"
        );
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

      {/* BACKGROUND */}
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
        <form
          onSubmit={
            handleLogin
          }
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
              Login to your account
            </p>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="
            w-full
            p-4
            mb-4
            rounded-xl
            bg-white/5
            border
            border-white/10
            text-white
            placeholder-white/40
            focus:outline-none
            focus:border-indigo-500
          "
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="
            w-full
            p-4
            mb-4
            rounded-xl
            bg-white/5
            border
            border-white/10
            text-white
            placeholder-white/40
            focus:outline-none
            focus:border-indigo-500
          "
            required
          />

          <button
            disabled={loading}
            className="
            w-full
            py-4
            rounded-xl
            bg-gradient-to-r
            from-indigo-500
            to-purple-600
            font-semibold
            hover:scale-[1.02]
            transition
            cursor-pointer
            disabled:opacity-50
          "
          >
            {loading
              ? "Loading..."
              : "Login"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={
              handleGoogleLogin
            }
            className="
            w-full
            py-4
            rounded-xl
            bg-white
            text-black
            font-semibold
            mt-4
            hover:bg-gray-200
            transition
            cursor-pointer
            disabled:opacity-50
          "
          >
            Continue with Google
          </button>

          <p
            className="
            mt-6
            text-center
            text-white/60
          "
          >
            Don&apos;t have an
            account?

            <Link
              href="/register"
              className="
              text-indigo-400
              ml-2
              hover:underline
            "
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;