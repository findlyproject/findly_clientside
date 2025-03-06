
"use client"

import { companyData } from "@/lib/store/features/companyslice";
import { useAppSelector } from "@/lib/store/hooks";
import api from "@/utils/api";
import { useEffect, useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { MdDelete } from "react-icons/md";
// import { Button } from "@/components/ui/button"
import { FaStar, FaEnvelope, FaPhone, FaGlobe, FaBookmark, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Modal, { modalProps } from "./JobPostModal";
import PostModal from "./PostModal";
import { MdVerified } from "react-icons/md";

const CompanyProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPosts, setIsOpenPosts] = useState(false);
  const [reviews,setReviews]=useState<companyData[]>([])
  const [jobs,setJobs]=useState<modalProps[]>([])
  const [posts,setPosts]=useState([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const itemsPerPage = 6;
  const activeCompany = useAppSelector((state) => state.companyLogin.activeCompany)
  const lastFetchedPage = useRef<number>(null);

console.log("posts",posts);

  

  useEffect(()=>{
    findAllReviews()
    findJobPsts(currentPage)
    findposts()
  },[])

  const findposts=async()=>{
    try {
      const response=await api.get("/company/findposts")
    if(response.status===200){

      console.log("ddddaa",response);
      
      const data=response.data.posts
      setPosts(data)
    }
    } catch (error) {
      console.log("error",error);
      
    }
  }
  const findJobPsts=async(page=1)=>{
    try {
      if (lastFetchedPage.current === page) return; 
      lastFetchedPage.current = page;
    
      const response=await api.get(`/company/getjobs?page=${page}&limit=${itemsPerPage}`)
    console.log("success",response);
          if(response.status===200){
            const data=response.data.postedJobs
            setTotalPages(response.data.totalPages || 1);
            // setJobs(data)
          setJobs((prevJobs)=>[...prevJobs, ...data])
            // setTotalPages(totalPages)
          }
    
    } catch (error) {
      console.log("dddd",error);
      
    }
  }
  const findAllReviews=async()=>{
    const response=await api.get("/rating/findreviews")
    const data=response.data.reviews
    setReviews(data)
  }
  

  

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
        {activeCompany?.role === "premium" &&(
          <div className="">
            <MdVerified className="ml-auto text-primary text-2xl cursor-pointer" />
          </div>
        )
            
        }
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
          <h3 className="text-lg font-semibold">Posts</h3>
          <p className="mb-5">Manage your company's job listings and posts here. Keep your updates organized and relevant.  
  You can add new job openings, share company news, or remove outdated posts anytime.  
  Keeping this section updated ensures your team has the latest information.</p>
 

  <button 
       onClick={() => setIsOpenPosts(true)}
     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
  Posts
</button>
<button
   onClick={() => setIsOpen(true)}
className="px-4 py-2 bg-green-600 text-white  rounded-lg hover:bg-green-700 transition ml-2">
  Job Posts
</button>

    <Modal isOpen={isOpen} setIsOpen={setIsOpen} jobs={jobs} findJobPsts={findJobPsts} currentPage={currentPage} totalPages={totalPages}/>
    <PostModal isOpenPosts={isOpenPosts} setIsOpenPosts={setIsOpenPosts} />
         
        </div>
        <hr className="mt-5" />


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
