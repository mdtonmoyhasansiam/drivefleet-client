"use client";

import {
  useEffect,
  useState,
} from "react";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import useAuth from "@/hooks/useAuth";

const MyBookingsPage = () => {

  const { user } =
    useAuth();

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {

    if (user?.email) {

      fetch(
        `http://localhost:5000/my-bookings/${user.email}`,
        {
          credentials:
            "include",
        }
      )
        .then(res => res.json())
        .then(data => {

          setBookings(data);
        });
    }

  }, [user]);



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
          My Bookings
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
            bookings.map(
              booking => (

                <div
                  key={
                    booking._id
                  }
                  className="
                  border
                  rounded-xl
                  overflow-hidden
                  shadow-lg
                "
                >

                  <img
                    src={
                      booking.image
                    }
                    alt={
                      booking.carName
                    }
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
                      mb-3
                    "
                    >
                      {
                        booking.carName
                      }
                    </h2>



                    <p
                      className="
                      text-lg
                    "
                    >
                      Price:
                      {" "}
                      $
                      {
                        booking.price
                      }
                    </p>

                  </div>

                </div>
              )
            )
          }

        </div>

      </div>



      <Footer />

    </div>
  );
};

export default MyBookingsPage;