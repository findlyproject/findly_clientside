"use client"; 
import { useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ Correct import for Next.js 13+

export const CommunityPanel = () => {
  const router = useRouter();
  const {peopleIknow}=useAppSelector((state)=>state.login)


  return (
    <section className="bg-white min-h-[300px] rounded-lg my-2 sticky top-[76px] flex flex-col justify-center p-4 shadow-md">
      <div className="container">
        <div className="text-center font-semibold text-gray-700">
          <p>Add to your feed</p>
        </div>
        <br />
        <div className="space-y-4">
          {peopleIknow.slice(0,4).map((user) => (
            <div
              key={user._id}
              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer rounded-lg transition"
              onClick={() => router.push(`/userdetails/${user._id}`)}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <Image src={user.profileImage} className="w-full h-full object-cover" width={20} height={20} alt={user.firstName} />
              </div>
              <div className="ml-3">
                <div className="text-lg font-medium text-gray-800">{user.firstName}</div>
                <div className="text-sm text-gray-500">{user.jobTitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
