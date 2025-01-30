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

function LandingPage() {


  const steps = [
    { title: "Create account", desc: "Aliquam facilisis egestas sapien.", icon: <FaUserPlus /> },
    { title: "Upload CV/Resume", desc: "Curabitur sit amet maximus ligula.", icon: <FaUpload /> },
    { title: "Find suitable job", desc: "Phasellus quis eleifend ex.", icon: <FaSearch /> },
    { title: "Apply job", desc: "Nam sodales purus.", icon: <FaCheckCircle /> },
  ];

  const testimonials = [
    {
      name: "Robert Fox",
      role: "UI/UX Designer",
      text: "Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas at placerat metus, in faucibus est.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Bessie Cooper",
      role: "Creative Director",
      text: "Mauris eget lorem odio. Mauris convallis justo in molestie metus aliquam lacinia.",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Jane Cooper",
      role: "Photographer",
      text: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      name: "Jane Cooper",
      role: "Photographer",
      text: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      name: "Jane Cooper",
      role: "Photographer",
      text: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      name: "Jane Cooper",
      role: "Photographer",
      text: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "https://randomuser.me/api/portraits/women/12.jpg"
    }
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
                <FaSearch className="text-purple-600" />
                <input
                  type="text"
                  placeholder="Job title, Keyword..."
                  className="ml-2 w-full focus:outline-none text-gray-600 placeholder-gray-400"
                />
              </div>


              <div className="flex items-center px-4 py-2 w-1/2">
                <FaMapMarkerAlt className="text-purple-600" />
                <input
                  type="text"
                  placeholder="Your Location"
                  className="ml-2 w-full focus:outline-none text-gray-600 placeholder-gray-400"
                />
              </div>


              <button className="bg-purple-600 text-white px-6 py-3 font-semibold">
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
  <div className="absolute top-1/2 -mt-32 w-full h-4/6  bg-purple-600  flex justify-center items-center p-32 z-0"></div>
  <div className="bg-purple-700 text-white py-10">
      <h2 className="text-center text-3xl font-bold mb-6">How Findly Work</h2>
      <div className="flex flex-wrap justify-center gap-10 px-10 items-center">
        {steps.map((step, index) => (
          <div key={index} className="text-center max-w-xs relative">
            {index > 0 && (
              <div className="absolute -left-20 top-6 w-16 h-1 border-dashed border-white border"></div>
            )}
            <div className="w-16 h-16 bg-white text-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              {step.icon}
            </div>
            <h3 className="font-semibold text-lg">{step.title}</h3>
            <p className="text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
</div>

<div className="bg-white py-10 px-5 mt-28 text-center relative">
      <div className="flex justify-center gap-5 overflow-hidden">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white shadow-lg p-5 rounded-lg max-w-sm">
            <div className="text-yellow-500 text-xl mb-2">★★★★★</div>
            <p className="text-gray-700 italic">{testimonial.text}</p>
            <div className="flex items-center mt-4">
              <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full mr-3" />
              <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full mr-3" />
              <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 left-5 text-gray-400 cursor-pointer"><FaArrowLeft /></div>
      <div className="absolute top-1/2 right-5 text-gray-400 cursor-pointer"><FaArrowRight /></div>
    </div>

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
      <div className="bg-purple-700 text-white p-6 rounded-lg flex flex-col md:flex-row items-center justify-between relative">
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



