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

const RegisterPage = () => {

  const {
    createUser,
    googleLogin,
    updateUserProfile,
  } = useAuth();

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);



  const handleRegister =
    async e => {

      e.preventDefault();

      setLoading(true);

      const form = e.target;

      const name =
        form.name.value;

      const photo =
        form.photo.value;

      const email =
        form.email.value;

      const password =
        form.password.value;



      if (
        password.length < 6
      ) {

        toast.error(
          "Password must be at least 6 characters"
        );

        setLoading(false);

        return;
      }



      try {

        await createUser(
          email,
          password
        );

        await updateUserProfile(
          name,
          photo
        );

        toast.success(
          "Registration Successful"
        );

        form.reset();

        router.push("/");

      } catch (error) {

        console.log(error);



        if (
          error.message.includes(
            "email-already-in-use"
          )
        ) {

          toast.error(
            "Email already exists"
          );
        }

        else {

          toast.error(
            "Registration Failed"
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
            handleRegister
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
            Register
          </h1>



          <input
            type="text"
            name="name"
            placeholder="Name"
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
            type="text"
            name="photo"
            placeholder="Photo URL"
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
                : "Register"
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

            Already have an account?

            <Link
              href="/login"
              className="
              text-blue-500
              ml-2
            "
            >
              Login
            </Link>

          </p>

        </form>

      </div>

      <Footer />

    </div>
  );
};

export default RegisterPage;