"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import Swal from "sweetalert2";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import useAuth from "@/hooks/useAuth";

import PrivateRoute from "@/routes/PrivateRoute";

const MyCarsPage = () => {

  const { user } =
    useAuth();

  const [cars, setCars] =
    useState([]);

  useEffect(() => {

    if (user?.email) {

      fetch(
        `http://localhost:5000/my-cars/${user.email}`,
        {
          credentials:
            "include",
        }
      )
        .then(res => res.json())
        .then(data => {

          setCars(data);
        });
    }

  }, [user]);



  const handleDelete =
    id => {

      Swal.fire({
        title:
          "Are you sure?",

        text:
          "You won't be able to revert this!",

        icon:
          "warning",

        showCancelButton:
          true,

        confirmButtonColor:
          "#d33",

        cancelButtonColor:
          "#3085d6",

        confirmButtonText:
          "Yes, delete it!",
      }).then(
        result => {

          if (
            result.isConfirmed
          ) {

            fetch(
              `http://localhost:5000/delete-car/${id}`,
              {
                method:
                  "DELETE",

                credentials:
                  "include",
              }
            )
              .then(res =>
                res.json()
              )
              .then(data => {

                if (
                  data.deletedCount >
                  0
                ) {

                  Swal.fire({
                    title:
                      "Deleted!",

                    text:
                      "Car has been deleted.",

                    icon:
                      "success",
                  });

                  const remaining =
                    cars.filter(
                      car =>
                        car._id !==
                        id
                    );

                  setCars(
                    remaining
                  );
                }
              });
          }
        }
      );
    };



  return (

    <PrivateRoute>

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
            My Cars
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
              cars.map(
                car => (

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
                        mb-3
                      "
                      >
                        {
                          car.carName
                        }
                      </h2>



                      <p
                        className="
                        mb-2
                      "
                      >
                        Type:
                        {" "}
                        {
                          car.carType
                        }
                      </p>



                      <p
                        className="
                        mb-2
                      "
                      >
                        Price:
                        {" "}
                        $
                        {
                          car.dailyRentalPrice
                        }
                      </p>



                      <div
                        className="
                        flex
                        gap-3
                        mt-5
                      "
                      >

                        <Link
                          href={`/update-car/${car._id}`}
                        >

                          <button
                            className="
                            bg-blue-500
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            cursor-pointer
                          "
                          >
                            Update
                          </button>

                        </Link>



                        <button
                          onClick={() =>
                            handleDelete(
                              car._id
                            )
                          }
                          className="
                          bg-red-500
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          cursor-pointer
                        "
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>
                )
              )
            }

          </div>

        </div>



        <Footer />

      </div>

    </PrivateRoute>
  );
};

export default MyCarsPage;