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

import useAuth from "@/hooks/useAuth";

const LoginPage = () => {

  const {
    loginUser,
    googleLogin,
  } = useAuth();

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);



  const handleLogin =
    async e => {

      e.preventDefault();

      setLoading(true);

      const form = e.target;

      const email =
        form.email.value;

      const password =
        form.password.value;

      try {

        await loginUser(
          email,
          password
        );

        toast.success(
          "Login Successful"
        );

        form.reset();

        router.push("/");

      } catch (error) {

        console.log(error);

        if (
          error.message.includes(
            "invalid-credential"
          )
        ) {

          toast.error(
            "Invalid Email or Password"
          );
        }

        else {

          toast.error(
            "Login Failed"
          );
        }

      } finally {

        setLoading(false);
      }
    };



  const handleGoogleLogin =
    async () => {

      setLoading(true);

      try {

        await googleLogin();

        toast.success(
          "Google Login Successful"
        );

        router.push("/");

      } catch (error) {

        console.log(error);

        toast.error(
          "Google Login Failed"
        );

      } finally {

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
              Login to continue your journey
            </p>

          </div>



          {/* EMAIL */}
          <div
            className="
            mb-5
          "
          >

            <label
              className="
              block
              mb-2
              text-sm
              text-white/70
            "
            >
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="
              w-full
              bg-white/5
              border
              border-white/10
              text-white
              placeholder-white/30
              p-4
              rounded-2xl
              outline-none
              focus:border-indigo-500
              transition
            "
              required
            />

          </div>



          {/* PASSWORD */}
          <div
            className="
            mb-6
          "
          >

            <label
              className="
              block
              mb-2
              text-sm
              text-white/70
            "
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="
              w-full
              bg-white/5
              border
              border-white/10
              text-white
              placeholder-white/30
              p-4
              rounded-2xl
              outline-none
              focus:border-indigo-500
              transition
            "
              required
            />

          </div>



          {/* LOGIN BUTTON */}
          <button
            disabled={loading}
            className="
            w-full
            py-4
            rounded-2xl
            font-semibold
            bg-gradient-to-r
            from-indigo-500
            to-purple-600
            hover:scale-[1.02]
            transition
            cursor-pointer
            disabled:opacity-50
          "
          >

            {
              loading
                ? "Loading..."
                : "Login"
            }

          </button>



          {/* DIVIDER */}
          <div
            className="
            flex
            items-center
            gap-3
            my-6
          "
          >

            <div
              className="
              flex-1
              h-[1px]
              bg-white/10
            "
            />

            <p
              className="
              text-white/40
              text-sm
            "
            >
              OR
            </p>

            <div
              className="
              flex-1
              h-[1px]
              bg-white/10
            "
            />

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
            Continue with Google
          </button>



          {/* REGISTER LINK */}
          <p
            className="
            mt-8
            text-center
            text-white/60
          "
          >

            Don&apos;t have an account?

            <Link
              href="/register"
              className="
              ml-2
              text-indigo-400
              hover:text-indigo-300
              transition
              font-semibold
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