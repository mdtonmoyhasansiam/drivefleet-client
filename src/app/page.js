"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";

const Home = () => {

  const [cars, setCars] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetch(
      "http://localhost:5000/featured-cars"
    )
      .then(res => res.json())
      .then(data => {

        setCars(data);

        setLoading(false);
      })
      .catch(() => {

        setLoading(false);
      });

  }, []);

  return (

    <div className="bg-black text-white overflow-hidden">

      <Navbar />

      {/* HERO SECTION */}

      <section
        className="
        relative
        min-h-screen
        flex
        items-center
        px-4
        sm:px-6
        lg:px-8
        overflow-hidden
        py-20
      "
      >

        {/* BACKGROUND */}

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-b
          from-black
          via-[#0b0f1a]
          to-black
        "
        />

        <div
          className="
          absolute
          w-[300px]
          sm:w-[500px]
          h-[300px]
          sm:h-[500px]
          bg-indigo-600/20
          blur-[120px]
          rounded-full
          top-[-100px]
          left-[-100px]
        "
        />

        <div
          className="
          absolute
          w-[300px]
          sm:w-[500px]
          h-[300px]
          sm:h-[500px]
          bg-purple-600/20
          blur-[120px]
          rounded-full
          bottom-[-100px]
          right-[-100px]
        "
        />

        <div
          className="
          relative
          z-10
          max-w-7xl
          mx-auto
          w-full
          flex
          flex-col-reverse
          lg:flex-row
          items-center
          gap-10
          lg:gap-16
        "
        >

          {/* LEFT CONTENT */}

          <div
            className="
            flex-1
            text-center
            lg:text-left
          "
          >

            <h1
              className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-extrabold
              leading-tight
            "
            >
              Drive Your

              <span
                className="
                block
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-indigo-500
                to-purple-600
              "
              >
                Dream Cars Today
              </span>

            </h1>

            <p
              className="
              mt-5
              text-white/60
              text-base
              sm:text-lg
              max-w-xl
              mx-auto
              lg:mx-0
              leading-relaxed
            "
            >
              Premium car rental platform with luxury vehicles,
              fast booking, and trusted service.
              Explore hundreds of verified cars instantly.
            </p>

            <div
              className="
              mt-8
              flex
              flex-col
              sm:flex-row
              gap-4
              justify-center
              lg:justify-start
            "
            >

              <Link
                href="/explore-cars"
                className="
                px-7
                py-3
                rounded-full
                bg-gradient-to-r
                from-indigo-500
                to-purple-600
                hover:scale-105
                duration-300
                text-center
                font-semibold
              "
              >
                Explore Cars
              </Link>

              <Link
                href="/add-car"
                className="
                px-7
                py-3
                rounded-full
                border
                border-white/20
                text-white/70
                hover:bg-white/10
                duration-300
                text-center
                font-semibold
              "
              >
                Add Your Car
              </Link>

            </div>

          </div>

          {/* RIGHT COLLAGE */}

          <div
            className="
            flex-1
            w-full
            max-w-xl
            grid
            grid-cols-2
            gap-3
            sm:gap-4
          "
          >

            {/* BIG IMAGE */}

            <div
              className="
              col-span-2
              rounded-2xl
              overflow-hidden
              h-[220px]
              sm:h-[300px]
              md:h-[350px]
            "
            >

              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Car"
                className="
                w-full
                h-full
                object-cover
                hover:scale-110
                duration-500
              "
              />

            </div>

            {/* SMALL IMAGE 1 */}

            <div
              className="
              rounded-2xl
              overflow-hidden
              h-[130px]
              sm:h-[180px]
            "
            >

              <img
                src="https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80"
                alt="Sports Car"
                className="
                w-full
                h-full
                object-cover
                hover:scale-110
                duration-500
              "
              />

            </div>

            {/* SMALL IMAGE 2 */}

            <div
              className="
              rounded-2xl
              overflow-hidden
              h-[130px]
              sm:h-[180px]
            "
            >

              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury SUV"
                className="
                w-full
                h-full
                object-cover
                hover:scale-110
                duration-500
              "
              />

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section
        className="
        w-11/12
        max-w-7xl
        mx-auto
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
        py-16
      "
      >

        {[
          {
            num: "500+",
            label: "Luxury Cars",
          },

          {
            num: "24/7",
            label: "Support",
          },

          {
            num: "100%",
            label: "Trusted Service",
          },

        ].map((item, i) => (

          <div
            key={i}
            className="
            p-8
            rounded-2xl
            bg-white/5
            border
            border-white/10
            text-center
            hover:border-indigo-500
            hover:scale-105
            duration-300
          "
          >

            <h2
              className="
              text-4xl
              sm:text-5xl
              font-bold
            "
            >
              {item.num}
            </h2>

            <p
              className="
              text-white/60
              mt-2
              text-sm
              sm:text-base
            "
            >
              {item.label}
            </p>

          </div>
        ))}

      </section>

      {/* FEATURED CARS */}

      <section
        className="
        w-11/12
        max-w-7xl
        mx-auto
        py-16
      "
      >

        {/* TITLE */}

        <div className="text-center mb-12">

          <h2
            className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-bold
          "
          >
            Featured Cars
          </h2>

          <p
            className="
            text-white/50
            mt-3
            text-sm
            sm:text-base
          "
          >
            Top premium picks for you
          </p>

        </div>

        {/* CARS */}

        {
          loading ? (

            <LoadingSpinner />

          ) : (

            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-6
            "
            >

              {cars.map(car => (

                <div
                  key={car._id}
                  className="
                  group
                  flex
                  flex-col
                  rounded-2xl
                  overflow-hidden
                  bg-white/5
                  border
                  border-white/10
                  hover:border-indigo-500
                  hover:shadow-[0_0_25px_rgba(99,102,241,0.3)]
                  hover:scale-[1.02]
                  duration-300
                "
                >

                  {/* IMAGE */}

                  <div
                    className="
                    w-full
                    h-[220px]
                    sm:h-[240px]
                    overflow-hidden
                  "
                  >

                    <img
                      src={
                        car.image ||
                        "https://via.placeholder.com/400"
                      }
                      alt={car.carName}
                      className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-110
                      duration-500
                    "
                    />

                  </div>

                  {/* CONTENT */}

                  <div
                    className="
                    p-5
                    flex
                    flex-col
                    flex-1
                  "
                  >

                    <h2
                      className="
                      text-xl
                      font-bold
                    "
                    >
                      {car.carName}
                    </h2>

                    <p
                      className="
                      text-white/60
                      mt-2
                    "
                    >
                      Type: {car.carType}
                    </p>

                    <p
                      className="
                      text-white/60
                    "
                    >
                      Price: ${car.dailyRentalPrice}/day
                    </p>

                    <div className="mt-auto pt-5">

                      <Link
                        href={`/cars/${car._id}`}
                      >

                        <button
                          className="
                          w-full
                          px-5
                          py-3
                          rounded-full
                          bg-gradient-to-r
                          from-indigo-500
                          to-purple-600
                          hover:scale-105
                          duration-300
                          cursor-pointer
                          font-semibold
                        "
                        >
                          View Details
                        </button>

                      </Link>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )
        }

        {/* VIEW ALL */}

        <div className="text-center mt-12">

          <Link
            href="/explore-cars"
            className="
            inline-block
            px-7
            py-3
            rounded-full
            border
            border-white/20
            text-white/70
            hover:bg-white/10
            duration-300
          "
          >
            View All Cars
          </Link>

        </div>

      </section>

      {/* CTA */}

      <section
        className="
        py-20
        text-center
        bg-gradient-to-b
        from-black
        via-[#0b0f1a]
        to-black
        px-4
      "
      >

        <h2
          className="
          text-3xl
          sm:text-4xl
          md:text-5xl
          font-bold
        "
        >
          Ready To Drive Luxury?
        </h2>

        <p
          className="
          text-white/60
          mt-4
          text-sm
          sm:text-base
        "
        >
          Book your favorite car in seconds
        </p>

        <Link
          href="/explore-cars"
          className="
          inline-block
          mt-8
          px-7
          py-3
          rounded-full
          bg-gradient-to-r
          from-indigo-500
          to-purple-600
          hover:scale-105
          duration-300
          font-semibold
        "
        >
          Get Started
        </Link>

      </section>

      <Footer />

    </div>
  );
};

export default Home;