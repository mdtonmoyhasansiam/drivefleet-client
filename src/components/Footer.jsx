"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 mt-20 border-t border-white/10">

      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4">
            DriveFleet
          </h2>

          <p className="text-gray-400 leading-7">
            Premium car rental platform providing luxury cars,
            affordable pricing, and trusted service.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-2xl font-bold mb-5">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-gray-400">
            <Link href="/" className="hover:text-white duration-300">
              Home
            </Link>

            <Link href="/explore-cars" className="hover:text-white duration-300">
              Explore Cars
            </Link>

            <Link href="/add-car" className="hover:text-white duration-300">
              Add Car
            </Link>

            <Link href="/booking" className="hover:text-white duration-300">
              Booking
            </Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-2xl font-bold mb-5">
            Contact
          </h3>

          <div className="text-gray-400 space-y-3">
            <p>📍 Dhaka, Bangladesh</p>
            <p>📞 +880 1234-567890</p>
            <p>✉️ support@drivefleet.com</p>
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-2xl font-bold mb-5">
            Follow Us
          </h3>

          <div className="flex gap-4">

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 hover:bg-blue-600 transition duration-300 hover:scale-110"
            >
              <FaFacebookF />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 hover:bg-pink-600 transition duration-300 hover:scale-110"
            >
              <FaInstagram />
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 hover:bg-sky-500 transition duration-300 hover:scale-110"
            >
              <FaTwitter />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 hover:bg-indigo-600 transition duration-300 hover:scale-110"
            >
              <FaLinkedinIn />
            </a>

          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 mt-14 pt-6 text-center text-gray-500 px-5">
        <p>
          © {new Date().getFullYear()} DriveFleet. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;