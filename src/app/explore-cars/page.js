"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";

const ExploreCarsPage = () => {

  const [cars, setCars] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [type, setType] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");



  useEffect(() => {

    setLoading(true);

    fetch(
      `https://drivefleet-server-zqxb.onrender.com/search-cars?search=${search}&type=${type}`
    )
      .then(res => res.json())
      .then(data => {

        setCars(data);

        setLoading(false);

        setError("");
      })
      .catch(() => {

        setLoading(false);

        setError(
          "Failed to load cars"
        );
      });

  }, [search, type]);



  return (

    <div
      className="
      bg-black
      text-white
      min-h-screen
    "
    >

      <Navbar />



      {/* HEADER */}

      <div
        className="
        text-center
        py-16
        px-5
      "
      >

        <h1
          className="
          text-5xl
          md:text-6xl
          font-extrabold
          bg-gradient-to-r
          from-indigo-500
          to-purple-600
          bg-clip-text
          text-transparent
        "
        >
          Explore Cars
        </h1>

        <p
          className="
          text-white/50
          mt-4
          text-lg
        "
        >
          Find your perfect luxury ride
        </p>

      </div>



      <div
        className="
        max-w-7xl
        mx-auto
        px-5
        pb-16
      "
      >

        {/* SEARCH & FILTER */}

        <div
          className="
          flex
          flex-col
          md:flex-row
          gap-4
          mb-10
        "
        >

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search by car name..."
            value={search}
            onChange={e =>
              setSearch(
                e.target.value
              )
            }
            className="
            w-full
            p-4
            rounded-2xl
            bg-white/5
            border
            border-white/10
            text-white
            placeholder-white/40
            outline-none
            focus:border-indigo-500
            focus:ring-2
            focus:ring-indigo-500/40
            transition
          "
          />



          {/* FILTER */}

          <select
            value={type}
            onChange={e =>
              setType(
                e.target.value
              )
            }
            className="
            w-full
            md:w-[250px]
            p-4
            rounded-2xl
            bg-[#0b0f1a]
            border
            border-indigo-500
            text-white
            outline-none
            focus:ring-2
            focus:ring-indigo-500/40
            transition
            cursor-pointer
          "
          >

            <option
              value=""
              className="
              bg-[#0b0f1a]
              text-white
            "
            >
              All Types
            </option>

            <option
              value="SUV"
              className="
              bg-[#0b0f1a]
              text-white
            "
            >
              SUV
            </option>

            <option
              value="Sedan"
              className="
              bg-[#0b0f1a]
              text-white
            "
            >
              Sedan
            </option>

            <option
              value="Sports"
              className="
              bg-[#0b0f1a]
              text-white
            "
            >
              Sports
            </option>

            <option
              value="Luxury"
              className="
              bg-[#0b0f1a]
              text-white
            "
            >
              Luxury
            </option>

            <option
              value="Electric"
              className="
              bg-[#0b0f1a]
              text-white
            "
            >
              Electric
            </option>

          </select>

        </div>



        {/* STATES */}

        {
          loading ? (

            <LoadingSpinner />

          ) : error ? (

            <div
              className="
              text-center
              text-red-400
              text-xl
              py-20
            "
            >
              {error}
            </div>

          ) : cars.length === 0 ? (

            <div
              className="
              text-center
              text-white/60
              text-xl
              py-20
            "
            >
              No Cars Found
            </div>

          ) : (

            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
            >

              {
                cars.map(car => (

                  <div
                    key={car._id}
                    className="
                    group
                    rounded-3xl
                    overflow-hidden
                    bg-white/5
                    border
                    border-white/10
                    hover:border-indigo-500
                    hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]
                    hover:scale-[1.03]
                    transition
                    duration-300
                  "
                  >

                    {/* IMAGE */}

                    <div
                      className="
                      overflow-hidden
                      relative
                    "
                    >

                      <img
                        src={car.image}
                        alt={car.carName}
                        className="
                        w-full
                        h-[240px]
                        object-cover
                        group-hover:scale-110
                        transition
                        duration-500
                      "
                      />



                      <div
                        className="
                        absolute
                        top-4
                        left-4
                        bg-gradient-to-r
                        from-indigo-500
                        to-purple-600
                        text-white
                        text-sm
                        font-semibold
                        px-4
                        py-1
                        rounded-full
                      "
                      >
                        Available
                      </div>

                    </div>



                    {/* CONTENT */}

                    <div
                      className="
                      p-6
                    "
                    >

                      <h2
                        className="
                        text-2xl
                        font-bold
                        mb-2
                      "
                      >
                        {car.carName}
                      </h2>



                      <p
                        className="
                        text-white/60
                        mb-1
                      "
                      >
                        Type:
                        {" "}
                        {car.carType}
                      </p>



                      <p
                        className="
                        text-white/60
                        mb-1
                      "
                      >
                        Location:
                        {" "}
                        {car.location}
                      </p>



                      <p
                        className="
                        text-lg
                        font-semibold
                        text-indigo-400
                        mb-5
                      "
                      >
                        $
                        {car.dailyRentalPrice}
                        /day
                      </p>



                      <Link
                        href={`/cars/${car._id}`}
                      >

                        <button
                          className="
                          w-full
                          py-3
                          rounded-full
                          bg-gradient-to-r
                          from-indigo-500
                          to-purple-600
                          hover:scale-105
                          transition
                          cursor-pointer
                          font-semibold
                        "
                        >
                          View Details
                        </button>

                      </Link>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>



      <Footer />

    </div>
  );
};

export default ExploreCarsPage;