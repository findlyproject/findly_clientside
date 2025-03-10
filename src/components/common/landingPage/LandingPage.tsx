"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import register4 from "../../../../public/assets/register4.jpg";
import register3 from "../../../../public/assets/register3.jpg";
import { FaSearch, FaCheckCircle } from "react-icons/fa";
import { FaUserPlus, FaUpload } from "react-icons/fa";
import goup from "../../../../public/landingPage-group-discussion.png";

import Testimonials from "./Testimonial";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import CountUp from "react-countup";
import { toast } from "react-toastify";
import { formChangeEvent } from "@/types/Types";

function LandingPage() {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [revenue, setRevenue] = useState([]);

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
  const steps = [
    {
      title: "Create an Account",
      desc: "Sign up with your details to get started.",
      icon: <FaUserPlus />,
    },
    {
      title: "Upload Your CV/Resume",
      desc: "Upload your resume to showcase your skills and experience.",
      icon: <FaUpload />,
    },
    {
      title: "Find a Suitable Job",
      desc: "Search and explore job listings that match your profile.",
      icon: <FaSearch />,
    },
    {
      title: "Apply for a Job",
      desc: "Submit your application and get hired.",
      icon: <FaCheckCircle />,
    },
  ];
  
  interface Job {
    _id: string;
    title: string;
    location: string;
    company: string;
    salary: { rate: string; min: number; max: number };
  }
  const [nameQuery, setNameQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [results, setResults] = useState<Job[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  console.log("results", results);

  useEffect(() => {
    console.log("hey useEffcet");
    console.log("nameQuery", nameQuery.length);
    if (nameQuery.length > 0 || locationQuery.length > 0) {
      fetchSuggestions();
    } else {
      setResults([]);
    }
  }, [nameQuery, locationQuery]);
  console.log("showSuggestions", showSuggestions);
  console.log("showLocationSuggestions", showLocationSuggestions);

  const fetchSuggestions = async () => {
    try {
      console.log("fffff");

      const response = await api.get(
        `/user/jobsearch?jobName=${nameQuery}&location=${locationQuery}`
      );
      setResults(response.data.jobs);
      // setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };


  const handleSubmit = (e:formChangeEvent) => {
    e.preventDefault();
    toast.error("please login");
  };
  
  return (
    <div className="w-full h-full bg-primary">
      <>
      
    <section className="relative overflow-hidden pt-5 pb-20 ">
        <div className="px-4 mx-auto relativea sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
                <div>
                    <h1 className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">Connecting You with Employers</h1>
                    <p className="mt-4 text-lg font-normal text-gray-400 sm:mt-8">Find your dream job effortlessly! Create your profile, upload your resume, and explore opportunities that match your skills. Take the next step in your career today! </p>

                    <form action="#" method="POST" className="relative mt-8 rounded-full sm:mt-12">
                        <div className="relative">
                            <div className="absolute rounded-full -inset-px bg-gradient-to-r from-white to-purple-500"></div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                                    <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input type="text" name="" id="" placeholder="Try Java Developer, React Dev etc." className="block w-full py-4 pr-6 text-black placeholder-gray-500  border border-transparent rounded-full pl-14 sm:py-5 focus:border-transparent focus:ring-0" />
                            </div>
                        </div>
                        <div className="sm:absolute flex sm:right-1.5 sm:inset-y-1.5 mt-4 sm:mt-0">
                            <button type="submit" className="inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold tracking-widest text-primary uppercase transition-all duration-200 bg-white rounded-full sm:w-auto sm:py-3 hover:opacity-90" onClick={handleSubmit}>Find A Job</button>
                        </div>
                    </form>

                    <div className="mt-8 sm:mt-12">
                        <p className="text-lg font-normal text-white">Trusted by 50k+ users</p>

                        <div className="flex items-center mt-3">
                            <div className="flex">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                                        fill="url(#b)"
                                    />
                                    <defs>
                                        <linearGradient id="b" x1="3.07813" y1="3.8833" x2="23.0483" y2="6.90161" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" />
                                            <stop offset="100%"  />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                                        fill="url(#b)"
                                    />
                                    <defs>
                                        <linearGradient id="b" x1="3.07813" y1="3.8833" x2="23.0483" y2="6.90161" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" />
                                            <stop offset="100%" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                                        fill="url(#b)"
                                    />
                                    <defs>
                                        <linearGradient id="b" x1="3.07813" y1="3.8833" x2="23.0483" y2="6.90161" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" />
                                            <stop offset="100%"  />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                                        fill="url(#b)"
                                    />
                                    <defs>
                                        <linearGradient id="b" x1="3.07813" y1="3.8833" x2="23.0483" y2="6.90161" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" />
                                            <stop offset="100%"  />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                                        fill="url(#b)"
                                    />
                                    <defs>
                                        <linearGradient id="b" x1="3.07813" y1="3.8833" x2="23.0483" y2="6.90161" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%"  />
                                            <stop offset="100%"  />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <span className="ml-2 text-base font-normal text-white"> 4.1/5 </span>
                            <span className="ml-1 text-base font-normal text-gray-500"> (14k Reviews) </span>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 pt-10">
                        <svg className="blur-3xl filter opacity-40"  width="300" height="400" viewBox="0 0 444 536" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z" fill="url(#c)" />
                            <defs>
                                <linearGradient id="c" x1="82.7339" y1="550.792" x2="-39.945" y2="118.965" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" />
                                    <stop offset="100%"  />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <img className="relative w-full max-w-md mx-auto" src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/2/illustration.png" alt="" />
                </div>
            </div>
        </div>
    </section>


      </>

      <section className="py-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {/* Expert Consultants */}
            <div className="border-b pb-10 sm:border-r sm:border-b-0 border-gray-100">
              <div className="font-manrope font-bold text-5xl text-gray-100 mb-5">
                <CountUp start={0} end={260} duration={2.5} />+
              </div>
              <span className="text-xl text-gray-100 block">
                Expert Consultants
              </span>
            </div>

            {/* Active Users */}
            <div className="border-b pb-10 sm:border-r sm:border-b-0 border-gray-100">
              <div className="font-manrope font-bold text-5xl text-gray-100 mb-5">
                <CountUp start={0} end={users.length} duration={2.5} />+
              </div>
              <span className="text-xl text-gray-100 block">Active Users</span>
            </div>

            {/* Active Companies */}
            <div className="border-b pb-10 sm:border-r sm:border-b-0 border-gray-100">
              <div className="font-manrope font-bold text-5xl text-gray-100 mb-5">
                <CountUp start={0} end={companies.length} duration={2.5} />+
              </div>
              <span className="text-xl text-gray-100 block">Active Companies</span>
            </div>

            {/* Prime Clients */}
            <div>
              <div className="font-manrope font-bold text-5xl text-gray-100 mb-5">
                <CountUp start={0} end={revenue.length} duration={2.5} />+
              </div>
              <span className="text-xl text-gray-100 block">Prime Clients</span>
            </div>
          </div>
        </div>
      </section>
      <div className="relative flex flex-col items-center bg-primary py-20">
        <div className="relative bg-gray-100 shadow-lg p-10 flex flex-col md:flex-row items-center w-2/3 justify-center z-10">
          <div className="md:w-2/3">
            <h3 className="text-gray-500 text-sm uppercase">Who We Are</h3>
            <h1 className="text-4xl font-bold mb-4 text-primary">About us</h1>
            <p className="text-gray-700 mb-4">
              Findly is an innovative job hunting website designed to simplify
              the job search process for both job seekers and employers. With
              its user-friendly interface, Findly allows candidates to easily
              browse job listings across various industries, upload their
              resumes, and apply for positions with just a few clicks.
            </p>
            <p className="text-gray-700 mb-4">
              The platform also features advanced filtering tools that help
              users tailor their search based on criteria such as location, job
              type, and salary.
            </p>
            <p className="text-gray-700 mb-4">
              Employers benefit from a streamlined hiring process, with access
              to a diverse pool of qualified candidates, customizable job
              postings, and tools for managing applications.
            </p>
            <button
              onClick={() => router.push(`/about`)}
              className="bg-primary text-gray-100 px-6 py-2 rounded-full"
            >
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
        <div className="absolute top-1/2 -mt-40 w-full h-4/6  bg-white  flex justify-center items-center p-32 z-0"></div>
        <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full flex-col justify-start items-center lg:gap-12 gap-10 inline-flex">
                <div className="w-full flex-col justify-start items-center gap-3 flex">
                    <h2 className="w-full text-center text-gray-900 text-4xl font-bold font-manrope leading-normal">How It Works</h2>
                    <p className="w-full text-center text-gray-500 text-base font-normal leading-relaxed">A detailed breakdown of processes and mechanisms behind a system or product, <br/>simplifying complex concepts for easy understanding.</p>
                </div>
                <div className="w-full justify-start items-center gap-4 flex md:flex-row flex-col">
                    <div className="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
                        <div className="self-stretch flex-col justify-start items-center gap-0.5 flex">
                            <h3 className="self-stretch text-center text-primary text-4xl font-extrabold font-manrope leading-normal">1</h3>
                            <h4 className="self-stretch text-center text-gray-900 text-xl font-semibold leading-8">Create account</h4>
                        </div>
                        <p className="self-stretch text-center text-gray-400 text-base font-normal leading-relaxed">Sign up with your details to get started.</p>
                    </div>
                    <svg className="md:flex hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5.50159 6L11.5018 12.0002L5.49805 18.004M12.5016 6L18.5018 12.0002L12.498 18.004" stroke="#4F46E5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
                        <div className="self-stretch flex-col justify-start items-center gap-0.5 flex">
                            <h3 className="self-stretch text-center text-primary text-4xl font-extrabold font-manrope leading-normal">2</h3>
                            <h4 className="self-stretch text-center text-gray-900 text-xl font-semibold leading-8">Find a Suitable Job</h4>
                        </div>
                        <p className="self-stretch text-center text-gray-400 text-base font-normal leading-relaxed">Search and explore job listings that match your profile.</p>
                    </div>
                    <svg className="md:flex hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5.50159 6L11.5018 12.0002L5.49805 18.004M12.5016 6L18.5018 12.0002L12.498 18.004" stroke="#4F46E5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
                        <div className="self-stretch flex-col justify-start items-center gap-0.5 flex">
                            <h3 className="self-stretch text-center text-primary text-4xl font-extrabold font-manrope leading-normal">3</h3>
                            <h4 className="self-stretch text-center text-gray-900 text-xl font-semibold leading-8">Upload Your CV/Resume</h4>
                        </div>
                        <p className="self-stretch text-center text-gray-400 text-base font-normal leading-relaxed">Upload your resume to showcase your skills and experience.</p>
                    </div>
                    <svg className="md:flex hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5.50159 6L11.5018 12.0002L5.49805 18.004M12.5016 6L18.5018 12.0002L12.498 18.004" stroke="#4F46E5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
                        <div className="self-stretch flex-col justify-start items-center gap-0.5 flex">
                            <h3 className="self-stretch text-center text-primary text-4xl font-extrabold font-manrope leading-normal">3</h3>
                            <h4 className="self-stretch text-center text-gray-900 text-xl font-semibold leading-8">Apply for a Job</h4>
                        </div>
                        <p className="self-stretch text-center text-gray-400 text-base font-normal leading-relaxed">Submit your application and get hired.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
                                            
      </div>
      <div className="mt-16">
        <Testimonials />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-10 py-10">
        <div className="bg-gray-200 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold">Become a Candidate</h2>
            <p className="text-gray-600">
              Registering as a jobseeker is a vital step to access employment
              opportunities, resources, and support tailored to your career
              goals.
            </p>
            <button
              onClick={() => router.push(`/user/register`)}
              className="bg-primary text-gray-100 px-5 py-2 rounded-full mt-4"
            >
              Register Now
            </button>
          </div>
          <div className="md:w-1/2">
            <Image src={register3} alt="Register" width={300} height={200} />
          </div>
        </div>
        <div className="bg-primary text-gray-100 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between relative">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold">Become an Employer</h2>
            <p>
              Registering as a recruiter or employer enables access to a diverse
              talent pool and streamlines the hiring process, enhancing
              workforce management.
            </p>
            <button
              onClick={() => router.push(`/company/register`)}
              className="bg-gray-100 text-primary px-5 py-2 rounded-full mt-4"
            >
              Register Now
            </button>
          </div>
          <div className="md:w-1/2 flex justify-end">
            <Image src={register4} alt="Register" width={300} height={200} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
