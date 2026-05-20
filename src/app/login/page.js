"use client";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

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



  const handleLogin = e => {

    e.preventDefault();

    const form = e.target;

    const email =
      form.email.value;

    const password =
      form.password.value;



    loginUser(
      email,
      password
    )
      .then(() => {

        toast.success(
          "Login Successful"
        );

        router.push("/");
      })
      .catch(error => {

        toast.error(
          error.message
        );
      });
  };



  const handleGoogleLogin =
    () => {

      googleLogin()
        .then(() => {

          toast.success(
            "Google Login Successful"
          );

          router.push("/");
        })
        .catch(error => {

          toast.error(
            error.message
          );
        });
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
        "
        >

          <h1
            className="
            text-3xl
            font-bold
            mb-5
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
          "
            required
          />



          <button
            className="
            bg-black
            text-white
            w-full
            py-3
            rounded-lg
          "
          >
            Login
          </button>



          <button
            type="button"
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
          "
          >
            Continue with Google
          </button>



          <p
            className="
            mt-4
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