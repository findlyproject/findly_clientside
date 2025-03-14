// "use client";
// import {
//   adminDeletePost,
//   removeReports,
// } from "@/lib/store/features/actions/adminActions";
// import { fetchAllPosts } from "@/lib/store/features/actions/postActions";

// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import OutsideClickHandler from "react-outside-click-handler";
// import { IPost } from "@/types/Types";
// import api from "@/utils/api";
// const ReportedPosts = () => {
//   const [openReportId, setOpenReportId] = useState<string | null>(null);
//   const [filter, setFilter] = useState("all");
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const[post,setPost]=useState([])
//   const[user,setUser]=useState([])
//   const[activeTab,setActiveTab]=useState('post')

// useEffect(()=>{
// const fetchPosts=async()=>{
//   const response=await api.get(`/admin/post`)
//   setPost(response.data.postReports)
//   const res=await api.get(`/admin/user`)
//   setUser(res.data.userReports)
// }
// fetchPosts()
// },[])
//   const reportedPosts: IPost[] = useAppSelector(
//     (state) =>
//       state.post.posts?.filter(
//         (post) =>
//           Array.isArray(post.reports) &&
//           post.reports.length > 0 &&
//           !post.isDeleted
//       ) || []
//   );

//   useEffect(() => {
//     dispatch(fetchAllPosts(0));
//   }, []);
// console.log("from report page ",reportedPosts);

//   // Function to get date range
//   const getFilteredPosts = () => {
//     const now = new Date();
//     const today = new Date(now.setHours(0, 0, 0, 0));
//     const thisWeek = new Date(now.setDate(now.getDate() - now.getDay()));
//     const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

//     return reportedPosts.filter((post) =>
//       post.reports?.some((report) => {
//         const reportDate = new Date(report.createdAt);
//         if (filter === "today") return reportDate >= today;
//         if (filter === "week") return reportDate >= thisWeek;
//         if (filter === "month") return reportDate >= thisMonth;
//         return true; // "all"
//       })
//     );
//   };

//   // Toggle report actions dropdown
//   const handleOpen = (id: string) => {
//     setOpenReportId((prevId) => (prevId === id ? null : id));
//   };

//   const deletePost = async (postId: string) => {
//     try {
//       const result = await dispatch(adminDeletePost(postId));
//       if (result.type === "delete/post/fulfilled") {
//         dispatch(fetchAllPosts(1));
//       }
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   // Dismiss a report
//   const handleDismissReport = async (postId: string) => {
//     try {
//       const result = await dispatch(removeReports(postId));
//       if (result.type === "remove/reports/fulfilled") {
//         dispatch(fetchAllPosts(1));
//       }
//     } catch (error) {
//       console.error("Error dismissing report:", error);
//     }
//   };

//   const filteredPosts = getFilteredPosts();

//   if (filteredPosts.length === 0) {
//     return (
//       <>
//         {/* Filter Dropdown */}
//         <div className="mb-4">
//           <label className="text-gray-700 font-semibold mr-2">Filter by:</label>
//           <select
//             className="border px-3 py-2 rounded-lg"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//           >
//             <option value="all">All Reports</option>
//             <option value="today">Today</option>
//             <option value="week">This Week</option>
//             <option value="month">This Month</option>
//           </select>
//         </div>
//         <div className="flex justify-center items-center h-screen">
//           <p className="text-lg font-medium">No reported posts found.</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <div className="flex flex-col p-4">
//       <section className="overflow-x-auto pb-4">
//         <div className="w-full max-w-7xl mx-auto px-4 md:px-5 lg:px-5">
//           <h2 className="text-gray-900 text-3xl font-bold mb-6">
//             Reported Posts
//           </h2>

//           {/* Filter Dropdown */}
//           <div className="mb-4">
//             <label className="text-gray-700 font-semibold mr-2">
//               Filter by:
//             </label>
//             <select
//               className="border px-3 py-2 rounded-lg"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//             >
//               <option value="all">All Reports</option>
//               <option value="today">Today</option>
//               <option value="week">This Week</option>
//               <option value="month">This Month</option>
//             </select>
//           </div>

