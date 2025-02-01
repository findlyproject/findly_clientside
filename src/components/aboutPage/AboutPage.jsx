import React from "react";
import Footer from "../footer/Footer";

export default function AboutPage() {
  return (
    <div>
      <section className="flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-10 gap-10">
      <div className="flex flex-col space-y-4">
  <img
    src="https://i.pinimg.com/736x/0a/57/bc/0a57bce7dd90b7ae5925db13dbf90996.jpg"
    className="rounded-lg shadow-md w-full lg:w-72 h-[300px] object-cover"
  />
  <img
    src="https://i.pinimg.com/736x/13/7e/22/137e223eb7b58509809d13ac4a44f3de.jpg"
    className="rounded-lg shadow-md w-full lg:w-72 h-[300px] object-cover"
  />
</div>

        <div className="flex flex-col gap-6">
          <div className="relative">
            <img
              src="https://i.pinimg.com/736x/3f/0c/80/3f0c80a54cea36207842cda6ea31d08b.jpg" // Replace with actual image
              alt="Girl using tablet"
              className="rounded-lg shadow-md w-full lg:w-72"
            />
            <span className="absolute top-2 left-2 bg-white px-3 py-1 text-black text-sm font-bold rounded">
              50%
            </span>
          </div>
        </div>

        <div className="max-w-lg text-center lg:text-left">
          <div className="bg-white shadow-md p-5 rounded-lg flex flex-col w-full lg:w-72">
            <h2 className="text-lg font-bold text-gray-800">30,000+</h2>
            <p className="text-sm text-gray-600">
              Findly has proudly connected over 50,000 job seekers with tailored
              opportunities. Trusted by over 1,000 companies!
            </p>
          </div>
          <h3 className="text-primary text-sm font-semibold tracking-wide uppercase">
            A Bit
          </h3>
          <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
          <p className="mt-4 text-gray-600">
            Welcome to Findly! We connect job seekers with their dream
            opportunities and help employers discover top talent effortlessly.
            Our platform simplifies the job search process with personalized
            recommendations, seamless applications, and real-time updates.
          </p>
          <p className="mt-2 text-gray-600">
            Whether you're seeking your next career move or the perfect
            candidate, Findly is here to make it happen.
          </p>
          <button className="mt-6 bg-primary text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700 transition">
            Explore More
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
