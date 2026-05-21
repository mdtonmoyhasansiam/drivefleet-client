"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-black text-white">

      <Navbar />

      {/* 🚀 HERO SECTION (COLLAGE STYLE) */}
      <section className="relative min-h-[90vh] flex items-center px-5 overflow-hidden">

        {/* background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b0f1a] to-black" />
        <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full top-[-150px] left-[-150px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full bottom-[-150px] right-[-150px]" />

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">

          {/* LEFT TEXT */}
          <div className="flex-1 text-center lg:text-left">

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Drive Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                Dream Cars Today
              </span>
            </h1>

            <p className="mt-6 text-white/60 text-lg max-w-xl">
              Premium car rental platform with luxury vehicles, fast booking, and trusted service.
              Explore hundreds of verified cars instantly.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

              <Link
                href="/explore-cars"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition text-center"
              >
                Explore Cars
              </Link>

              <Link
                href="/add-car"
                className="px-6 py-3 rounded-full border border-white/20 text-white/70 hover:bg-white/10 transition text-center"
              >
                Add Your Car
              </Link>

            </div>

          </div>

          {/* RIGHT COLLAGE */}
          <div className="flex-1 grid grid-cols-2 gap-4">

            {/* big tile */}
            <div className="col-span-2 rounded-2xl overflow-hidden h-[250px]">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            {/* small tile 1 */}
            <div className="rounded-2xl overflow-hidden h-[150px]">
              <img
                src="https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            {/* small tile 2 */}
            <div className="rounded-2xl overflow-hidden h-[150px]">
              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

          </div>

        </div>

      </section>

      {/* 📊 STATS */}
      <section className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-20">

        {[
          { num: "500+", label: "Luxury Cars" },
          { num: "24/7", label: "Support" },
          { num: "100%", label: "Trusted Service" },
        ].map((item, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-indigo-500 hover:scale-105 transition"
          >
            <h2 className="text-5xl font-bold">{item.num}</h2>
            <p className="text-white/60 mt-2">{item.label}</p>
          </div>
        ))}

      </section>

      {/* 🚗 FEATURED CARS (6–9 ONLY) */}
      <section className="w-11/12 mx-auto py-20">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Featured Cars
          </h2>
          <p className="text-white/50 mt-3">
            Top premium picks for you
          </p>
        </div>

        {/* GRID */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {cars.slice(0, 9).map((car) => (

              <div
                key={car._id}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-indigo-500 hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] hover:scale-[1.02] transition duration-300"
              >

                {/* IMAGE (FIXED RESPONSIVE HEIGHT) */}
                <div className="w-full h-[200px] sm:h-[220px] md:h-[240px] overflow-hidden bg-black">
                  <img
                    src={car.image || "https://via.placeholder.com/400"}
                    alt={car.carName}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col flex-1">

                  <h2 className="text-lg sm:text-xl font-bold">
                    {car.carName}
                  </h2>

                  <p className="text-white/60 mt-1 text-sm sm:text-base">
                    Type: {car.carType}
                  </p>

                  <p className="text-white/60 text-sm sm:text-base">
                    Price: ${car.dailyRentalPrice}/day
                  </p>

                  {/* BUTTON FIXED BOTTOM */}
                  <div className="mt-auto pt-5">

                    <Link href={`/cars/${car._id}`}>
                      <button className="w-full px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition cursor-pointer text-sm sm:text-base">
                        View Details
                      </button>
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

        {/* VIEW ALL BUTTON */}
        <div className="text-center mt-12">
          <Link
            href="/explore-cars"
            className="inline-block px-6 py-3 rounded-full border border-white/20 text-white/70 hover:bg-white/10 transition"
          >
            View All Cars
          </Link>
        </div>

      </section>

      {/* 🚘 CARS GRID */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">

          {cars.slice(0, 6).map((car) => (
            <div
              key={car._id}
              className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-indigo-500 hover:scale-[1.03] transition"
            >

              <img
                src={car.image}
                className="h-[240px] w-full object-cover"
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold">
                  {car.carName}
                </h2>

                <p className="text-white/60 mt-1">
                  {car.carType}
                </p>

                <p className="text-white/60 mb-4">
                  ${car.dailyRentalPrice}/day
                </p>

                <Link href={`/cars/${car._id}`}>
                  <button className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition">
                    View Details
                  </button>
                </Link>

              </div>

            </div>
          ))}

        </section>
      )}

      {/* ⚡ CTA */}
      <section className="py-20 text-center bg-gradient-to-b from-black via-[#0b0f1a] to-black">

        <h2 className="text-4xl md:text-5xl font-bold">
          Ready To Drive Luxury?
        </h2>

        <p className="text-white/60 mt-4">
          Book your favorite car in seconds
        </p>

        <Link
          href="/explore-cars"
          className="inline-block mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition"
        >
          Get Started
        </Link>

      </section>

      <Footer />

    </div>
  );
};

export default Home;