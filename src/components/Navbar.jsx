"use client";

import {
  useState,
} from "react";

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

  const [menuOpen, setMenuOpen] =
    useState(false);



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

    <nav
      className="
      sticky
      top-0
      z-50
      bg-black/90
      backdrop-blur-lg
      text-white
      border-b
      border-gray-800
    "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-5
        py-4
        flex
        justify-between
        items-center
      "
      >

        {/* LOGO */}

        <Link href="/">

          <h1
            className="
            text-3xl
            font-extrabold
            tracking-wide
          "
          >
            DriveFleet
          </h1>

        </Link>



        {/* DESKTOP MENU */}

        <div
          className="
          hidden
          lg:flex
          items-center
          gap-8
          text-lg
          font-medium
        "
        >

          <Link
            href="/"
            className="
            hover:text-gray-300
            duration-300
          "
          >
            Home
          </Link>

          <Link
            href="/explore-cars"
            className="
            hover:text-gray-300
            duration-300
          "
          >
            Explore Cars
          </Link>



          {
            user && (
              <>

                <Link
                  href="/add-car"
                  className="
                  hover:text-gray-300
                  duration-300
                "
                >
                  Add Car
                </Link>

                <Link
                  href="/my-cars"
                  className="
                  hover:text-gray-300
                  duration-300
                "
                >
                  My Cars
                </Link>

                <Link
                  href="/my-bookings"
                  className="
                  hover:text-gray-300
                  duration-300
                "
                >
                  My Bookings
                </Link>

              </>
            )
          }

        </div>



        {/* RIGHT SIDE */}

        <div
          className="
          hidden
          lg:flex
          items-center
          gap-4
        "
        >

          {
            user ? (
              <>

                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt=""
                  className="
                  w-11
                  h-11
                  rounded-full
                  object-cover
                  border-2
                  border-white
                "
                />

                <button
                  onClick={
                    handleLogout
                  }
                  className="
                  bg-white
                  text-black
                  px-5
                  py-2
                  rounded-xl
                  font-semibold
                  hover:bg-gray-200
                  duration-300
                  cursor-pointer
                "
                >
                  Logout
                </button>

              </>
            ) : (
              <>

                <Link href="/login">

                  <button
                    className="
                    border
                    border-white
                    px-5
                    py-2
                    rounded-xl
                    hover:bg-white
                    hover:text-black
                    duration-300
                    cursor-pointer
                  "
                  >
                    Login
                  </button>

                </Link>



                <Link href="/register">

                  <button
                    className="
                    bg-white
                    text-black
                    px-5
                    py-2
                    rounded-xl
                    font-semibold
                    hover:bg-gray-200
                    duration-300
                    cursor-pointer
                  "
                  >
                    Register
                  </button>

                </Link>

              </>
            )
          }

        </div>



        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
          className="
          lg:hidden
          text-3xl
        "
        >
          ☰
        </button>

      </div>



      {/* MOBILE MENU */}

      {
        menuOpen && (

          <div
            className="
            lg:hidden
            bg-black
            px-5
            pb-5
            flex
            flex-col
            gap-5
            text-lg
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
                  bg-white
                  text-black
                  py-2
                  rounded-xl
                  font-semibold
                "
                >
                  Logout
                </button>
              ) : (
                <>

                  <Link href="/login">
                    Login
                  </Link>

                  <Link href="/register">
                    Register
                  </Link>

                </>
              )
            }

          </div>
        )
      }

    </nav>
  );
};

export default Navbar;