"use client";

import React from "react";
import Image from "next/image";

import jobImage from "../../../public/job.png";
import register1 from "../../../public/register-1.png"
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { FaUserPlus, FaUpload, FaCheckCircle } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import goup from "../../../public/landingPage-group-discussion.png"
import landingTop from "../../../public/landingpage-group.jpg"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function LandingPage() {


  const steps = [
    { title: "Create account", desc: "Aliquam facilisis egestas sapien.", icon: <FaUserPlus /> },
    { title: "Upload CV/Resume", desc: "Curabitur sit amet maximus ligula.", icon: <FaUpload /> },
    { title: "Find suitable job", desc: "Phasellus quis eleifend ex.", icon: <FaSearch /> },
    { title: "Apply job", desc: "Nam sodales purus.", icon: <FaCheckCircle /> },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Jane D",
      role: "CEO",
      image: "https://pagedone.io/asset/uploads/1696229969.png",
      rating: 4.9,
      feedback:
        "Pagedone has made it possible for me to stay on top of my portfolio and make informed decisions quickly and easily.",
    },
    {
      id: 2,
      name: "Harsh P.",
      role: "Product Designer",
      image: "https://pagedone.io/asset/uploads/1696229994.png",
      rating: 4.9,
      feedback:
        "Thanks to pagedone, I feel more informed and confident about my investment decisions than ever before.",
    },
    {
      id: 3,
      name: "Alex K.",
      role: "Design Lead",
      image: "https://pagedone.io/asset/uploads/1696230027.png",
      rating: 4.9,
      feedback:
        "The customer service team at pagedone went above and beyond to help me resolve a billing issue.",
    },
    {
      id: 1,
      name: "Jane D",
      role: "CEO",
      image: "https://pagedone.io/asset/uploads/1696229969.png",
      rating: 4.9,
      feedback:
        "Pagedone has made it possible for me to stay on top of my portfolio and make informed decisions quickly and easily.",
    },
    {
      id: 2,
      name: "Harsh P.",
      role: "Product Designer",
      image: "https://pagedone.io/asset/uploads/1696229994.png",
      rating: 4.9,
      feedback:
        "Thanks to pagedone, I feel more informed and confident about my investment decisions than ever before.",
    },
    {
      id: 3,
      name: "Alex K.",
      role: "Design Lead",
      image: "https://pagedone.io/asset/uploads/1696230027.png",
      rating: 4.9,
      feedback:
        "The customer service team at pagedone went above and beyond to help me resolve a billing issue.",
    },
  ];
  return (
    <div className=" w-full h-full">
      <div className="flex flex-col md:flex-row items-center justify-center   w-full  pt-40 ">

        <div className="w-full flex justify-between items-center space-x-20   ">
          <div className="md:w-1/2 text-center md:text-left   ">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
              Find a job that suits <br /> your interest & skills.
            </h1>
            <p className="text-gray-600 text-lg">
              Aliquam vitae turpis in diam convallis finibus in at risus. Nullam <br /> in
              scelerisque leo, eget sollicitudin velit vestibulum.
            </p>
            <div className="flex items-center w-full max-w-xl bg-white shadow-md rounded-lg  border-gray-300">

              <div className="flex items-center px-4 py-2 w-1/2 border-r border-gray-300">
                <FaSearch className="text-primary" />
                <input
                  type="text"
                  placeholder="Job title, Keyword..."
                  className="ml-2 w-full focus:outline-none text-gray-600 placeholder-gray-400"
                />
              </div>


              <div className="flex items-center px-4 py-2 w-1/2">
                <FaMapMarkerAlt className="text-primary" />
                <input
                  type="text"
                  placeholder="Your Location"
                  className="ml-2 w-full focus:outline-none text-gray-600 placeholder-gray-400"
                />
              </div>


              <button className="bg-primary text-white px-6 py-3 font-semibold">
                Find Job
              </button>
            </div>

          </div>








          <div className="md:w-1/2 flex justify-center ">
            <Image
              src={landingTop}
              alt="Landing Page Illustration"
              width={500}
              height={300}
              className="object-cover"
            />
          </div>
        </div>


      </div>

      <div className="flex flex-wrap justify-center gap-4 p-4">

        <div className="flex h-20  items-center border border-black w-full sm:w-60 p-4 rounded-lg shadow-md">
          <Image
            src={jobImage}
            alt="Landing Page Illustration"
            width={50}
            height={100}
            className="object-cover rounded-md"
          />
          <div className="flex flex-col ps-5 items-center">
            <span className="text-xl font-semibold">17569</span>
            <span className="text-sm text-gray-600">Live Job</span>
          </div>
        </div>


        <div className="flex h-20 ps-5  items-center border border-black w-full sm:w-60 p-4 rounded-lg shadow-md">
          <Image
            src={jobImage}
            alt="Landing Page Illustration"
            width={50}
            height={100}
            className="object-cover rounded-md "
          />
          <div className="flex flex-col items-center ps-5">
            <span className="text-xl font-semibold">17569</span>
            <span className="text-sm text-gray-600">Live Job</span>
          </div>
        </div>

        <div className="flex h-20  items-center border border-black w-full sm:w-60 p-4 rounded-lg shadow-md">
          <Image
            src={jobImage}
            alt="Landing Page Illustration"
            width={50}
            height={100}
            className="object-cover rounded-md "
          />
          <div className="flex flex-col ps-5 items-center">
            <span className="text-xl font-semibold">17569</span>
            <span className="text-sm text-gray-600">Live Job</span>
          </div>
        </div>


        <div className="flex h-20  items-center  border border-black w-full sm:w-60 p-4 rounded-lg shadow-md">
          <Image
            src={jobImage}
            alt="Landing Page Illustration"
            width={50}
            height={100}
            className="object-cover rounded-md "
          />
          <div className="flex flex-col ps-5 items-center">
            <span className="text-xl font-semibold">17569</span>
            <span className="text-sm text-gray-600">Live Job</span>
          </div>
        </div>
      </div>


  
      <div className="relative flex flex-col items-center bg-white py-20">
  {/* About Us Section */}
  <div className="relative bg-white shadow-lg p-10 flex flex-col md:flex-row items-center w-2/3 justify-center z-10">
    <div className="md:w-2/3">
      <h3 className="text-gray-500 text-sm uppercase">Who We Are</h3>
      <h1 className="text-4xl font-bold mb-4">About us</h1>
      <p className="text-gray-700 mb-4">
        Welcome to the National Hookah Community Association NHCA. We are a
        diverse alliance of businesses from all ends of the Hookah experience,
        from manufacturers & importers of molasses, pipes and accessories to
        distributors, Hookah lounges and Hookah/shisha retail stores.
      </p>
      <p className="text-gray-700 mb-4">
        If you are a Hookah business, please join us and help us defend and
        protect your business, our culture, and community.
      </p>
      <p className="text-gray-700 mb-4">
        If you are an interested member of the public, welcome. Please enjoy
        learning about Hookah and its unique culture and practice.
      </p>
      <button className="bg-black text-white px-6 py-2 rounded-full">
        Read more
      </button>
    </div>

    <Image
      src={goup}
      alt="Landing Page Illustration"
      width={300}
      height={100}
      className="object-cover rounded-md"
    />
  </div>

  {/* Blue Background Section */}
  <div className="absolute top-1/2 -mt-32 w-full h-4/6  bg-primary  flex justify-center items-center p-32 z-0"></div>
  <div className="bg-primary text-white py-10">
      <h2 className="text-center text-3xl font-bold mb-6">How Findly Work</h2>
      <div className="flex flex-wrap justify-center gap-10 px-10 items-center">
        {steps.map((step, index) => (
          <div key={index} className="text-center max-w-xs relative">
            {index > 0 && (
              <div className="absolute -left-20 top-6 w-16 h-1 border-dashed border-white border"></div>
            )}
            <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              {step.icon}
            </div>
            <h3 className="font-semibold text-lg">{step.title}</h3>
            <p className="text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
</div>

<section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-sm text-gray-500 font-medium block mb-2">
            TESTIMONIAL
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            What our happy users say!
          </h2>
        </div>

        {/* Swiper Slider */}
        <Swiper
          slidesPerView={1}
          spaceBetween={32}
          loop={true}
          centeredSlides={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 32 },
            768: { slidesPerView: 2, spaceBetween: 32 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="group bg-white border border-gray-300 rounded-xl p-6 transition-all duration-500 mx-auto hover:border-indigo-600 hover:shadow-sm">
                {/* Rating */}
                <div className="flex items-center mb-7 gap-2 text-amber-500">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="text-base font-semibold text-indigo-600">
                    {testimonial.rating}
                  </span>
                </div>

                {/* Feedback */}
                <p className="text-base text-gray-600 leading-6 pb-8 group-hover:text-gray-800">
                  {testimonial.feedback}
                </p>

                {/* User Info */}
                <div className="flex items-center gap-5 border-t border-gray-200 pt-5">
                  <img
                    className="rounded-full h-10 w-10 object-cover"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div>
                    <h5 className="text-gray-900 font-medium">{testimonial.name}</h5>
                    <span className="text-sm text-gray-500">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-10 py-10">
      {/* Candidate Section */}
      <div className="bg-gray-200 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold">Become a Candidate</h2>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full mt-4">Register Now</button>
        </div>
        <div className="md:w-1/2">
        <Image src={register1} alt="Register" width={300} height={200} />
        
        </div>
      </div>

      {/* Employer Section */}
      <div className="bg-primary text-white p-6 rounded-lg flex flex-col md:flex-row items-center justify-between relative">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold">Become an Employer</h2>
          <p>Cras in massa pellentesque, mollis ligula non, luctus dui.</p>
          <button className="bg-white text-blue-600 px-5 py-2 rounded-full mt-4">Register Now</button>
        </div>
        <div className="md:w-1/2 flex justify-end">
     <Image src={register1} alt="Register" width={300} height={200} />
        </div>
      </div>
    </div>
    </div>


    


  );
}

export default LandingPage;



