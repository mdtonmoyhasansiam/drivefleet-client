"use client";

import {
  useEffect,
  useState,
} from "react";

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
        h-[50vh]
        flex
        justify-center
        items-center
        flex-col
      "
      >

        <h1
          className="
          text-5xl
          font-bold
          mb-5
        "
        >
          DriveFleet
        </h1>

        <p
          className="
          text-xl
        "
        >
          Car Rental Platform
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
        gap-6
        mb-20
      "
      >

        {cars.map(car => (

          <div
            key={car._id}
            className="
            border
            p-5
            rounded-xl
          "
          >

            <img
              src={car.image}
              alt=""
              className="
              h-[220px]
              w-full
              object-cover
              rounded-lg
              mb-4
            "
            />

            <h2
              className="
              text-2xl
              font-bold
            "
            >
              {car.carName}
            </h2>

            <p
              className="
              mt-2
            "
            >
              Type:
              {" "}
              {car.carType}
            </p>

            <p
              className="
              mt-2
            "
            >
              Price:
              {" "}
              $
              {car.dailyRentalPrice}
            </p>

          </div>
        ))}

      </div>

      <Footer />

    </div>
  );
};

export default Home;