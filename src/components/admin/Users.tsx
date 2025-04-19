// "use client";

// import {
//   blockUser,
//   fetchUsers,
// } from "@/lib/store/features/actions/adminActions";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { useRouter } from "next/navigation";

// import { useEffect, useState } from "react";

// const Users = () => {
//   const router = useRouter();
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 10;
//   const dispatch = useAppDispatch();
//   const users = useAppSelector((state) => state.admin.users);

//   useEffect(() => {
//     findUsers();
//   }, []);

//   const findUsers = async () => {
//     await dispatch(fetchUsers());
//   };

//   const handleBlock = async (id: string) => {
//     const result = await dispatch(blockUser(id));
//     if (result.type === "block/uses/fulfilled") {
//       findUsers();
//     }
//   };

//   const totalPages = Math.ceil(users.length / usersPerPage);
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   const goToPage = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="flex flex-col">
//       <div className="overflow-x-auto pb-4">
//         <div className="min-w-full inline-block align-middle">
//           <div className="overflow-hidden border rounded-lg border-gray-300">
//             <table className="table-auto min-w-full rounded-xl">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="p-5 text-left font-semibold text-gray-900">
//                     User
//                   </th>

//                   <th className="p-5 text-left font-semibold text-gray-900">
//                     Role
//                   </th>
//                   <th className="p-5 text-left font-semibold text-gray-900">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-300">
//                 {currentUsers.map((user) => (
//                   <tr key={user._id} className="bg-white hover:bg-gray-50">
//                     <td className="p-5 text-sm text-gray-900">
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={user.profileImage || "/default-avatar.png"}
//                           height={30}
//                           width={30}
//                           alt={user.firstName}
//                           className="w-10 h-10 rounded-full"
//                         />
//                         <div>
//                           <p className="text-xs text-gray-500">
//                             {" "}
//                             {user.firstName} {user.lastName}
//                           </p>
//                           <p className="text-xs text-gray-500">{user.email}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-5 text-sm text-gray-900">
//                       {user.role || "N/A"}
//                     </td>
//                     <td className="p-5 flex gap-2">
//                       <button
//                         className="p-2 bg-primary text-white rounded"
//                         onClick={() => router.push(`/admin/users/${user._id}`)}
//                       >
//                         View
//                       </button>
//                       <button
//                         className={`text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 rounded-md  transition ${
//                           user.isBlocked
//                             ? "bg-primary text-white"
//                             : "bg-purple-200 text-primary w-20"
//                         }`}
//                         onClick={() => handleBlock(user._id)}
//                       >
//                         {user.isBlocked ? "Unblock" : "Block"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="flex justify-center items-center p-4 gap-2">
//               <button
//                 onClick={() => goToPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//               >
//                 Previous
//               </button>

//               {Array.from({ length: totalPages }, (_, index) => index + 1).map(
//                 (page) => (
//                   <button
//                     key={page}
//                     onClick={() => goToPage(page)}
//                     className={`px-3 py-1 rounded ${
//                       currentPage === page
//                         ? "bg-primary text-white"
//                         : "bg-gray-200 hover:bg-gray-300"
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 )
//               )}

//               <button
//                 onClick={() => goToPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Users;


"use client";

import {
  blockUser,
  fetchUsers,
} from "@/lib/store/features/actions/adminActions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Users = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.admin.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleBlock = async (id: string) => {
    const result = await dispatch(blockUser(id));
    if (result.type === "block/uses/fulfilled") {
      dispatch(fetchUsers());
    }
  };

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const goToPage = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Members</h2>
        <div className="flex gap-3">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            Add new
          </button>
          <button className="border px-4 py-2 rounded-md">Import members</button>
          <button className="border px-4 py-2 rounded-md">Export members</button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Photo</th>
              <th className="p-4 text-left">Member name</th>
              <th className="p-4 text-left">Mobile</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-4">
                  <Image
                    src={user.profileImage || "/default-avatar.png"}
                    alt={user.firstName}
                    className="h-10 w-10 rounded-full object-cover"
                    width={40}
                    height={40}
                  />
                </td>
                <td className="p-4">
                  <div className="font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                </td>
                <td className="p-4">{user.phoneNumber || "N/A"}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.isBlocked
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.isBlocked ? "Inactive" : "Active"}
                  </span>
                </td>
                <td className="p-4 flex justify-center gap-3">
                  <button
                    onClick={() => router.push(`/admin/users/${user._id}`)}
                    className="bg-gray-100 p-2 rounded hover:bg-gray-200"
                    title="View"
                  >
                    <svg
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleBlock(user._id)}
                    className={`p-2 rounded hover:opacity-80 ${
                      user.isBlocked
                        ? "bg-primary text-white"
                        : "bg-purple-100 text-primary"
                    }`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>

                  <button
                    onClick={() => console.log("Delete user", user._id)}
                    className="bg-red-100 p-2 rounded hover:bg-red-200"
                    title="Delete"
                  >
                    <svg
                      className="h-5 w-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m5 0H6"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
