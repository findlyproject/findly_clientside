

"use client";

import { companyData } from "@/lib/store/features/companyslice";
import api from "@/utils/api";
import { useEffect, useState } from "react";

const Companies = () => {
  const [data, setData] = useState<companyData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await api.get("admin/companies");
      setData(response.data.companies);
    };
    fetchCompanies();
  }, []);

  const handleBlock = async (id: string) => {
    const response = await api.patch(`/admin/blockandunblock/${id}`);
    const updatedUser = response.data.data;
    setData((prevData) =>
      prevData.map((user) =>
        user._id === updatedUser._id
          ? { ...user, isBlocked: updatedUser.isBlocked }
          : user
      )
    );
  };

  // Pagination Logic
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = data.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(data.length / companiesPerPage);

  // Handlers for Pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto pb-4">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg border-gray-300">
            <table className="table-auto min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-5 text-left font-semibold text-gray-900">User ID</th>
                  <th className="p-5 text-left font-semibold text-gray-900">Full Name & Email</th>
                  <th className="p-5 text-left font-semibold text-gray-900">Role</th>
                  <th className="p-5 text-left font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {data.map((user,index) => (
                  <tr key={`${user._id}-${index}`} className="bg-white hover:bg-gray-50">
                    <td className="p-5 text-sm text-gray-900">{user._id}</td>
                    <td className="p-5 text-sm text-gray-900">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.logo || "ass"}
                          height={30}
                          width={30}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-sm text-gray-900">{user.role || "N/A"}</td>
                    <td className="p-5 flex gap-2">
                      <button className="p-2 bg-indigo-600 text-white rounded">View</button>
                      <button
                        className={`text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 rounded-md text-white transition ${
                          user.isBlocked ? "bg-yellow-500 hover:bg-yellow-400" : "bg-red-600 hover:bg-red-700"
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

            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
              <button
                className="px-3 py-1 border rounded-md bg-gray-200 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="px-3 py-1 border rounded-md bg-gray-200 disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
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

export default Companies;
