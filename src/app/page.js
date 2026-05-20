import Link from "next/link";

export default function Home() {
  return (
    <div>

      <section className="bg-black text-white py-32 text-center">
        <h1 className="text-5xl font-bold">
          Drive Your Dream Car Today
        </h1>

        <p className="mt-5 text-lg">
          Premium car rental service for
          every journey.
        </p>

        <Link
          href="/explore-cars"
          className="inline-block mt-8 bg-white text-black px-6 py-3 rounded"
        >
          Explore Cars
        </Link>
      </section>

      <section className="max-w-7xl mx-auto py-20">
        <h2 className="text-4xl font-bold text-center">
          Available Cars
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-10">

          <div className="border p-5 rounded">
            <h1>BMW X5</h1>
          </div>

          <div className="border p-5 rounded">
            <h1>Toyota Corolla</h1>
          </div>

          <div className="border p-5 rounded">
            <h1>Audi A6</h1>
          </div>

        </div>
      </section>

    </div>
  );
}