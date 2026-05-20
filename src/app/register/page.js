"use client";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

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



  const handleRegister =
    async e => {

      e.preventDefault();

      const form = e.target;

      const name =
        form.name.value;

      const photo =
        form.photo.value;

      const email =
        form.email.value;

      const password =
        form.password.value;

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

        router.push("/");

      } catch (error) {

        toast.error(
          error.message
        );
      }
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
            handleRegister
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
            Register
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