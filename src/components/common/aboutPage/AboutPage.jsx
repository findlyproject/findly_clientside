import React from "react";
import Footer from "../footer/Footer";
import Image from "next/image";
import aboutimage1 from "../../../../public/assets/aboutimage1.jpg";
import aboutimage2 from "../../../../public/assets/aboutimage2.jpg";
import aboutimage3 from "../../../../public/assets/aboutimage3.jpg";

export default function AboutPage() {
  return (
    <div>
      <section className="flex flex-col lg:flex-row items-center justify-center px-4 md:px-8 lg:px-20 py-10 gap-6 lg:gap-10">
        {/* Image Section */}
        <div className="flex flex-col md:flex-row lg:flex-col gap-4 w-full lg:w-auto">
          <Image
            src={aboutimage1}
            alt="About Image 1"
            className="rounded-lg shadow-md w-full lg:w-72 h-[250px] md:h-[300px] object-cover"
          />
          <Image
            src={aboutimage2}
            alt="About Image 2"
            className="rounded-lg shadow-md w-full lg:w-72 h-[250px] md:h-[300px] object-cover"
          />
        </div>

        {/* Main Image with Badge */}
        <div className="relative w-full lg:w-auto">
          <Image
            src={aboutimage3}
            alt="Girl using tablet"
            className="rounded-lg shadow-md w-full lg:w-72 h-[300px] object-cover"
          />
          <span className="absolute top-2 left-2 bg-white px-3 py-1 text-black text-sm font-bold rounded shadow-md">
            50%
          </span>
        </div>

        {/* Text Section */}
        <div className="max-w-lg text-center lg:text-left mt-6 lg:mt-0">
          <div className="bg-white shadow-md p-5 rounded-lg w-full">
            <h2 className="text-2xl font-bold text-gray-800">30,000+</h2>
            <p className="text-gray-600 mt-2">
              Findly has proudly connected over 50,000 job seekers with tailored
              opportunities. Trusted by over 1,000 companies!
            </p>
          </div>
          <h3 className="text-purple-600 text-sm font-semibold tracking-wide uppercase mt-6">
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
          <button className="mt-6 bg-primary text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary transition w-full md:w-auto">
            Explore More
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
