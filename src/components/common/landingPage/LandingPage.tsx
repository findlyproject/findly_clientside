"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
// import register3 from "../../../../public/assets/register3.jpg";
import goup from "../../../../public/landingPage-group-discussion.png";
import  { AnimatedTestimonials } from "./Testimonial";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import CountUp from "react-countup";
import { toast } from "react-toastify";
import { formChangeEvent } from "@/types/Types";
import BlurText from "@/Animation/BlurText";
import { StickyScroll } from "@/Animation/Slider";
// import sighup from "../../../../public/assets/signup.svg"
import jobhunt from "../../../../public/assets/jobhunt.svg"
import resume from "../../../../public/assets/resume.svg"
import interview from "../../../../public/assets/interview.svg"
import women from "../../../../public/assets/women.jpg"
import men from "../../../../public/assets/men.jpg"


import { PlaceholdersAndVanishInput } from "@/Animation/PlaceholdersAndVanishInput";
import { motion } from "framer-motion";


const content = [
  {
    title: "Create an Account",
    description:
      "Get started by signing up with your details. Provide your name, email, and a secure password to create your account. This will give you access to a personalized job search experience.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
       {/* <Image
          src={sighup}
          width={300}
          height={300}
          className="h-full w-full object-fit"
          alt="Job search illustration"
        /> */}
      </div>
    ),
  },
  {
    title: "Find a Suitable Job",
    description:
      "Use our advanced job search filters to find positions that match your skills, experience, and preferences. Browse through various job listings from top companies and industries.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={jobhunt}
          width={300}
          height={300}
          className="h-full w-full object-fit"
          alt="Job search illustration"
        />
      </div>
    ),
  },
  {
    title: "Upload Your CV/Resume",
    description:
      "Make your profile stand out by uploading your latest resume. This helps recruiters and employers understand your qualifications, experience, and achievements at a glance.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
      <Image
        src={resume}
        width={300}
        height={300}
        className="h-full w-full object-fit"
        alt="Job search illustration"
      />
    </div>
    ),
  },
  {
    title: "Apply for a Job",
    description:
      "Once you've found the perfect job, submit your application with just a few clicks. Track your application status and stay updated on interview opportunities.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
      <Image
        src={interview}
        width={300}
        height={300}
        className="h-full w-full object-fit"
        alt="Job search illustration"
      />
    </div>
    ),
  },
];

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
 
  

  const onSubmit = (e:formChangeEvent) => {
    e.preventDefault();
    toast.error("please login");
  };
  
  return (
    <div className="w-full h-full bg-white">
      <>
      
    <section className="relative overflow-hidden bg-primary pt-5 pb-20 ">
        <div className="px-4 mx-auto relativea sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
                <div>
                <BlurText
  text="Connecting You with Employers"
  delay={150}
  animateBy="words"
  direction="top"
  className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl"
/>
<BlurText
  text="Find your dream job effortlessly! Create your profile, upload your resume, and explore opportunities that match your skills. Take the next step in your career today! "
  delay={150}
  animateBy="words"
  direction="top"
  className="mt-4 text-lg font-normal text-gray-400 sm:mt-8"
/>
                    
                   

                    <div  className="relative mt-8 rounded-full sm:mt-12">
                        <div className="relative">
                            <div className="absolute rounded-full -inset-px bg-gradient-to-r from-white to-purple-500"></div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                                    <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                {/* <input type="text" name="" id="" placeholder="Try Java Developer, React Dev etc." className="block w-full py-4 pr-6 text-black placeholder-gray-500  border border-transparent rounded-full pl-14 sm:py-5 focus:border-transparent focus:ring-0" /> */}
                                <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
                            </div>
                        </div>
                       
                    </div>

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

      <section className=" bg-primary mb-20">
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
        <div className="relative flex flex-col items-center mt-20   py-18">
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
        </div>
      </section>
      <div className="relative flex flex-col items-center  py-18">
        
        
        <div className="absolute top-1/2 -mt-40 w-full h-3/6  bg-white  flex justify-center items-center  z-0"></div>
        <section className="py-24 relative">
        <div className="w-full  px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full flex-col justify-start items-center lg:gap-12 gap-10 inline-flex">
                <div className="w-full flex-col justify-start items-center gap-3 flex">
                    <h2 className="w-full text-center text-gray-900 text-4xl font-bold font-manrope leading-normal">How It Works</h2>
                    <p className="w-full text-center text-gray-500 text-base font-normal leading-relaxed">A detailed breakdown of processes and mechanisms behind a system or product, <br/>simplifying complex concepts for easy understanding.</p>
                </div>
                
                <StickyScroll content={content}/>
            </div>
        </div>
    </section>
                                            
      </div>
     
        <AnimatedTestimonials />
     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-12">
      {[{
        title: "Become a Candidate",
        description: "Registering as a jobseeker is a vital step to access employment opportunities, resources, and support tailored to your career goals.",
        image: women,
        route: "/user/register"
      }, {
        title: "Become an Employer",
        description: "Registering as a recruiter or employer enables access to a diverse talent pool and streamlines the hiring process, enhancing workforce management.",
        image: men,
        route: "/company/register"
      }].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          whileHover={{ scale: 1.05 }}
          className="max-w-sm w-full lg:max-w-full lg:flex h-auto shadow-lg rounded-lg overflow-hidden bg-white"
        >
          <div className=" lg:h-auto lg:w-48 flex-none bg-cover rounded-l-lg text-center overflow-hidden">
            <Image className="rounded-l-lg h-full object-cover" src={item.image} alt={item.title} width={192} height={160} />
          </div>
          <div className="border border-gray-200 bg-gray-100 rounded-r-lg p-6 flex flex-col justify-between leading-normal">
            <div className="text-center">
              <h2 className="text-gray-900 font-bold text-xl mb-2">{item.title}</h2>
              <p className="text-gray-700 text-base mb-4">{item.description}</p>
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
    </div>

    </div>
    
  );
}

export default LandingPage;
