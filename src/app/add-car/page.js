"use client";

import {
  useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import useAuth from "@/hooks/useAuth";

import PrivateRoute from "@/routes/PrivateRoute";

import axiosSecure from "@/lib/axiosSecure";

const AddCarPage = () => {

  const { user } =
    useAuth();

  const router =
    useRouter();



  const handleAddCar =
    async e => {

      e.preventDefault();

      const form = e.target;

      const carName =
        form.carName.value;

      const carType =
        form.carType.value;

      const dailyRentalPrice =
        form.dailyRentalPrice.value;

      const image =
        form.image.value;

      const location =
        form.location.value;

      const description =
        form.description.value;



      const carData = {
        carName,
        carType,
        dailyRentalPrice,
        image,
        location,
        description,
        booking_count: 0,
        userEmail:
          user?.email,
      };



      try {

        const res =
          await axiosSecure.post(
            "/add-car",
            carData
          );

        if (
          res.data.insertedId
        ) {

          toast.success(
            "Car Added Successfully"
          );

          form.reset();

          router.push("/");
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to Add Car"
        );
      }
    };



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
              handleAddCar
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
              Add Car
            </h1>



            <input
              type="text"
              name="carName"
              placeholder="Car Name"
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
              placeholder="Car Type"
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
              placeholder="Daily Rental Price"
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
              placeholder="Image URL"
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
              placeholder="Location"
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
              placeholder="Description"
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
              Add Car
            </button>

          </form>

        </div>



        <Footer />

      </div>

    </PrivateRoute>
  );
};

export default AddCarPage;