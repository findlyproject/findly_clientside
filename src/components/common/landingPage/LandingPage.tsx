"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import jobImage from "../../../../public/job.png";
import register4 from "../../../../public/assets/register4.jpg"
import register3 from "../../../../public/assets/register3.jpg"
import landingTop from "../../../../public/assets/register3.jpg"
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { FaUserPlus, FaUpload, FaCheckCircle } from "react-icons/fa";
import goup from "../../../../public/landingPage-group-discussion.png"

import Testimonials from "./Testimonial";
import { useAppDispatch } from "@/lib/store/hooks";
import { setActiveCompany } from "@/lib/store/features/companyslice";



function LandingPage() {

  
// const  dispatch=useAppDispatch()
// useEffect(()=>{
// dispatch(setCompanyLogOut())
// dispatch(SetLogout())
// },[])

  const router = useRouter()
  const steps = [
    { title: "Create account", desc: "Aliquam facilisis egestas sapien.", icon: <FaUserPlus /> },
    { title: "Upload CV/Resume", desc: "Curabitur sit amet maximus ligula.", icon: <FaUpload /> },
    { title: "Find suitable job", desc: "Phasellus quis eleifend ex.", icon: <FaSearch /> },
    { title: "Apply job", desc: "Nam sodales purus.", icon: <FaCheckCircle /> },
  ];
  return (
    <div className="w-full h-full">
      <section className="bg-primary w-full h-[100vh]">
      <div className="flex flex-col md:flex-row items-center justify-center  w-full  pt-20 ">


        <div className="w-full flex flex-col-reverse md:flex-row justify-evenly items-center  space-y-8 md:space-y-0 md:space-x-10 p-4 md:p-8">

          <div className="w-full  md:w-3/6 text-center md:text-left space-y-4 flex flex-col items-center md:items-start">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Find a job that suits <br className="hidden md:block" /> your interest & skills.
            </h1>
            <p className="text-gray-600 text-lg">
              Aliquam vitae turpis in diam convallis finibus in at risus. Nullam <br className="hidden md:block" />
              in scelerisque leo, eget sollicitudin velit vestibulum.
            </p>


            <div className="flex flex-col sm:flex-row items-center w-full max-w-xl bg-white shadow-md rounded-lg border border-gray-300 overflow-hidden">

              <div className="flex items-center px-4 py-2 w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-gray-300">
                <FaSearch className="text-primary" />
                <input
                  type="text"
                  placeholder="Job title, Keyword..."
                  className="ml-2 w-full focus:outline-none text-gray-600 placeholder-gray-400"
                />
              </div>


              <div className="flex items-center px-4 py-2 w-full sm:w-1/2">
                <FaMapMarkerAlt className="text-primary" />
                <input
                  type="text"
                  placeholder="Your Location"
                  className="ml-2 w-full focus:outline-none text-gray-600 placeholder-gray-400"
                />
              </div>
            </div>


            <button className="bg-primary text-white px-6 py-3 font-semibold w-full sm:w-auto mt-4 sm:mt-0">
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
      <div className="flex flex-wrap justify-center gap-4 p-4 mt-5">
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



