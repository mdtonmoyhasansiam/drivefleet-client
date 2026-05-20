"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-5">
      <div className="max-w-7xl mx-auto flex gap-5">
        <Link href="/">Home</Link>

        <Link href="/explore-cars">
          Explore Cars
        </Link>

        <Link href="/add-car">
          Add Car
        </Link>

        <Link href="/my-bookings">
          My Bookings
        </Link>

        <Link href="/login">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;