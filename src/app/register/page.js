"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );

      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error(
        "Password must contain uppercase letter"
      );

      setLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error(
        "Password must contain lowercase letter"
      );

      setLoading(false);
      return;
    }

    try {
      const result =
        await authClient.signUp.email({
          name,
          email,
          password,
          image: photo,
        });

      if (result?.error) {
        toast.error(
          result.error.message
        );

        return;
      }

      await authClient.signOut();

      toast.success(
        "Registration Successful"
      );

      router.push("/login");

    } catch (error) {
      console.log(error);

      toast.error(
        "Registration Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin =
    async () => {

      try {

        await authClient.signIn.social({
          provider: "google",
          callbackURL: "https://drivefleet-rouge.vercel.app",
        });

      } catch (error) {

        console.log(error);

        toast.error(
          "Google Login Failed"
        );
      }
    };

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

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
          onSubmit={handleRegister}
          className="
          w-full
          max-w-[450px]
          bg-white/5
          border
          border-white/10
          backdrop-blur-xl
          rounded-3xl
          p-8
          shadow-2xl
        "
        >

          <h1
            className="
            text-4xl
            font-bold
            text-center
            mb-8
          "
          >
            Register
          </h1>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
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
            type="text"
            name="photo"
            placeholder="Photo URL"
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

            {
              loading
                ? "Loading..."
                : "Register"
            }

          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleLogin}
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

            Already have an account?

            <Link
              href="/login"
              className="
              text-indigo-400
              ml-2
              hover:underline
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