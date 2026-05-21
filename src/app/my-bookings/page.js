"use client";

import {
  useEffect,
  useState,
} from "react";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import LoadingSpinner
  from "@/components/LoadingSpinner";

import useAuth from "@/hooks/useAuth";

const MyBookingsPage = () => {

  const { user } =
    useAuth();

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);



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

          setLoading(false);
        })
        .catch(error => {

          console.log(error);

          setLoading(false);
        });
    }

  }, [user]);



  if (loading) {

    return (
      <LoadingSpinner />
    );
  }



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



        {
          bookings.length === 0 ? (

            <div
              className="
              text-center
              mt-20
            "
            >

              <h2
                className="
                text-3xl
                font-bold
                mb-3
              "
              >
                No Bookings Found
              </h2>

              <p
                className="
                text-gray-500
              "
              >
                You have not booked any cars yet.
              </p>

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
                      hover:shadow-2xl
                      duration-300
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
          )
        }

      </div>



      <Footer />

    </div>
  );
};

export default MyBookingsPage;