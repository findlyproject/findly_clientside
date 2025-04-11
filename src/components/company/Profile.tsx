
"use client"

import { useAppSelector } from "@/lib/store/hooks";
import api from "@/utils/api";
import { useEffect, useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { MdDelete } from "react-icons/md";
import { FaStar, FaEnvelope, FaPhone, FaGlobe, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Modal,{ modalProps } from "./JobPostModal";
import PostModal from "./PostModal";
import { MdVerified } from "react-icons/md";
import { ImProfile } from "react-icons/im";
// import { Spinner } from "@material-tailwind/react";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import { Company, Job, Rating } from "@/types/Types";
import { TiEdit } from "react-icons/ti";
import { useRouter } from "next/navigation";

const CompanyProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPosts, setIsOpenPosts] = useState(false);
  const [reviews, setReviews] = useState<Rating[]>([])
  const [jobs, setJobs] = useState<modalProps[]>([])
 

  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false)
  const limit = 4

  const itemsPerPage = 6;
  const activeCompany = useAppSelector((state) => state.companyLogin.activeCompany)
  const lastFetchedPage = useRef<number>(null);

const router=useRouter()

  console.log("hasMore", hasMore);


  useEffect(() => {
    fetchReviews(page);
    findJobPsts(currentPage)
    findposts()
  }, [])

  const findposts = async () => {
    try {
      const response = await api.get("/company/findposts")
      if (response.status === 200) {
        const data = response.data.posts
        setPosts(data)
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  const findJobPsts = async (page = 1) => {
    try {

      lastFetchedPage.current = page;




      const response = await api.get(`/company/getjobs?page=${page}&limit=${itemsPerPage}`);

      if (response.status === 200) {


        const data: modalProps[] = response.data.postedJobs || [];
        setTotalPages(response.data.totalPages || 1);

        setJobs((prevJobs) => {

          const updatedJobs: modalProps[] = [...prevJobs];
          data.forEach((job) => {
            if (!job.isDelete) {
              const index = updatedJobs.findIndex((j) => j?._id === job?._id);
              if (index !== -1) {
                updatedJobs[index] = job;
              } else {
                updatedJobs.push(job);
              }
            }
          });
          return updatedJobs;
        });
      }
    } catch (error) {
      console.log("Error fetching jobs:", error);
    }
  };



  const fetchReviews = async (page = 1) => {
    try {
      console.log("page", page);
      setLoading(true);


      const delay = new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await api.get(`/rating/findreviews?page=${page}&limit=${limit}`);
      console.log("res", response);

      const data = response.data.reviews;
      const more = response.data.hasMore;
      console.log("more", more);

      if (response.status === 200) {
        await delay;
        setReviews((prevReviews) => {

          const existingIds = new Set(prevReviews.map((r) => r._id));

          const updatedReviews = [...prevReviews];

          data.forEach((review) => {
            if (!review.isDelete) {
              const index = updatedReviews.findIndex((r) => r._id === review._id);

              if (index !== -1) {
                updatedReviews[index] = review;
              } else if (!existingIds.has(review._id)) {
                updatedReviews.push(review);
                existingIds.add(review._id);
              }
            }
          });


          return updatedReviews;

        });

        setHasMore(more);
      }


      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };



  const handleDelete = async (id: string) => {
    const response = await api.delete(`/company/deletereview/${id}`)
    if (response.status === 200) {
      fetchReviews()
    }
  }

  const handleRouote=()=>{
    console.log("dsfad");
    
    router.push("/company/profile/edit")
  }


  console.log("jobs",jobs);
  
  return (
    <div className="min-h-screen bg-gray-200 p-10 flex justify-center items-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl ">
      <div className="relative w-full flex flex-col ">

  <div
    className="w-full border-4 border-primary h-[200px] bg-cover bg-center rounded-lg"
    style={{
      backgroundImage: `url(${activeCompany?.banner || "/default-image.png"})`,
    }}
  ></div>

 
  <div className="absolute bottom-[-40px] flex justify-start ps-10  w-full">
  <div className="relative w-[100px] h-[100px]">
  <Image
    src={activeCompany?.logo || "/default-image.png"}
    alt="Profile"
    width={100} // Equal width and height
    height={200}
    
    className="w-24 h-24 rounded-full border-4  "
  />
</div>

  </div>
 <div className="flex justify-end items-center">
 <span className="text-end mr-3 italic text-md">{activeCompany?.name}</span>
 <span onClick={handleRouote}  className="mr-3 cursor-pointer z-50 relative"><TiEdit  className="text-xl"/></span>
  {activeCompany?.role === "premium" && (
            <div className="">
              <MdVerified className="ml-auto text-primary text-2xl cursor-pointer" />
            </div>
          )
  }
  

 </div>

</div>

        <div className="mt-14">
          <h2>About</h2>
          <span>{activeCompany?.about || "write about you"}</span> <br />
          <span>{status}</span>
        </div>
        <div className="flex justify-between items-center mt-6 mb-5 border-t pt-4">
          <div>
            <h3 className="text-xl font-semibold">Basic Information</h3>

            <span>Founded -</span><span className="text-primary"> {activeCompany?.foundedAt}</span> <br />
            <span>Headquarters - </span><span className="text-primary">{activeCompany?.headquarters}</span><br />
            {activeCompany?.workHours?.start && <span>Working Time :</span>} <span className="text-primary">{activeCompany?.workHours?.start} - {activeCompany?.workHours?.end}</span><br />
            <span>country :</span> <span className="text-primary">{activeCompany?.address?.country}</span><br />
            <span>Location :</span> <span className="text-primary">{activeCompany?.address?.landmark} {activeCompany?.address?.city},{activeCompany?.address?.state}</span>

          </div>

          <div className="">


            <div className="mt-6 ">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <p className="flex items-center gap-2 text-primary mt-2"><FaPhone /> {activeCompany?.contact}</p>
              <p className="flex items-center gap-2 text-primary mt-2"><FaEnvelope /> {activeCompany?.email}</p>
              <p className="flex items-center gap-2 text-primary mt-2"><FaGlobe /> current work</p>
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

        </div>

        <div >
          <h2 className="text-xl font-semibold">Team & Key People</h2>
          <span className="mb-3 ">Founder/CEO :</span>
          <span className="text-primary">{activeCompany?.founder}</span>
          <br /> <br />
          <span className="text-lg font-normal">Key Team Members</span>

          {/* <ul className="mb-5">
            {activeCompany?.employees && activeCompany?.employees?.length > 0 ? (
              activeCompany?.employees.map((user, index) => {
                
                return <li className="text-primary" key={index}>{user?.employee} - {user?.position}</li>
              })
            ) : (
              <li>Write employees of your company...</li>
            )}
          </ul> */}
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
          <p className="mb-5">Manage your company s job listings and posts here. Keep your updates organized and relevant.
            You can add new job openings, share company news, or remove outdated posts anytime.
            Keeping this section updated ensures your team has the latest information.</p>


          {/* <button
            onClick={() => setIsOpenPosts(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-white hover:text-primary hover:border border-black transition">
            <FaRegImage />
          </button> */}
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-primary text-white  rounded-lg hover:bg-white hover:text-primary hover:border border-black transition ml-2">
            <ImProfile />
          </button>

          <Modal isOpen={isOpen} setIsOpen={setIsOpen} jobs={jobs} setJobs={setJobs} findJobPsts={findJobPsts} currentPage={currentPage} totalPages={totalPages} />
          <PostModal isOpenPosts={isOpenPosts} setIsOpenPosts={setIsOpenPosts} />

        </div>
        <hr className="mt-5" />


        <div className="mt-6">

          <h3 className="text-lg font-semibold">Customer Feedbacks</h3>
          {
            reviews?.map((rev) => (
              <div
                key={rev?._id}
                className="mt-3 p-4 bg-gray-100 rounded-lg">
                <div className="flex justify-end ">
                  <MdDelete onClick={() => handleDelete(rev._id)} />
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



          {loading && (
            <div className="flex justify-center mt-5 text-2xl">
              <span className=" bg-white text-center  ">
                <Spinner className="text-2xl" />
              </span>
            </div>
          )}



          {(hasMore && !loading) && (
            <div className="flex justify-center">
              <button
                onClick={() => fetchReviews(page + 1)}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
              >
                View Moress
              </button>
            </div>
          )}


        </div>

      </div>
    </div>
  );
};

export default CompanyProfile;
