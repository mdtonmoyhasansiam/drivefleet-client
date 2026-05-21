"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

const ExploreCarsPage = () => {

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
          text-4xl
          font-bold
          mb-8
          text-center
        "
        >
          Explore Cars
        </h1>



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
                rounded-xl
                overflow-hidden
                shadow-lg
              "
              >

                <img
                  src={car.image}
                  alt={car.carName}
                  className="
                  w-full
                  h-[220px]
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
                    text-2xl
                    font-bold
                    mb-2
                  "
                  >
                    {car.carName}
                  </h2>



                  <p
                    className="
                    mb-2
                  "
                  >
                    Type:
                    {" "}
                    {car.carType}
                  </p>



                  <p
                    className="
                    mb-2
                  "
                  >
                    Location:
                    {" "}
                    {car.location}
                  </p>



                  <p
                    className="
                    mb-4
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

      </div>



      <Footer />

    </div>
  );
};

export default ExploreCarsPage;