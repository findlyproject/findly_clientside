"use client"; // ✅ Ensure this component runs on the client

import { useRouter } from "next/navigation"; // ✅ Correct import for Next.js 13+

export const CommunityPanel = () => {
  const router = useRouter(); // ✅ Ensures router is used in a client component

  const users = [
    { _id: "1", imgUrl: "/user1.jpg", fullname: "John Doe", profession: "Engineer" },
    { _id: "2", imgUrl: "/user2.jpg", fullname: "Jane Smith", profession: "Designer" },
    { _id: "3", imgUrl: "/user3.jpg", fullname: "Michael Brown", profession: "Developer" },
  ];

  return (
    <section className="bg-white min-h-[300px] rounded-lg my-2 sticky top-[76px] flex flex-col justify-center p-4 shadow-md">
      <div className="container">
        <div className="text-center font-semibold text-gray-700">
          <p>Add to your feed</p>
        </div>
        <br />
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer rounded-lg transition"
              onClick={() => router.push(`/profile/${user._id}`)}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img src={user.imgUrl} className="w-full h-full object-cover" alt={user.fullname} />
              </div>
              <div className="ml-3">
                <div className="text-lg font-medium text-gray-800">{user.fullname}</div>
                <div className="text-sm text-gray-500">{user.profession}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
