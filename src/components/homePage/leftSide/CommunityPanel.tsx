"use client"; 
import { useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation"; 

export  function CommunityPanel(){
  const router = useRouter();
  const {peopleIknow}=useAppSelector((state)=>state.user)


  return (
    <section className="bg-white min-h-[300px] rounded-lg my-2 border flex flex-col justify-center p-4 shadow-md">
      <div className="container">
        <div className="text-center font-semibold text-gray-700">
          <p>Add to your feed</p>
        </div>
        <br />
        <div className="space-y-1">
          {peopleIknow.slice(0,5).map((user) => (
            <div
              key={user._id}
              className="flex items-center p-1 hover:bg-gray-100 cursor-pointer rounded-lg transition"
              onClick={() => router.push(`/user/${user._id}/User`)}
            >
              <div className="w-14 p-3 h-14 rounded-full overflow-hidden">
                <Image src={user.profileImage||""} className="w-8 h-8 object-cover" width={20} height={20} alt={user.firstName} />
              </div>
              <div className="ml-2">
                <div className="text-base font-medium text-gray-800">{user.firstName}</div>
                <div className="text-xs text-gray-500">{user.jobTitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
