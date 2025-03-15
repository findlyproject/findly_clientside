"use client";

import {
  fetchCompanies,
  handleBlock,
} from "@/lib/store/features/actions/adminActions";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const Companies = () => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.admin.companies);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 4
  useEffect(() => {
    listCompanies();
  }, []);

  console.log("companies", companies);

  const listCompanies = () => {
    dispatch(fetchCompanies());
  };

  const unblockAndBlock =async (id: string) => {
    const result =await dispatch(handleBlock(id));

    console.log("result", result);
    if (handleBlock.fulfilled.match(result)) {
      console.log("Company status updated:", result.payload);
      listCompanies(); 
    } else if (handleBlock.rejected.match(result)) {
      console.error("Failed to update company status:", result.payload);
      listCompanies(); 
    }
   
  };

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );
  const totalPages = Math.ceil(companies.length / companiesPerPage);

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
                  <th className="p-5 text-left font-semibold text-gray-900">
                    Company
                  </th>
                  <th className="p-5 text-left font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="p-5 text-left font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {currentCompanies.map((user, index) => (
                  <tr
                    key={`${user._id}-${index}`}
                    className="bg-white hover:bg-gray-50"
                  >
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
                    <td className="p-5 text-sm text-gray-900">
                      {user.role || "N/A"}
                    </td>
                    <td className="p-5 flex gap-2">
                      <button
                        onClick={() =>
                          router.push(`/admin/companies/${user._id}`)
                        }
                        className="p-2 bg-primary text-white rounded"
                      >
                        View
                      </button>
                      <button
                        className={`text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 rounded-md  transition ${
                          user.isBlocked
                            ? "bg-primary text-white"
                            : "bg-purple-200 text-primary"
                        }`}
                        onClick={() => unblockAndBlock(user._id)}
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
                    currentPage === i + 1
                      ? "bg-primary text-white"
                      : "bg-gray-200"
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
