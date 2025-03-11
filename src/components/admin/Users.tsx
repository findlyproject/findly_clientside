

"use client";

import { blockUser, fetchUsers } from "@/lib/store/features/actions/adminActions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { useEffect, useState } from "react";

const Users = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;  
  const dispatch=useAppDispatch()
  const users=useAppSelector((state)=>state.admin.users)

  useEffect(()=>{
    findUsers()
  },[])

  const findUsers=async()=>{
    await dispatch(fetchUsers())
 
  }

  const handleBlock = async (id: string) => {

    const result=await dispatch(blockUser(id))
    if(result.type==="block/uses/fulfilled"){
      findUsers()
    }

  };

  
  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto pb-4">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg border-gray-300">
            <table className="table-auto min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-5 text-left font-semibold text-gray-900">Full Name</th>
                  <th className="p-5 text-left font-semibold text-gray-900">Email</th>
                  <th className="p-5 text-left font-semibold text-gray-900">Role</th>
                  <th className="p-5 text-left font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {currentUsers.map((user) => (
                  <tr key={user._id} className="bg-white hover:bg-gray-50">
                    <td className="p-5 text-sm text-gray-900">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="p-5 text-sm text-gray-900">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.profileImage || "/default-avatar.png"}
                          height={30}
                          width={30}
                          alt={user.firstName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-sm text-gray-900">{user.role || "N/A"}</td>
                    <td className="p-5 flex gap-2">
                      <button className="p-2 bg-indigo-600 text-white rounded">View</button>
                      <button
                        className={`text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 rounded-md text-white transition ${
                          user.isBlocked
                            ? "bg-yellow-500 hover:bg-yellow-400"
                            : "bg-red-600 hover:bg-red-700 w-20"
                        }`}
                        onClick={() => handleBlock(user._id)}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center p-4 gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;

