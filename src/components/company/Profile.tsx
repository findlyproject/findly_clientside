
"use client"

import { companyData } from "@/lib/store/features/companyslice";
import { useAppSelector } from "@/lib/store/hooks";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { MdDelete } from "react-icons/md";

import { FaStar, FaEnvelope, FaPhone, FaGlobe, FaBookmark, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const CompanyProfile = () => {
  const [reviews,setReviews]=useState<companyData[]>([])
  const activeCompany = useAppSelector((state) => state.companyLogin.activeCompany)
  console.log("reviewswwwwwww",reviews);

  useEffect(()=>{
    findAllReviews()
  },[])
  const findAllReviews=async()=>{
    const response=await api.get("/rating/findreviews")
    const data=response.data.reviews
    setReviews(data)
  }
  const blogs = [
    {
      id: 1,
      title: "Fintech 101: Exploring the Basics of Electronic Payments",
      author: "Harsh C.",
      image: "https://pagedone.io/asset/uploads/1696244553.png",
      date: "2 years ago",
    },
    {
      id: 2,
      title: "From Classroom to Cyberspace: The Growing Influence of EdTech in Fintech",
      author: "John D.",
      image: "https://pagedone.io/asset/uploads/1696244579.png",
      date: "2 years ago",
    },
    {
      id: 3,
      title: "Fintech Solutions for Student Loans: Easing the Burden of Education Debt",
      author: "Alexa H.",
      image: "https://pagedone.io/asset/uploads/1696244619.png",
      date: "2 years ago",
    },
  ];

const handleDelete=async(id:string)=>{
  const response=await api.delete(`/company/deletereview/${id}`)
  if(response.status===200){
    findAllReviews()
  }
}
  return (
    <div className="min-h-screen py-10 bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl ">
        <div className="flex items-start justify-between  gap-6">
          <img
            src={activeCompany?.logo}
            alt="Profile"
            className=" w-56 h-56 object-cover"
          />
          <div className="">
            <h2 className="text-2xl font-bold">{activeCompany?.name}</h2>
            {/* <p className="text-blue-500">Product Designer</p>
            <div className="flex items-center gap-2 mt-2 text-yellow-500">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="text-gray-300" />
              <span className="text-gray-600">8.6</span>
            </div> */}
            <div className="mt-6 border-t pt-4">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <p className="flex items-center gap-2 text-blue-500 mt-2"><FaPhone /> {activeCompany?.contact}</p>
              <p className="flex items-center gap-2 text-blue-500 mt-2"><FaEnvelope /> {activeCompany?.email}</p>
              <p className="flex items-center gap-2 text-blue-500 mt-2"><FaGlobe /> current work</p>
            </div>
            <div className="mt-4 flex gap-4">
              <a href={activeCompany?.socialMedia?.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-700 text-xl">
                <FaFacebook />
              </a>
              <a href={activeCompany?.socialMedia?.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-xl">
                <FaTwitter />
              </a>
              <a href={activeCompany?.socialMedia?.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xl">
                <FaLinkedin />
              </a>
              <a href={activeCompany?.socialMedia?.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 text-xl">
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="">
            <FaBookmark className="ml-auto text-gray-500 cursor-pointer" />
          </div>
        </div>


        <div>
          <h2>About</h2>
          <span>{activeCompany?.about || "write about you"}</span> <br />
          <span>{status}</span>
        </div>
        <div className="mt-6 mb-5 border-t pt-4">
          <h3 className="text-xl font-semibold">Basic Information</h3>

          <span>Founded -</span><span className="text-primary"> {activeCompany?.foundedAt}</span> <br />
          <span>Headquarters - </span><span className="text-primary">{activeCompany?.headquarters}</span><br />
          {activeCompany?.workHours?.start && <span>Working Time :</span>} <span className="text-primary">{activeCompany?.workHours?.start} - {activeCompany?.workHours?.end}</span><br/>
          <span>country :</span> <span className="text-primary">{activeCompany?.address?.country}</span><br />
          <span>Location :</span> <span className="text-primary">{activeCompany?.address?.landmark} {activeCompany?.address?.city},{activeCompany?.address?.state}</span>


        </div>
        
        <div >
          <h2 className="text-xl font-semibold">Team & Key People</h2>
          <span className="mb-3 ">Founder/CEO :</span>
          <span className="text-primary">{activeCompany?.founder}</span>
          <br /> <br />
          <span className="text-lg font-normal">Key Team Members</span>

          <ul className="mb-5">
            {activeCompany?.employees && activeCompany.employees.length > 0 ? (
              activeCompany.employees.map((user, index) => {
                console.log("user",user);
                
             return  <li className="text-primary" key={index}>{user?.employee?.firstName} - {user.position}</li>
            })
            ) : (
              <li>Write employees of your company...</li>
            )}
          </ul>
        </div>



        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold">Services</h3>
          <ul>
            {
              activeCompany?.employees && activeCompany.employees.length > 0 ? (
                activeCompany?.services?.map((item) => (<li className="text-primary" key={item}>{item}</li>))) :
                (
                  <li>Write Servieces of your company...</li>
                )
            }
          </ul>
        </div>

        <div className="mt-6 border-t pt-4">
          
          <section className="py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-14">
        Posts
        </h2>

        <div className="flex justify-center mb-14 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600"
            >
              <div className="flex items-center mb-6">
                <img
                  src={blog.image}
                  alt={blog.author}
                  className="rounded-lg w-full object-cover"
                />
              </div>
              <div className="block">
                <h4 className="text-gray-900 font-medium leading-8 mb-9">
                  {blog.title}
                </h4>
                <div className="flex items-center justify-between font-medium">
                  <h6 className="text-sm text-gray-500">By {blog.author}</h6>
                  <span className="text-sm text-indigo-600">{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <a
          href="#"
          className="cursor-pointer border border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 flex justify-center items-center text-gray-900 font-semibold mx-auto transition-all duration-300 hover:bg-gray-100"
        >
          View All
        </a>
      </div>
    </section>
         
        </div>


        <div className="mt-6">
          
        <h3 className="text-lg font-semibold">Customer Feedbacks</h3>
        {
           reviews?.map((rev)=>(
            <div 
            key={rev?._id}
            className="mt-3 p-4 bg-gray-100 rounded-lg">
           <div className="flex justify-end ">
           <MdDelete onClick={()=>handleDelete(rev._id)}/>
           </div>
      
            <p className="font-semibold"> {rev?.name || rev?.companyId?.name || rev?.userId?.firstName}</p>
            
            <div className="flex items-center text-yellow-500">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar key={index} className={index < rev?.starsRating ? "text-yellow-400" : "text-gray-300"} />
        ))}
        </div>

            <p className="text-sm text-gray-600">  {formatDistanceToNow(new Date(rev?.createdAt), { addSuffix: true })}</p>
            <p className="mt-2 text-gray-800">
              {rev.review}
            </p>
          </div>
            ))
          }
        
      </div>

      </div>
    </div>
  );
};

export default CompanyProfile;
