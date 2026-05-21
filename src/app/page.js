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

const Home = () => {

  const [cars, setCars] =
    useState([]);

  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    fetch(
      "http://localhost:5000/cars"
    )
      .then(res => res.json())
      .then(data => {

        setCars(data);

        setLoading(false);
      })
      .catch(error => {

        console.log(error);

        setLoading(false);
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
        min-h-[85vh]
        flex
        justify-center
        items-center
        flex-col
        text-center
        px-5
        relative
      "
      >

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black
          via-gray-900
          to-black
          opacity-95
        "
        />



        <div
          className="
          relative
          z-10
        "
        >

          <h1
            className="
            text-5xl
            md:text-7xl
            font-extrabold
            mb-6
            leading-tight
          "
          >
            Luxury Cars <br />
            For Every Journey
          </h1>

          <p
            className="
            text-lg
            md:text-2xl
            text-gray-300
            mb-8
            max-w-2xl
            mx-auto
          "
          >
            Rent premium cars at the best price with DriveFleet.
            Fast booking, luxury experience, and trusted service.
          </p>



          <Link href="/explore-cars">

            <button
              className="
              bg-white
              text-black
              px-8
              py-4
              rounded-xl
              font-bold
              text-lg
              hover:bg-gray-200
              duration-300
              cursor-pointer
            "
            >
              Explore Cars
            </button>

          </Link>

        </div>

      </div>



      {/* STATS SECTION */}

      <div
        className="
        w-11/12
        mx-auto
        grid
        grid-cols-1
        md:grid-cols-3
        gap-8
        py-20
      "
      >

        <div
          className="
          bg-white
          shadow-xl
          rounded-2xl
          p-8
          text-center
        "
        >

          <h2
            className="
            text-5xl
            font-bold
            mb-3
          "
          >
            500+
          </h2>

          <p
            className="
            text-gray-500
            text-lg
          "
          >
            Premium Cars
          </p>

        </div>



        <div
          className="
          bg-white
          shadow-xl
          rounded-2xl
          p-8
          text-center
        "
        >

          <h2
            className="
            text-5xl
            font-bold
            mb-3
          "
          >
            24/7
          </h2>

          <p
            className="
            text-gray-500
            text-lg
          "
          >
            Customer Support
          </p>

        </div>



        <div
          className="
          bg-white
          shadow-xl
          rounded-2xl
          p-8
          text-center
        "
        >

          <h2
            className="
            text-5xl
            font-bold
            mb-3
          "
          >
            100%
          </h2>

          <p
            className="
            text-gray-500
            text-lg
          "
          >
            Trusted Service
          </p>

        </div>

      </div>



      {/* SECTION TITLE */}

      <div
        className="
        text-center
        pb-14
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

      {
        loading ? (

          <LoadingSpinner />

        ) : (

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
                hover:shadow-2xl
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
        )
      }



      {/* CTA SECTION */}

      <div
        className="
        bg-black
        text-white
        py-20
        text-center
        px-5
      "
      >

        <h2
          className="
          text-5xl
          font-bold
          mb-5
        "
        >
          Ready To Drive?
        </h2>

        <p
          className="
          text-xl
          text-gray-300
          mb-8
        "
        >
          Book your favorite car today and enjoy the ride.
        </p>

        <Link href="/explore-cars">

          <button
            className="
            bg-white
            text-black
            px-8
            py-3
            rounded-xl
            font-bold
            hover:bg-gray-200
            duration-300
            cursor-pointer
          "
          >
            Get Started
          </button>

        </Link>

      </div>



      <Footer />

    </div>
  );
};

export default Home;