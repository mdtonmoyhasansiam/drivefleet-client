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

import axiosSecure from "@/lib/axiosSecure";

const CarDetailsPage = () => {

  const { id } =
    useParams();

  const router =
    useRouter();

  const {
    user,
    loading,
  } = useAuth();

  // Test
  console.log("CAR DETAILS USER:", user);

  // const token =
  //   localStorage.getItem("token");

  const [car, setCar] =
    useState(null);

  const [bookingLoading, setBookingLoading] =
    useState(false);



  useEffect(() => {

    fetch(
      `https://drivefleet-server-zqxb.onrender.com/cars/${id}`
    )
      .then(res => res.json())
      .then(data => {

        setCar(data);
      });

  }, [id]);



  const handleBooking =
    async () => {

      if (loading) {
        return;
      }

      if (!user) {

        toast.error(
          "Please Login First"
        );

        router.push("/login");

        return;
      }

      setBookingLoading(true);

      const bookingData = {
        carId: car._id,

        carName:
          car.carName,

        image:
          car.image,

        price:
          car.dailyRentalPrice,

        userEmail:
          user?.email,

        bookingDate:
          new Date(),
      };

      try {

        const res =
          await axiosSecure.post(
            "/bookings",
            bookingData
          );

        if (
          res.data.insertedId ||
          res.data.acknowledged
        ) {

          toast.success(
            "Booking Successful"
          );
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Unauthorized Access"
        );

      } finally {

        setBookingLoading(false);
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
          // disabled={
          //   bookingLoading
          // }
          disabled={
            bookingLoading || loading
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
          disabled:opacity-50
        "
        >

          {/* {
            bookingLoading
              ? "Booking..."
              : "Book Now"
          } */}

          {
            loading
              ? "Loading..."
              : bookingLoading
                ? "Booking..."
                : "Book Now"
          }

        </button>

      </div>



      <Footer />

    </div>
  );
};

export default CarDetailsPage;