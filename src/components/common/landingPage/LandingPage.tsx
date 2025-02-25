"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import register4 from "../../../../public/assets/register4.jpg"
import register3 from "../../../../public/assets/register3.jpg"
import landingTop from "../../../../public/assets/register3.jpg"
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { FaUserPlus, FaUpload, FaCheckCircle } from "react-icons/fa";
import goup from "../../../../public/landingPage-group-discussion.png"

import Testimonials from "./Testimonial";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import CountUp from "react-countup";



function LandingPage() {

  const [users,setUsers]=useState([])
  const [companies,setCompanies]=useState([])
  const [revenue,setRevenue]=useState([])

  console.log("revenue",revenue);
  
useEffect(()=>{
  showUsers()
  showCompanies()
  findrevenue()
},[])

const showUsers=async()=>{
  const response=await api.get("/user/allusers")
  const data=response.data.allUsers
  setUsers(data)
}

const showCompanies=async()=>{
 const  response=await api.get("/company/allcompanies");
 const data=response.data.companies
 setCompanies(data)
}

const findrevenue =async()=>{
  const response=await api.get("/user/findprimeclients")
  const data=response.data.primeClients
  setRevenue(data)
}


  const router = useRouter()
  const steps = [
    { title: "Create account", desc: "Aliquam facilisis egestas sapien.", icon: <FaUserPlus /> },
    { title: "Upload CV/Resume", desc: "Curabitur sit amet maximus ligula.", icon: <FaUpload /> },
    { title: "Find suitable job", desc: "Phasellus quis eleifend ex.", icon: <FaSearch /> },
    // { title: "Apply job", desc: "Nam sodales purus.", icon: <FaCheckCircle /> },
  ];
  interface Job{
    _id:string,
    title:string,
    location: string;
  company: string;
  salary: { rate: string; min: number; max: number };
  }
  const [nameQuery, setNameQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [results, setResults] = useState<Job[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
console.log("results",results);

  useEffect(() => {
    console.log("hey useEffcet");
    console.log("nameQuery",nameQuery.length);
    if (nameQuery.length > 0 || locationQuery.length > 0) {

      fetchSuggestions();
    } else {
      setResults([]); 
    }
  }, [nameQuery, locationQuery]);
console.log("showSuggestions",showSuggestions);
console.log("showLocationSuggestions",showLocationSuggestions);

  const fetchSuggestions = async () => {
    try {
      console.log("fffff");
      
      const response = await api.get(`/user/jobsearch?jobName=${nameQuery}&location=${locationQuery}`);
      setResults(response.data.jobs);
      // setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

 
  return (
    <div className="w-full h-full">
      <div className="flex flex-col md:flex-row items-center justify-center  w-full  pt-20 ">


        <div className="w-full flex flex-col-reverse md:flex-row justify-evenly items-center  space-y-8 md:space-y-0 md:space-x-10 p-4 md:p-8">

      

<div className="w-full flex flex-col items-end max-w-xl h-full relative  ">
<div className="flex flex-col mb-2   sm:flex-row items-center w-full max-w-xl bg-white shadow-md rounded-lg border border-gray-300 overflow-hidden">
      {/* Job Title Input */}
      <div className="flex   h-full   items-center px-4 py-2 w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-gray-300 ">
        <FaSearch className="text-primary" />
        <input
          type="text"
          placeholder="Job title, Keyword..."
          className="ml-2 me-10 w-full focus:outline-none text-gray-600 placeholder-gray-400"
          value={nameQuery}
          onChange={(e) => setNameQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
      
        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <ul className=" absolute left-0 top-36 w-60 bg-white border border-gray-300 shadow-md">
            {results.map((job) => (
              <li
                key={job._id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => {
                  setNameQuery(job.title);
                  setShowSuggestions(false);
                }}
              >
                {job.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    

      {/* Location Input */}
      <div className="flex items-center px-4 py-2 w-full sm:w-1/2">
        <FaMapMarkerAlt className="text-primary" />
        <input
          type="text"
          placeholder="Your Location"
          className="ml-2 w-full focus:outline-none text-gray-600 placeholder-gray-400"
          value={locationQuery}
          onChange={(e) => {setLocationQuery(e.target.value)
            setShowSuggestions(false)
          }}
          onFocus={() => {
            setShowLocationSuggestions(true)
            setShowSuggestions(false)
          }}
          onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
        />
        {showLocationSuggestions && (
          <ul className="absolute top-36 left-0 md:left-72 w-60 bg-white border border-gray-300 shadow-md z-10">
            {results.map((job) => (
              <li
                key={job._id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => {
                  setLocationQuery(job.location);
                  setShowLocationSuggestions(false);
                }}
              >
                {job.location}
              </li>
            ))}
          </ul>
        )}
      </div>
    
    </div>
    <button
      className="bg-white  text-primary border border-black px-10 py-3 font-semibold w-full sm:w-auto  sm:mt-0">
       Find Job
     </button>
</div>

          <div className="w-96 bg-red-400  flex justify-center">
            <Image
              src={landingTop}
              alt="Landing Page Illustration"
              width={500}
              height={300}
              className="object-cover max-w-full"
            />
          </div>
        </div>
      </div>
      
      <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {/* Expert Consultants */}
          <div className="border-b pb-10 sm:border-r sm:border-b-0 border-gray-100">
            <div className="font-manrope font-bold text-5xl text-white mb-5">
              <CountUp start={0} end={260} duration={2.5} />+
            </div>
            <span className="text-xl text-white block">Expert Consultants</span>
          </div>

          {/* Active Users */}
          <div className="border-b pb-10 sm:border-r sm:border-b-0 border-gray-100">
            <div className="font-manrope font-bold text-5xl text-white mb-5">
              <CountUp start={0} end={users.length} duration={2.5} />+
            </div>
            <span className="text-xl text-white block">Active Users</span>
          </div>

          {/* Active Companies */}
          <div className="border-b pb-10 sm:border-r sm:border-b-0 border-gray-100">
            <div className="font-manrope font-bold text-5xl text-white mb-5">
              <CountUp start={0} end={companies.length} duration={2.5} />+
            </div>
            <span className="text-xl text-white block">Active Companies</span>
          </div>

          {/* Prime Clients */}
          <div>
            <div className="font-manrope font-bold text-5xl text-white mb-5">
              <CountUp start={0} end={revenue.length} duration={2.5} />+
            </div>
            <span className="text-xl text-white block">Prime Clients</span>
          </div>
        </div>
      </div>
      </section>
      <div className="relative flex flex-col items-center bg-white py-20">

        <div className="relative bg-white shadow-lg p-10 flex flex-col md:flex-row items-center w-2/3 justify-center z-10">
          <div className="md:w-2/3">
            <h3 className="text-gray-500 text-sm uppercase">Who We Are</h3>
            <h1 className="text-4xl font-bold mb-4 text-primary">About us</h1>
            <p className="text-gray-700 mb-4">
            Findly is an innovative job hunting website designed to simplify the job search process for both job seekers and employers. With its user-friendly interface, Findly allows candidates to easily browse job listings across various industries, upload their resumes, and apply for positions with just a few clicks.
            </p>
            <p className="text-gray-700 mb-4">
            The platform also features advanced filtering tools that help users tailor their search based on criteria such as location, job type, and salary. 
            </p>
            <p className="text-gray-700 mb-4">
            Employers benefit from a streamlined hiring process, with access to a diverse pool of qualified candidates, customizable job postings, and tools for managing applications.
            </p>
            <button 
            onClick={()=>router.push(`/about`)}
            className="bg-primary text-white px-6 py-2 rounded-full">
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
        <div className="absolute top-1/2 -mt-32 w-full h-4/6  bg-white  flex justify-center items-center p-32 z-0"></div>
        <h2 className="text-center text-3xl font-bold mb-6 mt-10 text-primary z-30">How Findly Work</h2>
        <div className="bg-primary text-primary py-10 px-4">
  {/* Container */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 justify-center items-center">
    {steps.map((step, index) => (
      <div key={index} className="text-center max-w-xs mx-auto relative">
     
        
        {/* Icon Box */}
        <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          {step.icon}
        </div>

        {/* Step Title */}
        <h3 className="font-semibold text-lg">{step.title}</h3>
        
        {/* Description */}
        <p className="text-sm">{step.desc}</p>
      </div>
    ))}
  </div>
</div>

      </div>
      <div className="mt-16">
        <Testimonials />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-10 py-10">
        <div className="bg-gray-200 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold">Become a Candidate</h2>
            <p className="text-gray-600">Registering as a jobseeker is a vital step to access employment opportunities, resources, and support tailored to your career goals.</p>
            <button
              onClick={() => router.push(`/user/register`)}
              className="bg-primary text-white px-5 py-2 rounded-full mt-4">Register Now</button>
          </div>
          <div className="md:w-1/2">
            <Image src={register3} alt="Register" width={300} height={200} />
          </div>
        </div>
        <div className="bg-primary text-white p-6 rounded-lg flex flex-col md:flex-row items-center justify-between relative">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold">Become an Employer</h2>
            <p>Registering as a recruiter or employer enables access to a diverse talent pool and streamlines the hiring process, enhancing workforce management.</p>
            <button 
            onClick={() => router.push(`/company/register`)}
            className="bg-white text-primary px-5 py-2 rounded-full mt-4"
            >Register Now</button>
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



