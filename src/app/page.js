import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

export default function Home() {

  return (

    <div>

      <Navbar />

      <div
        className="
        h-[80vh]
        flex
        justify-center
        items-center
        flex-col
      "
      >

        <h1
          className="
          text-5xl
          font-bold
          mb-5
        "
        >
          DriveFleet
        </h1>

        <p
          className="
          text-xl
        "
        >
          Car Rental Platform
        </p>

      </div>

      <Footer />

    </div>
  );
}