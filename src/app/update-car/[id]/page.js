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

import PrivateRoute from "@/routes/PrivateRoute";

import axiosSecure from "@/lib/axiosSecure";

const UpdateCarPage = () => {

  const { id } =
    useParams();

  const router =
    useRouter();

  const [car, setCar] =
    useState(null);

  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    fetch(
      `https://drivefleet-server-zqxb.onrender.com/cars/${id}`
    )
      .then(res => res.json())
      .then(data => {

        setCar(data);

        setLoading(false);
      })
      .catch(error => {

        console.log(error);

        setLoading(false);
      });

  }, [id]);



  const handleUpdateCar =
    async e => {

      e.preventDefault();

      const form = e.target;

      const updatedCar =
        {
          carName:
            form.carName.value,

          carType:
            form.carType.value,

          dailyRentalPrice:
            form.dailyRentalPrice.value,

          image:
            form.image.value,

          location:
            form.location.value,

          description:
            form.description.value,
        };

      try {

        const res =
          await axiosSecure.put(
            `/update-car/${id}`,
            updatedCar
          );

        const data =
          res.data;

        if (
          data.modifiedCount > 0
        ) {

          toast.success(
            "Car Updated Successfully"
          );

          router.push(
            "/my-cars"
          );
        }

        else {

          toast.error(
            "No Changes Made"
          );
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Update Failed"
        );
      }
    };



  if (loading) {

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

    <PrivateRoute>

      <div>

        <Navbar />



        <div
          className="
          min-h-screen
          flex
          justify-center
          items-center
        "
        >

          <form
            onSubmit={
              handleUpdateCar
            }
            className="
            border
            p-8
            rounded-xl
            w-[500px]
          "
          >

            <h1
              className="
              text-3xl
              font-bold
              mb-5
            "
            >
              Update Car
            </h1>



            <input
              type="text"
              name="carName"
              defaultValue={
                car.carName
              }
              className="
              border
              w-full
              p-3
              mb-4
            "
              required
            />



            <input
              type="text"
              name="carType"
              defaultValue={
                car.carType
              }
              className="
              border
              w-full
              p-3
              mb-4
            "
              required
            />



            <input
              type="number"
              name="dailyRentalPrice"
              defaultValue={
                car.dailyRentalPrice
              }
              className="
              border
              w-full
              p-3
              mb-4
            "
              required
            />



            <input
              type="text"
              name="image"
              defaultValue={
                car.image
              }
              className="
              border
              w-full
              p-3
              mb-4
            "
              required
            />



            <input
              type="text"
              name="location"
              defaultValue={
                car.location
              }
              className="
              border
              w-full
              p-3
              mb-4
            "
              required
            />



            <textarea
              name="description"
              defaultValue={
                car.description
              }
              className="
              border
              w-full
              p-3
              mb-4
            "
              required
            />



            <button
              className="
              bg-black
              text-white
              w-full
              py-3
              rounded-lg
              cursor-pointer
            "
            >
              Update Car
            </button>

          </form>

        </div>



        <Footer />

      </div>

    </PrivateRoute>
  );
};

export default UpdateCarPage;