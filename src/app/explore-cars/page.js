"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";

const ExploreCarsPage = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    fetch(
      `http://localhost:5000/search-cars?search=${search}&type=${type}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
        setError("");
      })
      .catch(() => {
        setLoading(false);
        setError("Failed to load cars");
      });
  }, [search, type]);

  return (
    <div className="bg-black text-white">

      <Navbar />

      {/* HEADER */}
      <div className="text-center py-16 px-5">
        <h1 className="text-5xl font-bold">
          Explore Cars
        </h1>
        <p className="text-white/50 mt-3">
          Find your perfect luxury ride
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 pb-16">

        {/* 🔍 SEARCH & FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">

          <input
            type="text"
            placeholder="Search by car name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full md:w-[250px] p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="">All Types</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Sports">Sports</option>
            <option value="Luxury">Luxury</option>
          </select>

        </div>

        {/* STATES */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-400 text-xl py-20">
            {error}
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center text-white/60 text-xl py-20">
            No Cars Found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {cars.map((car) => (
              <div
                key={car._id}
                className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-indigo-500 hover:scale-[1.03] transition"
              >

                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.carName}
                    className="w-full h-[240px] object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <h2 className="text-2xl font-bold">
                    {car.carName}
                  </h2>

                  <p className="text-white/60 mt-1">
                    Type: {car.carType}
                  </p>

                  <p className="text-white/60">
                    Location: {car.location}
                  </p>

                  <p className="text-white/60 mb-4">
                    ${car.dailyRentalPrice}/day
                  </p>

                  <Link href={`/cars/${car._id}`}>
                    <button className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition cursor-pointer">
                      View Details
                    </button>
                  </Link>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />

    </div>
  );
};

export default ExploreCarsPage;