//           <div className="overflow-x-auto w-full">
//             <table className="w-full border rounded-lg">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="p-3 text-left">ID</th>
//                   <th className="p-3 text-left">Post</th>
//                   <th className="p-3 text-left">Reports</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPosts.map((post, index) => (
//                   <tr
//                     key={`${post._id}-${index}`}
//                     className="bg-white hover:bg-gray-50 border-b"
//                   >
//                     <td
//                       className="p-5"
//                       onClick={() => router.push(`/admin/posts/${post._id}`)}
//                     >
//                       {post._id}
//                     </td>
//                     <td
//                       className="p-5 flex items-center gap-3"
//                       onClick={() => router.push(`/admin/posts/${post._id}`)}
//                     >
//                       {((post?.images?.length && post?.images?.length > 0) ||
//                         post.video) && (
//                         <div className="flex gap-2">
//                           {post.images?.slice(0, 2).map((image, index) => (
//                             <Image
//                               key={index}
//                               className="rounded-xl max-h-32 object-cover w-20 lg:w-auto"
//                               src={image}
//                               alt={`Post Image ${index + 1}`}
//                               width={100}
//                               height={100}
//                             />
//                           ))}
//                           {post.video && (
//                             <video
//                               className="rounded-xl max-h-32 object-cover"
//                               controls
//                               width={100}
//                               height={100}
//                             >
//                               <source src={post.video} type="video/mp4" />
//                               Your browser does not support the video tag.
//                             </video>
//                           )}
//                         </div>
//                       )}
//                     </td>
//                     <td
//                       className="p-5"
//                       onClick={() => router.push(`/admin/posts/${post._id}`)}
//                     >
//                       {post.reports?.length && post.reports?.length > 0 && (
//                         <div className="p-3 border rounded-lg bg-gray-100 w-full">
//                           <h5 className="text-gray-900 text-lg font-semibold mb-2">
//                             Reports:
//                           </h5>
//                           {post.reports?.map((report) => (
//                             <div
//                               key={report._id}
//                               className="border-b py-2 last:border-none"
//                             >
//                               <p className="text-gray-600 text-sm">
//                                 {new Date(
//                                   report.createdAt
//                                 ).toLocaleDateString()}{" "}
//                                 -{" "}
//                                 {new Date(
//                                   report.createdAt
//                                 ).toLocaleTimeString()}
//                               </p>
//                               <p className="text-gray-900 font-semibold">
//                                 Reason: {report.reason}
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </td>
//                     <td className="py-5 px-3 text-center relative">
//                       <button
//                         onClick={() => handleOpen(post._id)}
//                         className="p-2 hover:bg-gray-100 transition-all duration-300"
//                       >
//                         ⋮
//                       </button>
//                       {openReportId === post._id && (
//                         <OutsideClickHandler
//                           onOutsideClick={() => setOpenReportId(null)}
//                         >
//                           <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-40 bg-white border rounded-lg shadow-lg z-50">
//                             <button
//                               className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                               onClick={() => handleDismissReport(post._id)}
//                             >
//                               Dismiss Report
//                             </button>
//                             <button
//                               className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                               onClick={() => deletePost(post._id)}
//                             >
//                               Delete Post
//                             </button>
//                           </div>
//                         </OutsideClickHandler>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ReportedPosts;

"use client";

import React, { useEffect, useState } from "react";

