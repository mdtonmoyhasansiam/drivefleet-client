"use client";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import {
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import toast from "react-hot-toast";

import useAuth from "@/hooks/useAuth";

const Navbar = () => {

  const {
    user,
    loading,
    logoutUser,
  } = useAuth();

  const router =
    useRouter();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);



  const handleLogout =
    () => {

      logoutUser()
        .then(() => {

          toast.success(
            "Logout Successful"
          );

          router.push(
            "/login"
          );
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
        bg-black
        text-white
      "
      >

        <div
          className="
          w-10
          h-10
          border-4
          border-[#6C63FF]
          border-t-transparent
          rounded-full
          animate-spin
        "
        />

      </div>
    );
  }



  return (

    <nav
      className="
      sticky
      top-0
      z-50
      backdrop-blur-xl
      bg-black/80
      border-b
      border-white/10
    "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-5
        lg:px-0
        h-20
        flex
        justify-between
        items-center
      "
      >

        {/* LOGO */}

        <Link href="/">

          <div
            className="
            flex
            items-center
            gap-3
          "
          >

            <div
              className="
              w-12
              h-12
              rounded-2xl
              bg-[#6C63FF]
              flex
              justify-center
              items-center
              shadow-[0_0_30px_rgba(108,99,255,0.6)]
            "
            >

              🚘

            </div>

            <div>

              <h1
                className="
                text-2xl
                font-extrabold
                text-white
                leading-none
              "
              >
                DriveFleet
              </h1>

              <p
                className="
                text-xs
                tracking-[4px]
                text-gray-400
                mt-1
              "
              >
                RENTAL CLUB
              </p>

            </div>

          </div>

        </Link>



        {/* DESKTOP MENU */}

        <div
          className="
          hidden
          lg:flex
          items-center
          gap-8
          text-gray-300
          font-medium
        "
        >

          <Link
            href="/"
            className="
            hover:text-[#8B5CF6]
            duration-300
          "
          >
            Home
          </Link>

          <Link
            href="/explore-cars"
            className="
            hover:text-[#8B5CF6]
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
                  hover:text-[#8B5CF6]
                  duration-300
                "
                >
                  Add Car
                </Link>

                <Link
                  href="/my-cars"
                  className="
                  hover:text-[#8B5CF6]
                  duration-300
                "
                >
                  My Cars
                </Link>

                <Link
                  href="/my-bookings"
                  className="
                  hover:text-[#8B5CF6]
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
          flex
          items-center
          gap-3
        "
        >

          {
            user ? (

              <div
                className="
                relative
              "
              >

                <button
                  onClick={() =>
                    setProfileOpen(
                      !profileOpen
                    )
                  }
                  className="
                  flex
                  items-center
                  gap-3
                  bg-white/5
                  border
                  border-white/10
                  hover:border-[#6C63FF]/50
                  px-3
                  py-2
                  rounded-2xl
                  duration-300
                "
                >

                  <img
                    src={
                      user?.photoURL &&
                      user.photoURL.startsWith(
                        "http"
                      )
                        ? user.photoURL
                        : "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="user"
                    className="
                    w-10
                    h-10
                    rounded-full
                    object-cover
                    border-2
                    border-[#6C63FF]
                  "
                  />

                  <span
                    className="
                    hidden
                    md:block
                    text-white
                    font-semibold
                    max-w-[140px]
                    truncate
                  "
                  >
                    {
                      user?.displayName
                    }
                  </span>

                  <ChevronDown
                    size={18}
                    className="
                    text-gray-300
                  "
                  />

                </button>



                {
                  profileOpen && (

                    <div
                      className="
                      absolute
                      right-0
                      mt-4
                      w-64
                      bg-[#111]
                      border
                      border-white/10
                      rounded-3xl
                      p-5
                      shadow-2xl
                      backdrop-blur-xl
                    "
                    >

                      <div
                        className="
                        flex
                        flex-col
                        gap-5
                        text-white
                        font-semibold
                      "
                      >

                        <Link
                          href="/add-car"
                          className="
                          hover:text-[#8B5CF6]
                          duration-300
                        "
                        >
                          Add Car
                        </Link>

                        <Link
                          href="/my-bookings"
                          className="
                          hover:text-[#8B5CF6]
                          duration-300
                        "
                        >
                          My Bookings
                        </Link>

                        <Link
                          href="/my-cars"
                          className="
                          hover:text-[#8B5CF6]
                          duration-300
                        "
                        >
                          My Listings
                        </Link>

                        <button
                          onClick={
                            handleLogout
                          }
                          className="
                          text-left
                          text-red-400
                          hover:text-red-500
                          duration-300
                          cursor-pointer
                        "
                        >
                          Logout
                        </button>

                      </div>

                    </div>
                  )
                }

              </div>

            ) : (

              <div
                className="
                hidden
                md:flex
                items-center
                gap-3
              "
              >

                <Link href="/login">

                  <button
                    className="
                    text-white
                    hover:text-[#8B5CF6]
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
                    bg-[#6C63FF]
                    text-white
                    px-5
                    py-2
                    rounded-xl
                    font-semibold
                    hover:bg-[#8B5CF6]
                    duration-300
                    cursor-pointer
                  "
                  >
                    Register
                  </button>

                </Link>

              </div>
            )
          }



          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
            className="
            lg:hidden
            text-white
          "
          >

            {
              menuOpen ? (
                <X size={30} />
              ) : (
                <Menu size={30} />
              )
            }

          </button>

        </div>

      </div>



      {/* MOBILE MENU */}

      {
        menuOpen && (

          <div
            className="
            lg:hidden
            bg-black
            border-t
            border-white/10
            px-5
            py-6
            flex
            flex-col
            gap-5
            text-white
            font-medium
          "
          >

            <Link href="/">
              Home
            </Link>

            <Link href="/explore-cars">
              Explore Cars
            </Link>



            {
              user ? (
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

                  <button
                    onClick={
                      handleLogout
                    }
                    className="
                    text-left
                    text-red-400
                  "
                  >
                    Logout
                  </button>

                </>
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