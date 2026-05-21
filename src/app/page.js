"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

const Home = () => {

  const [cars, setCars] =
    useState([]);

  useEffect(() => {

    fetch(
      "http://localhost:5000/cars"
    )
      .then(res => res.json())
      .then(data => {

        setCars(data);
      });

  }, []);

  return (

    <div>

      <Navbar />



      {/* HERO SECTION */}

      <div
        className="
        bg-black
        text-white
        h-[70vh]
        flex
        justify-center
        items-center
        flex-col
        text-center
        px-5
      "
      >

        <h1
          className="
          text-6xl
          font-bold
          mb-5
        "
        >
          DriveFleet
        </h1>

        <p
          className="
          text-2xl
          mb-8
        "
        >
          Premium Car Rental Platform
        </p>

        <Link href="/explore-cars">

          <button
            className="
            bg-white
            text-black
            px-8
            py-3
            rounded-lg
            font-semibold
            hover:bg-gray-200
            duration-300
            cursor-pointer
          "
          >
            Explore Cars
          </button>

        </Link>

      </div>



      {/* SECTION TITLE */}

      <div
        className="
        text-center
        py-16
      "
      >

        <h2
          className="
          text-5xl
          font-bold
          mb-4
        "
        >
          Featured Cars
        </h2>

        <p
          className="
          text-gray-600
          text-lg
        "
        >
          Choose your dream car
        </p>

      </div>



      {/* CARS SECTION */}

      <div
        className="
        w-11/12
        mx-auto
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
        pb-20
      "
      >

        {cars.slice(0, 6).map(car => (

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
              alt=""
              className="
              h-[250px]
              w-full
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
        ))}

      </div>

      <Footer />

    </div>
  );
};

export default Home;