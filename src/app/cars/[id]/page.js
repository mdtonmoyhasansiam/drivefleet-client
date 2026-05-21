"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import useAuth from "@/hooks/useAuth";

const CarDetailsPage = () => {

  const { id } =
    useParams();

  const router =
    useRouter();

  const { user } =
    useAuth();

  const [car, setCar] =
    useState(null);



  useEffect(() => {

    fetch(
      `http://localhost:5000/cars/${id}`
    )
      .then(res => res.json())
      .then(data => {

        setCar(data);
      });

  }, [id]);



  const handleBooking =
    async () => {

      if (!user) {

        toast.error(
          "Please Login First"
        );

        return router.push(
          "/login"
        );
      }

      const bookingData =
        {
          carId: car._id,
          carName:
            car.carName,
          image:
            car.image,
          price:
            car.dailyRentalPrice,
          userEmail:
            user.email,
        };

      try {

        const res =
          await fetch(
            "http://localhost:5000/bookings",
            {
              method:
                "POST",

              headers: {
                "content-type":
                  "application/json",
              },

              credentials:
                "include",

              body: JSON.stringify(
                bookingData
              ),
            }
          );

        const data =
          await res.json();

        if (
          data.acknowledged
        ) {

          toast.success(
            "Booking Successful"
          );
        }

        else {

          toast.error(
            data.message ||
              "Booking Failed"
          );
        }

      } catch (error) {

        toast.error(
          "Something went wrong"
        );

        console.log(
          error
        );
      }
    };



  if (!car) {

    return (
      <div
        className="
        h-screen
        flex
        justify-center
        items-center
      "
      >
        Loading...
      </div>
    );
  }



  return (

    <div>

      <Navbar />



      <div
        className="
        max-w-5xl
        mx-auto
        py-10
        px-5
      "
      >

        <img
          src={car.image}
          alt={car.carName}
          className="
          w-full
          h-[500px]
          object-cover
          rounded-xl
          mb-8
        "
        />



        <h1
          className="
          text-5xl
          font-bold
          mb-5
        "
        >
          {car.carName}
        </h1>



        <p
          className="
          text-xl
          mb-3
        "
        >
          Type:
          {" "}
          {car.carType}
        </p>



        <p
          className="
          text-xl
          mb-3
        "
        >
          Location:
          {" "}
          {car.location}
        </p>



        <p
          className="
          text-xl
          mb-3
        "
        >
          Price:
          {" "}
          $
          {car.dailyRentalPrice}
          /day
        </p>



        <p
          className="
          text-lg
          mb-6
        "
        >
          {car.description}
        </p>



        <button
          onClick={
            handleBooking
          }
          className="
          bg-black
          text-white
          px-8
          py-3
          rounded-lg
          hover:bg-gray-800
          duration-300
          cursor-pointer
        "
        >
          Book Now
        </button>

      </div>



      <Footer />

    </div>
  );
};

export default CarDetailsPage;