"use client";

import { UserProfile } from "@/lib/store/features/userSlice";
import api from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";

const Users = () => {
  const [data, setData] = useState<UserProfile[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await api.get("admin/users");
      const nonAdminUsers = response.data.users;
      setData(nonAdminUsers);
    };
    fetchUsers();
  }, []);
  const handleBlock = async (id: string) => {
    const response = await api.patch(`/admin/blockandunblock/${id}`);
    const updatedUser = response.data.data;
    console.log(updatedUser);
    setData((prevData) =>
      prevData.map((user) =>
        user._id === updatedUser._id
          ? { ...user, isBlocked: updatedUser.isBlocked }
          : user
      )
    );
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
                  Full Name
                  </th>
                  <th className="p-5 text-left font-semibold text-gray-900">
                   Email
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
                {data.map((user) => (
                  <tr key={user._id} className="bg-white hover:bg-gray-50">
                    <td className="p-5 text-sm text-gray-900"><p className="text-sm text-gray-900">
                            {user.firstName} {user.lastName}
                          </p></td>
                    <td className="p-5 text-sm text-gray-900">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            user.profileImage ||
                            "ass"
                          }
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
                    <td className="p-5 text-sm text-gray-900">
                      {user.role || "N/A"}
                    </td>

                    <td className="p-5 flex gap-2">
                      <button className="p-2 bg-indigo-600 text-white rounded">
                        View
                      </button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
