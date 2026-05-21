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

    <div>

      <Navbar />

      <div
        className="
        min-h-screen
        flex
        justify-center
        items-center
      "
      >

        <form
          onSubmit={
            handleLogin
          }
          className="
          border
          p-8
          rounded-xl
          w-[400px]
          shadow-lg
        "
        >

          <h1
            className="
            text-3xl
            font-bold
            mb-5
            text-center
          "
          >
            Login
          </h1>



          <input
            type="email"
            name="email"
            placeholder="Email"
            className="
            border
            w-full
            p-3
            mb-4
            rounded-lg
          "
            required
          />



          <input
            type="password"
            name="password"
            placeholder="Password"
            className="
            border
            w-full
            p-3
            mb-4
            rounded-lg
          "
            required
          />



          <button
            disabled={loading}
            className="
            bg-black
            text-white
            w-full
            py-3
            rounded-lg
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



          <button
            type="button"
            disabled={loading}
            onClick={
              handleGoogleLogin
            }
            className="
            bg-red-500
            text-white
            w-full
            py-3
            rounded-lg
            mt-4
            cursor-pointer
            disabled:opacity-50
          "
          >
            Continue with Google
          </button>



          <p
            className="
            mt-4
            text-center
          "
          >

            Don&apos;t have an account?

            <Link
              href="/register"
              className="
              text-blue-500
              ml-2
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