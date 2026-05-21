"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const { user, loading, logoutUser } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔐 AUTH GUARD FUNCTION
  const requireAuth = (path) => {
    if (!user) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }
    router.push(path);
  };

  // 🚪 LOGOUT
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success("Logout Successful");
        router.push("/login");
      })
      .catch(() => {
        toast.error("Logout Failed");
      });
  };

  if (loading) {
    return (
      <div className="h-20 flex justify-center items-center bg-black text-white">
        Loading...
      </div>
    );
  }

  // 🎨 STYLES (GLOBAL SYSTEM)
  const link =
    "hover:text-indigo-400 transition cursor-pointer";

  const primary =
    "px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 active:scale-95 transition cursor-pointer";

  const outline =
    "px-5 py-2 rounded-full border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition cursor-pointer";

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 text-white">

      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">

          <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center font-bold">
            DF
          </div>

          <span className="font-bold text-xl hover:text-indigo-400 transition">
            DriveFleet
          </span>

        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-8 text-sm text-white/70">

          <Link className={link} href="/">
            Home
          </Link>

          <Link className={link} href="/explore-cars">
            Explore Cars
          </Link>

          {/* 🔐 PROTECTED LINKS */}
          <button
            onClick={() => requireAuth("/add-car")}
            className={link}
          >
            Add Car
          </button>

          <button
            onClick={() => requireAuth("/my-bookings")}
            className={link}
          >
            My Bookings
          </button>

        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-3">

          {user ? (
            <>
              <img
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                className="w-10 h-10 rounded-full border-2 border-indigo-500"
                alt="user"
              />

              <button onClick={handleLogout} className={primary}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={outline}>
                Login
              </Link>

              <Link href="/register" className={primary}>
                Register
              </Link>
            </>
          )}

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-3xl cursor-pointer"
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden px-5 pb-5 bg-black/95 border-t border-white/10 flex flex-col gap-4 text-white/70">

          <Link href="/" onClick={() => setMenuOpen(false)} className={link}>
            Home
          </Link>

          <Link href="/explore-cars" onClick={() => setMenuOpen(false)} className={link}>
            Explore Cars
          </Link>

          {/* 🔐 PROTECTED MOBILE LINKS */}
          <button
            onClick={() => {
              setMenuOpen(false);
              requireAuth("/add-car");
            }}
            className={link}
          >
            Add Car
          </button>

          <button
            onClick={() => {
              setMenuOpen(false);
              requireAuth("/my-bookings");
            }}
            className={link}
          >
            My Bookings
          </button>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-3">

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className={primary}
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className={outline}>
                  Login
                </Link>

                <Link href="/register" className={primary}>
                  Register
                </Link>
              </>
            )}

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;