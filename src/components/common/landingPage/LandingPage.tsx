"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import goup from "../../../../public/landingPage-group-discussion.png";
import { AnimatedTestimonials } from "./Testimonial";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import CountUp from "react-countup";
import { toast } from "react-toastify";
import { formChangeEvent } from "@/types/Types";
import { PlaceholdersAndVanishInput } from "@/Animation/PlaceholdersAndVanishInput";

function LandingPage() {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const placeholders = [
    "Search for software developer jobs...",
    "Find remote marketing positions...",
    "Explore data analyst roles near you...",
    "Look for entry-level finance jobs...",
    "Discover UI/UX design opportunities...",
  ];
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    showUsers();
    showCompanies();
    findrevenue();
  }, []);

  const showUsers = async () => {
    const response = await api.get("/user/allusers");
    const data = response.data.allUsers;
    setUsers(data);
  };

  const showCompanies = async () => {
    const response = await api.get("/company/allcompanies");
    const data = response.data.companies;
    setCompanies(data);
  };

  const findrevenue = async () => {
    const response = await api.get("/user/findprimeclients");
    const data = response.data.primeClients;
    setRevenue(data);
  };

  const router = useRouter();

  const onSubmit = (e: formChangeEvent) => {
    e.preventDefault();
    toast.error("please login");
  };

  return (
    <div className="w-full h-full ">
      <>
        <section className="relative overflow-hidden bg-primary pt-16 pb-24">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4">
            <div className="w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4">
            <div className="w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-pink-500 opacity-20 blur-3xl"></div>
          </div>

          {/* Main content container */}
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
              {/* Left column - Text and search */}
              <div className="relative z-10">
                {/* Main heading with animation component */}
                <div className="relative">
                  <span className="absolute -left-3 -top-6 text-6xl text-white opacity-10">
                    ❝
                  </span>
                  <h1 className="pl-8 text-4xl font-bold text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                    Connecting You with Employers
                  </h1>
                  <span className="absolute -right-3 -bottom-6 text-6xl text-white opacity-10 rotate-180">
                    ❝
                  </span>
                </div>

                {/* Subtitle with animation component */}
                <p className="mt-6 text-lg font-normal text-gray-300 sm:mt-8">
                  {" "}
                  Find your dream job effortlessly! Create your profile, upload
                  your resume, and explore opportunities that match your skills.
                  Take the next step in your career today!{" "}
                </p>

                {/* Enhanced search bar */}
                <div className="relative mt-10 sm:mt-12">
                  <div className="relative group">
                    {/* Gradient border effect */}
                    <div className="absolute rounded-full -inset-px bg-gradient-to-r from-white via-purple-500 to-pink-500 opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative bg-white rounded-full shadow-xl">
                      <div className="flex items-center">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                          <svg
                            className="w-5 h-5 text-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                        {/* Search input component */}
                        <div className="w-full">
                          <PlaceholdersAndVanishInput
                            placeholders={placeholders}
                            onChange={handleChange}
                            onSubmit={onSubmit}
                          />
                        </div>
                       
                       
                      </div>
                    </div>
                  </div>

                  {/* Search suggestions */}
                  <div className="flex flex-wrap gap-2 mt-4 px-2">
                    <span className="text-xs text-gray-400">Popular:</span>
                    {[
                      "Remote",
                      "Full-time",
                      "Engineering",
                      "Design",
                      "Marketing",
                    ].map((tag) => (
                      <button
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20 transition"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trust indicators with enhanced styling */}
                <div className="mt-10 sm:mt-12">
                  

                  <div className="flex items-center mt-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-full px-4 py-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-5 h-5 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-base font-medium text-white">
                      4.1/5
                    </span>
                    <span className="ml-1 text-base text-gray-300">
                      (14k Reviews)
                    </span>

                    {/* Testimonial preview */}
                    <div className="hidden md:flex ml-4 items-center">
                      <div className="w-px h-6 bg-gray-500"></div>
                      <span className="ml-4 text-xs italic text-gray-300">
                        Found my dream job in just 2 weeks!
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Illustration */}
              <div className="relative">
                <div className="absolute inset-0">
                  <svg
                    className="blur-3xl filter opacity-40"
                    width="100%"
                    height="100%"
                    viewBox="0 0 444 536"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z"
                      fill="url(#gradient-blob)"
                    />
                    <defs>
                      <linearGradient
                        id="gradient-blob"
                        x1="82.7339"
                        y1="550.792"
                        x2="-39.945"
                        y2="118.965"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#9333ea" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* 3D Mockup - Replace with your actual image */}
                <div className="relative z-10 mx-auto max-w-lg mb-4 xl:max-w-none">
                  <div className="relative perspective-1000">
                    {/* Main device mockup */}
                    <div className="relative transform -rotate-6 translate-y-8 rounded-xl shadow-2xl bg-gray-900 border border-gray-700 overflow-hidden">
                      <div className="h-6 bg-gray-800 flex items-center px-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                      </div>
                      <div className="bg-gray-100 p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="h-6 w-32 bg-primary rounded-md"></div>
                            <div className="mt-2 h-4 w-24 bg-gray-300 rounded-md"></div>
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {[1, 2, 3].map((item) => (
                            <div
                              key={item}
                              className="bg-white p-3 rounded-lg shadow flex"
                            >
                              <div className="w-12 h-12 rounded-md bg-primary"></div>
                              <div className="ml-3 flex-1">
                                <div className="h-4 w-3/4 bg-gray-300 rounded-md"></div>
                                <div className="mt-2 h-3 w-1/2 bg-gray-200 rounded-md"></div>
                                <div className="mt-2 flex justify-between items-center">
                                  <div className="h-3 w-1/4 bg-gray-200 rounded-md"></div>
                                  <div className="h-5 w-20 bg-green-100 rounded-md"></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute top-12 -right-8 transform rotate-12 bg-white p-3 rounded-lg shadow-lg w-32">
                      <div className="h-3 w-full bg-gray-200 rounded-full"></div>
                      <div className="mt-2 h-10 w-full bg-green-100 rounded-md flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-green-500"></div>
                      </div>
                    </div>

                    <div className="absolute -bottom-4 -left-4 transform -rotate-12 bg-white p-3 rounded-lg shadow-lg w-32">
                      <div className="h-3 w-full bg-gray-200 rounded-full"></div>
                      <div className="mt-2 flex space-x-1">
                        <div className="h-4 w-4 bg-yellow-400 rounded-sm"></div>
                        <div className="h-4 w-4 bg-green-400 rounded-sm"></div>
                        <div className="h-4 w-4 bg-blue-400 rounded-sm"></div>
                        <div className="h-4 w-4 bg-purple-400 rounded-sm"></div>
                        <div className="h-4 w-4 bg-pink-400 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg
              className="w-full h-auto"
              viewBox="0 0 1440 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 24.5C280 74.5 720 0 1440 24.5V74H0V24.5Z"
                fill="white"
                fillOpacity="0.05"
              />
            </svg>
          </div>
        </section>
      </>

      <section className="relative bg-primary pb-32 overflow-hidden">
  {/* Decorative background elements */}
  <div className="absolute left-0 top-0 -translate-y-1/4 -translate-x-1/4">
    <div className="w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
  </div>
  <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4">
    <div className="w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
  </div>
  
  {/* Stats Counter Section */}
  <div className="mx-auto max-w-7xl mt-10 px-4 sm:px-6 lg:px-8 relative z-10">
    
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
      {/* Expert Consultants */}
      <div className="relative group">
        <div className="absolute rounded-xl -inset-1 bg-gradient-to-r from-purple-600 to-indigo-400 opacity-30 blur-lg group-hover:opacity-60 transition duration-300"></div>
        <div className="relative border-b pb-10 sm:border-r sm:border-b-0 border-gray-700 bg-primary bg-opacity-50 backdrop-filter backdrop-blur-sm p-6 rounded-xl">
          <div className="font-manrope font-bold text-5xl text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            <CountUp start={0} end={260} duration={2.5} />+
          </div>
          <span className="text-xl text-gray-100 block">Expert Consultants</span>
        </div>
      </div>

      {/* Active Users */}
      <div className="relative group">
        <div className="absolute rounded-xl -inset-1 bg-gradient-to-r from-purple-600 to-indigo-400 opacity-30 blur-lg group-hover:opacity-60 transition duration-300"></div>
        <div className="relative border-b pb-10 sm:border-r sm:border-b-0 border-gray-700 bg-primary bg-opacity-50 backdrop-filter backdrop-blur-sm p-6 rounded-xl">
          <div className="font-manrope font-bold text-5xl text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            <CountUp start={0} end={users.length} duration={2.5} />+
          </div>
          <span className="text-xl text-gray-100 block">Active Users</span>
        </div>
      </div>

      {/* Active Companies */}
      <div className="relative group">
        <div className="absolute rounded-xl -inset-1 bg-gradient-to-r from-purple-600 to-indigo-400 opacity-30 blur-lg group-hover:opacity-60 transition duration-300"></div>
        <div className="relative border-b pb-10 sm:border-r sm:border-b-0 border-gray-700 bg-primary bg-opacity-50 backdrop-filter backdrop-blur-sm p-6 rounded-xl">
          <div className="font-manrope font-bold text-5xl text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            <CountUp start={0} end={companies.length} duration={2.5} />+
          </div>
          <span className="text-xl text-gray-100 block">Active Companies</span>
        </div>
      </div>

      {/* Prime Clients */}
      <div className="relative group">
        <div className="absolute rounded-xl -inset-1 bg-gradient-to-r from-purple-600 to-indigo-400 opacity-30 blur-lg group-hover:opacity-60 transition duration-300"></div>
        <div className="relative bg-primary bg-opacity-50 backdrop-filter backdrop-blur-sm p-6 rounded-xl">
          <div className="font-manrope font-bold text-5xl text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            <CountUp start={0} end={revenue.length} duration={2.5} />+
          </div>
          <span className="text-xl text-gray-100 block">Prime Clients</span>
        </div>
      </div>
    </div>
  </div>
  
  {/* About Us Section */}
  <div className="relative flex flex-col items-center mt-20 py-18 z-10">
  {/* Simplified background - reduced opacity and blur */}
  <div className="absolute inset-0">
    <svg
      className="blur-2xl filter opacity-20"
      width="100%"
      height="100%"
      viewBox="0 0 444 536"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z"
        fill="#7e22ce"
        opacity="0.7"
      />
    </svg>
  </div>
  
  {/* About card with simplified border effect */}
  <div className="relative w-full max-w-5xl mx-auto">
    {/* Simplified border - single color, less blur */}
    <div className="absolute rounded-2xl -inset-1 bg-purple-600 opacity-40 blur-sm"></div>
    
    <div className="relative bg-white shadow-xl rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-10 z-10">
      <div className="md:w-2/3">
        <div className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">Who We Are</div>
        <h1 className="text-4xl font-bold mb-6 text-purple-700">About us</h1>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          Findly is an innovative job hunting website designed to simplify
          the job search process for both job seekers and employers. With
          its user-friendly interface, Findly allows candidates to easily
          browse job listings across various industries, upload their
          resumes, and apply for positions with just a few clicks.
        </p>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          The platform also features advanced filtering tools that help
          users tailor their search based on criteria such as location,
          job type, and salary.
        </p>
        
        <p className="text-gray-700 mb-6 leading-relaxed">
          Employers benefit from a streamlined hiring process, with access
          to a diverse pool of qualified candidates, customizable job
          postings, and tools for managing applications.
        </p>
        
        <button
          onClick={() => router.push(`/about`)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition-colors duration-300 flex items-center"
        >
          Read more
          <svg 
            className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
      
      <div className="md:w-1/3 relative">
        {/* Simplified image decoration */}
        <div className="absolute -inset-2 bg-purple-500 opacity-20 rounded-xl"></div>
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          <Image
            src={goup}
            alt="About Us Illustration"
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />
          {/* Removed overlay gradient */}
        </div>
      </div>
    </div>
  </div>
</div>
  
  {/* Bottom wave */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden">
    <svg
      className="w-full h-auto"
      viewBox="0 0 1440 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 24.5C280 74.5 720 0 1440 24.5V74H0V24.5Z"
        fill="white"
        fillOpacity="0.05"
      />
    </svg>
  </div>
</section>

      {/* how it work  */}
      <div className="relative flex flex-col items-center py-18 bg-gray-100">
        {/* Main Container */}
        <section className="py-16 relative w-full max-w-7xl px-4 md:px-8 mx-auto">
          {/* Heading Section - Properly Centered */}
          <div className="flex flex-col justify-center items-center text-center w-full mb-16">
            <h2 className="text-gray-900 text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              How It{" "}
              <span className="text-primary">
                {/* Using "text-primary" assuming you have this in your Tailwind config */}
                Works
              </span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              A streamlined journey to your dream job in four simple steps
            </p>
            <div className="mt-8 w-24 h-1 bg-primary rounded-full"></div>
          </div>

          {/* Two Column Layout - Fixed Alignment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Step Timeline */}
            <div className="hidden lg:block relative pl-4">
              <div className="absolute left-4 top-0 bottom-0 w-1 bg-primary transform -translate-x-1/2"></div>

              {/* Step 1 */}
              <div className="relative mb-24">
                <div className="absolute left-0 top-6 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center z-10 border-2 border-primary">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div className="pl-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Create an Account
                  </h3>
                  <p className="text-gray-600">
                    Begin your journey with a personalized profile that
                    showcases your professional identity and career aspirations.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative mb-24">
                <div className="absolute left-0 top-6 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center z-10 border-2 border-primary">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div className="pl-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Find a Suitable Job
                  </h3>
                  <p className="text-gray-600">
                    Discover opportunities matching your skills and preferences
                    with our intelligent search filters.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative mb-24">
                <div className="absolute left-0 top-6 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center z-10 border-2 border-primary">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div className="pl-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Upload Your CV/Resume
                  </h3>
                  <p className="text-gray-600">
                    Showcase your experience and qualifications to make your
                    profile stand out to potential employers.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="absolute left-0 top-6 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center z-10 border-2 border-primary">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div className="pl-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Apply for a Job
                  </h3>
                  <p className="text-gray-600">
                    Take the first step toward your new career with a
                    streamlined application process and progress tracking.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Sticky Scroll Slides with Fixed Alignment */}
            <div className="snap-y snap-mandatory overflow-y-scroll h-[90vh] rounded-xl border border-gray-200">
              <div className="relative">
                {/* First Slide */}
                <div className="sticky top-0 h-[90vh] snap-start flex flex-col items-center justify-center bg-gray-100 p-8">
                  <div className="w-full max-w-md text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      Create an Account
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Get started by signing up with your details. Provide your
                      name, email, and a secure password to create your
                      personalized job search profile.
                    </p>
                    <div className="mt-2 bg-white rounded-lg shadow-md p-6 w-full max-w-sm mx-auto">
                      <div className="space-y-4">
                        <div className="w-full h-8 bg-gray-200 rounded-md"></div>
                        <div className="w-full h-8 bg-gray-200 rounded-md"></div>
                        <div className="w-full h-8 bg-gray-200 rounded-md"></div>
                        <div className="w-1/2 h-10 bg-primary rounded-md mx-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second Slide */}
                <div className="sticky top-0 h-[90vh] snap-start flex flex-col items-center justify-center bg-primary text-white p-8">
                  <div className="w-full max-w-md text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">
                      Find a Suitable Job
                    </h2>
                    <p className="text-white opacity-90 mb-8">
                      Use our advanced job search filters to find positions that
                      match your skills, experience, and preferences from top
                      companies.
                    </p>
                    <div className="mt-2 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg border border-white border-opacity-20 p-6 w-full max-w-sm mx-auto">
                      <div className="space-y-4">
                        <div className="w-full h-8 bg-white bg-opacity-20 rounded-md"></div>
                        <div className="flex space-x-2">
                          <div className="w-1/3 h-6 bg-white bg-opacity-20 rounded-md"></div>
                          <div className="w-1/3 h-6 bg-white bg-opacity-20 rounded-md"></div>
                          <div className="w-1/3 h-6 bg-white bg-opacity-20 rounded-md"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-20 bg-white bg-opacity-20 rounded-md"></div>
                          <div className="h-20 bg-white bg-opacity-20 rounded-md"></div>
                          <div className="h-20 bg-white bg-opacity-20 rounded-md"></div>
                          <div className="h-20 bg-white bg-opacity-20 rounded-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Third Slide */}
                <div className="sticky top-0 h-[90vh] snap-start flex flex-col items-center justify-center bg-gray-100 p-8">
                  <div className="w-full max-w-md text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      Upload Your CV/Resume
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Make your profile stand out by uploading your latest
                      resume, showcasing your qualifications and achievements.
                    </p>
                    <div className="mt-2 bg-white rounded-lg shadow-md p-6 w-full max-w-sm mx-auto flex flex-col items-center">
                      <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-gray-400 mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-sm text-gray-500">
                          Drag & drop your resume here or
                        </p>
                        <button className="mt-2 px-4 py-2 bg-primary text-white text-sm rounded-md">
                          Browse Files
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fourth Slide */}
                <div className="sticky top-0 h-[90vh] snap-start flex flex-col items-center justify-center bg-primary text-white p-8">
                  <div className="w-full max-w-md text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Apply for a Job</h2>
                    <p className="text-white opacity-90 mb-8">
                      Once you have found the perfect job, submit your
                      application with just a few clicks and track your
                      application status.
                    </p>
                    <div className="mt-2 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg border border-white border-opacity-20 p-6 w-full max-w-sm mx-auto">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-2/3 h-6 bg-white bg-opacity-20 rounded-md"></div>
                          <div className="w-1/4 h-6 bg-green-400 rounded-md"></div>
                        </div>
                        <div className="w-full h-1 bg-white bg-opacity-20 rounded-full">
                          <div className="w-3/4 h-1 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center mb-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <div className="w-full h-4 bg-white bg-opacity-20 rounded-md"></div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center mb-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <div className="w-full h-4 bg-white bg-opacity-20 rounded-md"></div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center mb-1">
                              <span className="text-white text-xs font-bold">
                                3
                              </span>
                            </div>
                            <div className="w-full h-4 bg-white bg-opacity-20 rounded-md"></div>
                          </div>
                        </div>
                        <div className="w-full h-10 bg-green-400 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <AnimatedTestimonials />
     
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-100 p-12">
        {[
          {
            title: "Become a Candidate",
            description:
              "Registering as a jobseeker is a vital step to access employment opportunities, resources, and support tailored to your career goals.",
            image: women,
            route: "/user/register",
          },
          {
            title: "Become an Employer",
            description:
              "Registering as a recruiter or employer enables access to a diverse talent pool and streamlines the hiring process, enhancing workforce management.",
            image: men,
            route: "/company/register",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="max-w-sm w-full lg:max-w-full lg:flex h-auto shadow-lg rounded-lg overflow-hidden bg-white"
          >
            <div className=" lg:h-auto lg:w-48 flex-none bg-cover rounded-l-lg text-center overflow-hidden">
              <Image
                className="rounded-l-lg h-full object-cover"
                src={item.image}
                alt={item.title}
                width={192}
                height={160}
              />
            </div>
            <div className="border border-gray-200 bg-gray-100 rounded-r-lg p-6 flex flex-col justify-between leading-normal">
              <div className="text-center">
                <h2 className="text-gray-900 font-bold text-xl mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-700 text-base mb-4">
                  {item.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push(item.route)}
                  className="flex items-center justify-center gap-2 mx-auto text-md bg-primary text-white px-5 py-2 rounded-full shadow-md transition-transform duration-300 hover:bg-opacity-90"
                >
                  Register
                  <svg
                    className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 16 19"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                      className="fill-white"
                    ></path>
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
        
      </div> */}
    </div>
  );
}

export default LandingPage;
