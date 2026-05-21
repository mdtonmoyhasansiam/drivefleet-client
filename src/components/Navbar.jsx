"use client";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

import useAuth from "@/hooks/useAuth";

const Navbar = () => {

  const {
    user,
    loading,
    logoutUser,
  } = useAuth();

  const router = useRouter();



  const handleLogout =
    () => {

      logoutUser()
        .then(() => {

          toast.success(
            "Logout Successful"
          );

          router.push("/login");
        })
        .catch(() => {

          toast.error(
            "Logout Failed"
          );
        });
    };



  if (loading) {

    return (

      <div
        className="
        h-20
        flex
        justify-center
        items-center
        text-2xl
        font-bold
      "
      >
        Loading...
      </div>
    );
  }



  return (

    <div
      className="
      bg-black
      text-white
      px-8
      py-4
      flex
      justify-between
      items-center
    "
    >

      <Link href="/">

        <h1
          className="
          text-2xl
          font-bold
        "
        >
          DriveFleet
        </h1>

      </Link>



      <div
        className="
        flex
        gap-5
        items-center
      "
      >

        <Link href="/">
          Home
        </Link>

        <Link href="/explore-cars">
          Explore Cars
        </Link>



        {
          user && (
            <>

              <Link href="/add-car">
                Add Car
              </Link>

              <Link href="/my-cars">
                My Cars
              </Link>

              <Link href="/my-bookings">
                My Bookings
              </Link>

            </>
          )
        }



        {
          user ? (
            <button
              onClick={
                handleLogout
              }
              className="
              bg-red-500
              px-4
              py-2
              rounded-lg
              cursor-pointer
              hover:bg-red-600
              duration-300
            "
            >
              Logout
            </button>
          ) : (
            <>

              <Link href="/login">
                Login
              </Link>

              <Link
                href="/register"
              >
                Register
              </Link>

            </>
          )
        }

      </div>

    </div>
  );
};

export default Navbar;