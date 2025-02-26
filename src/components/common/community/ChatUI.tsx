"use client";
import { LuSend } from "react-icons/lu";
import { FaEllipsisV, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { HiPaperClip } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { useAppSelector } from "@/lib/store/hooks";
export default function ChatUI() {
  const activeuser=useAppSelector((state)=>state.user.activeuser)
  const [isOpen, setIsOpen] = useState(false);
  const [ismenuOpen, setIsmenuOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const router = useRouter();
  const [community, setCommunity] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
 const[input,setInput]=useState({
  name:"",
  description:"",
  profile:""
 })
const[image,setImage]=useState(null)

 const handleInputCange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
  
  const { name, value } = e.target;
  setInput((prev) => ({
    ...prev,
    [name]: value,
  }));
 }

 const handleImageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  const { name } = e.target;
    const file = e.target.files ? e.target.files[0] : null;
    setImage((prev) => ({
      ...prev,
      [name]: file,
    }));
 }
  useEffect(() => {
    const fetchCommunity = async () => {
      const response = await api.get(`/message/all`);
      console.log("response of all communities", response);
      setCommunity(response.data.communities);
    };
    fetchCommunity();
  }, []);

  const handleCommunitySelect = (community) => {
    setSelectedCommunity(community);
  };
  const handleImageTocloud = async (image:File) => {
    console.log("imageeee",image);
    
      
        const response = await api.get("/user/generate-signed-url", {
          params: { fileType: image?.image.type },
        });

        const { api_key, timestamp, signature, folder, cloudName } =
          response.data;

        console.log("Uploading image:", image.image);

        const formData = new FormData();
        formData.append("file", image.image);
        formData.append("api_key", api_key);
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature);
        formData.append("folder", folder);

        const uploadResponse = await fetch(
         ` https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await uploadResponse.json();
console.log("object",data.secure_url)

        if (!data.secure_url) {
          throw new Error("Upload failed");
        }
        await setInput((priv)=>({
          ...priv,
          profile : data.secure_url
        }))
        
        return postrdata({profile:data.secure_url})
     
    }
    const postrdata = async ({profile})=>{
  console.log("inputs inside postdata",input);
console.log("profile",profile.profile)
      const responseofCreation =await api.post(`/message/create`,{name:input.name,description:input.description,profile})
console.log("responseofCreation",responseofCreation);
    }
  const handleSubmit=(e)=>{
e.preventDefault()
handleImageTocloud(image)

  }
  console.log("image",image);
  console.log("inputs",input);
  const handleJoin=async(communityID)=>{
    const response=await api.patch(`/message/join/${communityID}`)
console.log("response of joining",response);
toast.success(response.data.message)

setCommunity((prevCommunity) =>
  prevCommunity.map((item) =>
    item._id === communityID
      ? { ...item, members: [...item.members, activeuser._id] }
      : item
  )
);
   
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-1/4 bg-white border-r p-4 overflow-y-auto hidden md:block">
        <div className="flex  justify-between">
          <h2 className="text-xl font-semibold">
            Messages <span className="text-gray-500">(22)</span>
          </h2>
          <div className="relative inline-block">
            <div
              className="cursor-pointer p-2 rounded-full hover:bg-gray-200"
              onClick={() => setIsmenuOpen(!ismenuOpen)}
            >
              <FaEllipsisV className="text-primary text-xl" />
            </div>

            {ismenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <div className="py-2 text-sm text-gray-700">
                  <button
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setIsModal(true);
                      // setIsmenuOpen(false);
                    }}
                  >
                    New Community
                  </button>
                  {isModal && (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                      onClick={(e) => {
                        if (e.target === e.currentTarget) setIsModal(false);
                      }}
                    >
                      <div className="bg-white w-full max-w-lg mx-4 p-6 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-center">
                          Create New Community
                        </h2>

                        <form onSubmit={handleSubmit}>
                          <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                              type="text"
                              name="name"
                              value={input.name}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Community Name"
                              onChange={handleInputCange}
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Description
                            </label>
                            <textarea
                            name="description"
                            value={input.description}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Community Description"
                              onChange={handleInputCange}
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Profile Image
                            </label>
                            <input
                            name="image"
                              type="file"
                              onChange={handleImageChange}
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>

                          <div className="flex justify-end space-x-4">
                            <button
                              type="button"
                              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                              onClick={() => setIsModal(false)}
                            >
                              Cancel
                            </button>

                            <button
                              type="submit"
                              className="px-4 py-2 bg-primary text-white rounded-lg "
                            >
                              Create
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  <button
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsmenuOpen(false)}
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 pl-10 border rounded-md focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="space-y-4">
          {community.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm"
            >
              <div
                className="flex items-center space-x-3"
                onClick={() => handleCommunitySelect(item)}
              >
                <div className="relative">
                  <img
                    src={item.profile}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">{item.name}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col" key={selectedCommunity?._id}>
    {selectedCommunity ? (
      <>
        <header className="flex items-center justify-between bg-white p-4 border-b">
          <div className="flex items-center">
            <img
              src={selectedCommunity.profile}
              className="w-10 h-10 rounded-full"
              alt="Group"
            />
            <div className="ml-3">
              <h2 className="font-medium">{selectedCommunity.name}</h2>
              <span className="text-sm text-gray-500">
                {selectedCommunity.members.length} Members
              </span>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-center px-4 py-8">
            <div className="border border-primary rounded-lg shadow-lg max-w-md w-full bg-white p-6">
              <div className="text-center">
                <h1 className="text-black font-bold text-2xl mb-2">
                  Join Our Community
                </h1>
                <p className="text-gray-600 mb-4">
                  Connect with job seekers and employers, expand your network, and unlock new opportunities.
                  Share experiences and get the support you need to land your dream job.
                </p>
                {!selectedCommunity.members.includes(activeuser._id) ? (
                  <button
                    onClick={() => handleJoin(selectedCommunity._id)}
                    className="text-white bg-primary hover:bg-primary-dark transition-colors duration-300 font-semibold rounded-md py-2 px-4 w-full"
                  >
                    Join Now
                  </button>
                ) : (
                  <button
                    className="text-white bg-gray-400 cursor-not-allowed transition-colors duration-300 font-semibold rounded-md py-2 px-4 w-full"
                    disabled
                  >
                    Joined
                  </button>


                )}
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <div className="flex-1 flex items-center justify-center text-gray-600">
        Select a community to start chatting!
      </div>
    )}

    <footer className="p-4 bg-white border-t flex">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-l-md focus:outline-none"
          />
          <button className=" text-primary px-4 py-2 rounded-r-md">
            <HiPaperClip />
          </button>

          <button className="bg-primary text-white px-4 py-2 rounded-r-md">
            <LuSend />
          </button>
        </footer>
  </main>
    </div>
  );
}
