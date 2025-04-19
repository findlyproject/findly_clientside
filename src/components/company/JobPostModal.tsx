/* eslint-disable @typescript-eslint/no-unused-vars */
// import { companyData } from "@/lib/store/features/companyslice";
'use client'
import { IoMdCloseCircle } from "react-icons/io";
import { Card } from "flowbite-react";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";

import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import IconButton from "@mui/joy/IconButton";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoLink } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";
import { Spinner } from "@material-tailwind/react";

import { useAppDispatch } from "@/lib/store/hooks";
import { deleteJob, editJobDeadline } from "@/lib/store/features/actions/companyActions";
import { ChangeEventType, Job } from "@/types/Types";
import { useState } from "react";
import { useRouter } from "next/navigation";

export interface modalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setCurrentPage: (page: number) => void;
  currentPage: number;
 
  jobs:Job[]


  findJobPsts: (value: number) => void,
  setJobs: React.Dispatch<React.SetStateAction<Job  []>>

}


const Modal: React.FC<modalProps> = ({ isOpen, setIsOpen, jobs, setJobs, findJobPsts, currentPage }) => {
 
  const [detailModal, setDetailsModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job| null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newDeadline, setNewDeadline] = useState(selectedJob?.applicationDeadline as string );
  const [loading, setLoading] = useState(false);
  console.log("selectedJob", selectedJob);
  const dispatch=useAppDispatch()
const route=useRouter()

  const handleClose = () => {
    setIsOpen(false);

  };


  const handleDetails = (job: modalProps["jobs"][0]) => {
    setSelectedJob(job);
    setDetailsModal(true)

  };




  const handleEdit = (job: modalProps["jobs"][0]) => {

    setIsEditing(true);
    setSelectedJob(job);

  };
  const handleChange = (e:ChangeEventType) => {
    setNewDeadline(e.target.value);
  };
  const handleBlur = async () => {
    if (!selectedJob?._id) return;
    if (isEditing === false) return

    setLoading(true);
    console.log("deadline", newDeadline);

    try {
      const jobId=selectedJob?._id
      const result=await dispatch(editJobDeadline({jobId,newDeadline}))
      if(result.type==="edit/deadline/fulfilled"){
        await findJobPsts(currentPage);
      }
 
    } catch (error) {
      console.error("Error updating deadline:", error);
    } finally {
      setTimeout(() => {
        console.log("ddddddddddd");

        setLoading(false);
        setIsEditing(false);
      }, 1000);
    }
  };


  const handleDelete = async (job: modalProps["jobs"][0]) => {

    try {
      const jobId = job._id
      alert(`Delete job: ${jobId}`);
      setLoading(true);
      setSelectedJob(job)

      const result =await dispatch(deleteJob(jobId))
      if(result.type==="delete/job/fulfilled"){
        findJobPsts(currentPage);
        setTimeout(() => {
          setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
          setSelectedJob(null)
          setLoading(false);
        }, 2000)
      }
  
    } catch (error) {
      console.log("dsad", error)


    }
  };

  const handleCopyLink = (jobId: string) => {
    const jobUrl = `${window.location.origin}/job/${jobId}`;
    navigator.clipboard.writeText(jobUrl);
    alert("Job link copied to clipboard!");
  };

  const toggleMenu = (jobId: string) => {
    setOpenMenu(openMenu === jobId ? null : jobId);
  };


  return (
    <div className="flex justify-start items-center bg-black">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto scrollbar-hidden   relative mt-10">

            <div className="flex justify-between z-10  items-center border-b pb-7 bg-primary sticky top-0 ">
              <div>

              </div>
              <h2 className="text-2xl font-bold mt-3 text-white">Posted Jobs</h2>
              <IoMdCloseCircle
                onClick={handleClose}
                className="text-3xl text-white hover:text-red-500 cursor-pointer transition-all"
              />
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-6">
              {jobs.map((job) => (
                <div key={job._id} className="flex justify-center">
                  <Card className={`relative   max-w-sm w-full border border-primary rounded-xl shadow-lg shadow-blue-500/50 p-6 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/50 hover:z-0 hover:-translate-y-2`}>
                    <div className="flex justify-between items-center ">
                      {isEditing && (selectedJob?._id == job._id) ? (
                        <div>
                          <input
                            type="date"
                            value={new Date(newDeadline || job.applicationDeadline).toISOString().split("T")[0]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="absolute top-2 right-14 text-xs px-3 py-1 rounded-lg font-semibold border w-fit bg-white text-black"
                          />

                        </div>
                      ) : (
                        <p
                          className={`absolute top-2 right-8 text-xs text-white px-3 py-1 rounded-lg font-semibold w-fit ${new Date(job.applicationDeadline) < new Date()
                            ? "text-red-700"
                            : new Date(job.applicationDeadline) <= new Date(new Date().setDate(new Date().getDate() + 15))
                              ? "text-yellow-500"
                              : "text-green-400"
                            }`}
                        >
                          📅 {new Date(job.applicationDeadline).toDateString()}
                        </p>
                      )}


                      <div className="absolute top-1 right-2">

                        {/* {loading && <span className="ml-2 text-sm text-gray-500">Updating...</span>} */}
                        <Dropdown open={openMenu === job._id} onOpenChange={() => toggleMenu(job._id)}>
                          <MenuButton
                            slots={{ root: IconButton }}
                            slotProps={{ root: { variant: "plain", color: "neutral" } }}
                          >
                            <HiDotsHorizontal size={20} />
                          </MenuButton>
                          <Menu>
                            <MenuItem onClick={() => handleEdit(job)}><FaCalendarAlt />Edit deadline</MenuItem>
                            <MenuItem onClick={() => handleDelete(job)}><RiDeleteBinLine />Delete</MenuItem>
                            <MenuItem onClick={() => handleCopyLink(job._id)}><GoLink />Copy Link</MenuItem>
                          </Menu>
                        </Dropdown>
                      </div>

                    </div>

                    {
                      loading && selectedJob?._id === job._id && (
                        <span className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
                          <Spinner
                            {...({ className: "text-transparent fill-transparent" } as React.ComponentProps<typeof Spinner>)}
                          />
                          <div className="absolute w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin"></div>
                        </span>
                      )
                    }



                    <h2 className="text-lg font-semibold text-primary">{job.title}</h2>
                    <p className="flex items-center  text-sm text-gray-600"> <FaLocationDot className="text-primary me-3" /> {job.location}</p>
                    <p className="text-sm text-gray-700 flex items-center">
                      <RiMoneyRupeeCircleFill className="text-primary me-3 " />{job.salary.min} - ₹{job.salary.max} {job.salary.rate}
                    </p>
                    <p className="text-sm text-gray-700">
                      {job.jobType}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Posted At:</span> {new Date(job.createdAt).toDateString()}
                    </p>


                    <div className="flex flex-col gap-2 mt-2">



                      <button
                         onClick={()=>route.push(`/company/jobs/details/${job._id}`)}
                        className="mt-4 flex items-center justify-center bg-primary hover:shadow-black text-white font-semibold  px-4 rounded-lg transition-all duration-300">
                        View Details

                      </button>

                    </div>

                  </Card>
                </div>
              ))}

            </div>
            {/* {detailModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50 transition-all">
                <div className="bg-white dark:bg-gray-800 w-[90%] max-w-3xl rounded-2xl shadow-2xl p-6 relative">


                  <button
                    onClick={() => setDetailsModal(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-all text-2xl"
                  >
                    <IoMdCloseCircle />
                  </button>


                  <div className="text-center mb-6 ">
                    <h2 className="text-2xl font-bold text-primary">{selectedJob?.title}</h2>

                  </div>


                  <div className=" flex flex-col  w-full">
                    <div className="flex justify-between">
                      <div>
                        <img className="w-40 h-40" src={selectedJob?.company.logo} alt="" />
                        <p className="text-primary text-sm text-center italic">
                          {selectedJob?.company?.name
                            ?.toLowerCase()
                            .replace(/\b\w/g, (char) => char.toUpperCase())}
                        </p>
                      </div>
                      <div>
                        {isEditing && (selectedJob?._id == jobs._id) ? (
                          <div>
                            <input
                              type="date"
                              value={new Date(newDeadline || selectedJob.applicationDeadline).toISOString().split("T")[0]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="absolute top-2 right-14 text-xs px-3 py-1 rounded-lg font-semibold border w-fit bg-white text-black"
                            />

                          </div>
                        ) : (
                          <p
                            className={`text-xs text-white px-3 py-1 rounded-lg font-semibold w-fit ${new Date(selectedJob.applicationDeadline) < new Date()
                              ? "bg-red-500"
                              : new Date(selectedJob?.applicationDeadline) <= new Date(new Date().setDate(new Date().getDate() + 15))
                                ? "bg-yellow-500"
                                : "bg-green-500"
                              }`}
                          >
                            📅 {new Date(selectedJob.applicationDeadline).toDateString()}
                          </p>
                        )}
                        <div className="text-primary"><strong className="text-black">Type:</strong> {selectedJob?.jobType}</div>
                        <div className="text-primary"><strong className="text-black">Experience:</strong  > {selectedJob?.experienceLevel}</div>
                        <div className="text-primary"><strong className="text-black">Industry:</strong> {selectedJob?.industry}</div>
                        <div className="text-primary"><strong className="text-black">Salary:</strong> ₹{selectedJob?.salary?.min} - ₹{selectedJob?.salary?.max}</div>

                        <div><strong>Deadline:</strong> {new Date(selectedJob?.applicationDeadline).toDateString()}</div>

                      </div>

                      <div>
                        {isEditing && (selectedJob?._id == job._id) ? (
                          <div>
                            <input
                              type="date"
                              value={new Date(newDeadline || selectedJob.applicationDeadline).toISOString().split("T")[0]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="absolute top-2 right-14 text-xs px-3 py-1 rounded-lg font-semibold border w-fit bg-white text-black"
                            />

                          </div>
                        ) : (
                          <p
                            className={`text-xs text-white px-3 py-1 rounded-lg font-semibold w-fit ${new Date(selectedJob.applicationDeadline) < new Date()
                              ? "bg-red-500"
                              : new Date(selectedJob.applicationDeadline) <= new Date(new Date().setDate(new Date().getDate() + 15))
                                ? "bg-yellow-500"
                                : "bg-green-500"
                              }`}
                          >
                            📅 {new Date(selectedJob.applicationDeadline).toDateString()}
                          </p>
                        )}
                        <div className="text-primary"><strong className="text-black">Type:</strong> {selectedJob?.jobType}</div>
                        <div className="text-primary"><strong className="text-black">Experience:</strong  > {selectedJob?.experienceLevel}</div>
                        <div className="text-primary"><strong className="text-black">Industry:</strong> {selectedJob?.industry}</div>
                        <div className="text-primary"><strong className="text-black">Salary:</strong> ₹{selectedJob?.salary?.min} - ₹{selectedJob?.salary?.max}</div>

                        <div><strong>Deadline:</strong> {new Date(selectedJob?.applicationDeadline).toDateString()}</div>

                      </div>
                    </div>
                  </div>


                  <div className="mt-4">
                    <h3 className="font-semibold text-lg text-primary">Job Description</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {selectedJob?.description}
                    </p>
                  </div>


                  <div className="mt-4">
                    <h3 className="font-semibold text-lg text-primary">Requirements</h3>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm list-disc pl-5">
                      {selectedJob?.requirements?.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>


                  {selectedJob?.benefits?.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-semibold text-lg text-primary">Benefits</h3>
                      <ul className="text-gray-600 dark:text-gray-400 text-sm list-disc pl-5">
                        {selectedJob?.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>

                  </div>
                </div>
              </div>
            )} */}




            <div className="flex justify-center mt-6 p-10">
              <button
                onClick={() => findJobPsts(currentPage + 1)}
                className="mt-4 flex items-center justify-center py-2 bg-primary hover:shadow-black text-white font-semibold  px-4 rounded-lg transition-all duration-300"
              >
                View More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default Modal;
