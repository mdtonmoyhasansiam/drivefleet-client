"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import LoadingSpinner
  from "@/components/LoadingSpinner";

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
      `http://localhost:5000/search-cars?search=${search}&type=${type}`
    )
      .then(res => res.json())
      .then(data => {

        setCars(data);

        setLoading(false);

        setError("");
      })
      .catch(error => {

        console.log(error);

        setLoading(false);

        setError(
          "Failed to load cars"
        );
      });

  }, [search, type]);



  return (

    <div>

      <Navbar />



      <div
        className="
        max-w-7xl
        mx-auto
        py-10
        px-5
      "
      >

        <h1
          className="
          text-5xl
          font-bold
          mb-10
          text-center
        "
        >
          Explore Cars
        </h1>



        {/* SEARCH & FILTER */}

        <div
          className="
          flex
          flex-col
          md:flex-row
          gap-5
          mb-10
        "
        >

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
            border
            p-3
            rounded-lg
            w-full
          "
          />



          <select
            value={type}
            onChange={e =>
              setType(
                e.target.value
              )
            }
            className="
            border
            p-3
            rounded-lg
            w-full
            md:w-[250px]
          "
          >

            <option value="">
              All Types
            </option>

            <option value="SUV">
              SUV
            </option>

            <option value="Sedan">
              Sedan
            </option>

            <option value="Sports">
              Sports
            </option>

            <option value="Luxury">
              Luxury
            </option>

          </select>

        </div>



        {
          loading ? (

            <LoadingSpinner />

          ) : error ? (

            <div
              className="
              text-center
              text-red-500
              text-2xl
              font-bold
              py-20
            "
            >
              {error}
            </div>

          ) : cars.length === 0 ? (

            <div
              className="
              text-center
              text-2xl
              font-semibold
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
                    border
                    rounded-2xl
                    overflow-hidden
                    shadow-lg
                    hover:scale-105
                    duration-300
                    bg-white
                  "
                  >

                    <img
                      src={car.image}
                      alt={car.carName}
                      className="
                      w-full
                      h-[240px]
                      object-cover
                    "
                    />



                    <div
                      className="
                      p-5
                    "
                    >

                      <h2
                        className="
                        text-3xl
                        font-bold
                        mb-3
                      "
                      >
                        {car.carName}
                      </h2>



                      <p
                        className="
                        mb-2
                        text-lg
                      "
                      >
                        Type:
                        {" "}
                        {car.carType}
                      </p>



                      <p
                        className="
                        mb-2
                        text-lg
                      "
                      >
                        Location:
                        {" "}
                        {car.location}
                      </p>



                      <p
                        className="
                        mb-5
                        text-lg
                      "
                      >
                        Price:
                        {" "}
                        $
                        {car.dailyRentalPrice}
                        /day
                      </p>



                      <Link
                        href={`/cars/${car._id}`}
                      >

                        <button
                          className="
                          bg-black
                          text-white
                          px-5
                          py-2
                          rounded-lg
                          hover:bg-gray-800
                          duration-300
                          cursor-pointer
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