import api from "@/utils/api";
import {
  adminDeletePost,
  removeReports,
} from "@/lib/store/features/actions/adminActions";
import { fetchAllPosts } from "@/lib/store/features/actions/postActions";
import { useAppDispatch } from "@/lib/store/hooks";
import { IReport } from "@/types/Types";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import { setReports } from "@/lib/store/features/adminSlice";
function ReportedPosts() {
  const [post, setPost] = useState<IReport[]>([]);
  const [user, setUser] = useState<IReport[]>([]);
  const [all, setAll] = useState<IReport[]>([]);
  const [activeTab, setActiveTab] = useState("post");
  const [isOpen, setIsOpen] = useState(false);

  const router=useRouter()
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await api.get(`/admin/post`);
      setPost(response.data.postReports);
      const res = await api.get(`/admin/user`);
      setUser(res.data.userReports);
      const reports=response.data.postReports.length+res.data.userReports.length
      dispatch(setReports(reports))
    };
    fetchPosts();
  }, [dispatch]);


  useEffect(() => {
    if (activeTab === "post") {
      setAll(post);
    } else {
      setAll(user);
    }
  }, [activeTab, user, post]);

  console.log("allllllll", all);

  const handleDismissReport = async (postId: string) => {
    try {
      const result = await dispatch(removeReports(postId));
      if (result.type === "remove/reports/fulfilled") {
        dispatch(fetchAllPosts(1));
      }
    } catch (error) {
      console.error("Error dismissing report:", error);
    }
  };
  const deletePost = async (postId: string) => {
    try {
      const result = await dispatch(adminDeletePost(postId));
      if (result.type === "delete/post/fulfilled") {
        dispatch(fetchAllPosts(1));
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 text-lg font-semibold  transition-all ${
              activeTab === "post"
                ? "border-b border-primary text-primary"
                : "border-b border-gray-700 text-gray-700 "
            }`}
            onClick={() => setActiveTab("post")}
          >
            Post reports
          </button>
          <button
            className={`px-4 py-2 text-lg font-semibold  transition-all ${
              activeTab === "yourPosts"
                ? " border-b border-primary text-primary"
                : "border-b border-gray-700 text-gray-700 "
            }`}
            onClick={() => setActiveTab("user")}
          >
            User reports
          </button>
        </div>

        <h1 className="text-2xl font-bold text-center mt-6">
          {activeTab === "post" ? "Reported Posts" : " Reported User"}
        </h1>
        <div className="p-4 md:p-8">
          {activeTab === "post" ? (
            all.length > 0 ? (
              all.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row mb-8 border border-gray-200 rounded-lg shadow-md dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <div className="relative md:w-1/2 w-full group">
                    <img
                      src={item.postId?.images?.[0]}
                      alt="Post"
                      className="object-cover w-full h-full rounded-t-lg md:rounded-none md:rounded-s-lg"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-70 text-black text-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.postId?.description || "No Description"}
                    </div>
                  </div>

                  <div className="md:w-1/2 w-full flex flex-col justify-between p-6">

                  <div className="relative inline-block text-left mb-4">
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 text-primary"
        >
         <BsThreeDotsVertical/>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          
            <div className="py-1">
              <button
                onClick={() => {
                  deletePost(item.postId?._id);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Remove Post
              </button>
              <button
                onClick={() => {
                  handleDismissReport(item.postId._id);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Dismiss
              </button>
              <button
                onClick={() => router.push(`/admin/dashboard`)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Back
              </button>
            </div>
        
        </div>
      )}
    </div>

                    <div>
                      <span className="font-semibold">Reason:-</span>
                      <p className="my-2 text-gray-700 dark:text-gray-300">
                        {item?.reason}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold dark:text-white">
                        Reported By:
                      </span>
                      <div className="flex items-center mt-2">
                        <img
                          className="rounded-full w-10 h-10 object-cover"
                          src={
                            item.reportedBy?.profileImage ||
                            "https://via.placeholder.com/150"
                          }
                          alt="Reporter Profile"
                        />
                        <div className="ml-3">
                          <p className="font-medium dark:text-white">
                            {item.reportedBy?.lastName || "Unknown"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.reportedBy.jobTitle?.[0] || "MERN Developer"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-500 text-xs mt-4">
                      Created At:{" "}
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No posts available.</p>
            )
          ) : null}

          {activeTab === "user" ? (
            all.length > 0 ? (
              all.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row mb-8 border border-gray-200 rounded-lg shadow-md dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-6">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white ">
                      Reported User
                    </h3>

                    <div className="relative group mb-4">
                      <img
                        src={
                          item.userId?.profileImage ||
                          "https://via.placeholder.com/150"
                        }
                        alt="Reported User"
                        className="object-cover w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600"
                      />

                      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 text-black text-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center rounded-b-full">
                        {item.userId?.email || "No Email"}
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="font-semibold text-lg dark:text-white">
                        {item.userId?.firstName || "Unknown"}{" "}
                        {item.userId?.lastName || "User"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {item.userId?.jobTitle?.[0] || "No Job Role"}
                      </p>
                    </div>
                  </div>

                  <div className="md:w-1/2 w-full flex flex-col justify-between p-6">
                      <div className="relative inline-block text-left mb-4">
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 text-primary"
        >
         <BsThreeDotsVertical/>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          
            <div className="py-1">
              <button
                onClick={() => {
                  deletePost(item.postId?._id);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Block User
              </button>
              <button
                onClick={() => {
                  handleDismissReport(item._id);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Dismiss
              </button>
              <button
                onClick={() => router.push(`/admin/dashboard`)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Back
              </button>
            </div>
        
        </div>
      )}
    </div>

                    <div>
                      <span className="font-semibold">Reason:-</span>
                      <p className="my-2 text-gray-700 dark:text-gray-300">
                        {item?.reason}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold dark:text-white">
                        Reported By:
                      </span>
                      <div className="flex items-center mt-2">
                        <img
                          className="rounded-full w-10 h-10 object-cover"
                          src={
                            item.reportedBy?.profileImage ||
                            "https://via.placeholder.com/150"
                          }
                          alt="Reporter Profile"
                        />
                        <div className="ml-3">
                          <p className="font-medium dark:text-white">
                            {item.reportedBy?.lastName || "Unknown"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.reportedBy.jobTitle?.[0] || "MERN Developer"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-500 text-xs mt-4">
                      Created At:{" "}
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No users found.</p>
            )
          ) : null}

          {activeTab !== "post" && activeTab !== "user" && (
            <p className="text-center text-gray-500">Please select a tab.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportedPosts;
