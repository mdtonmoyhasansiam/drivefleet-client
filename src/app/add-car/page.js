"use client";

import PrivateRoute
  from "@/components/PrivateRoute";

const AddCarPage = () => {

  return (
    <PrivateRoute>

      <div className="p-10">
        <h1 className="text-4xl font-bold">
          Add Car Page
        </h1>
      </div>

    </PrivateRoute>
  );
};

export default AddCarPage;