"use client";
import { useState} from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { HiPaperClip } from "react-icons/hi";
import { LuSend } from "react-icons/lu";
import { useAppSelector } from "@/lib/store/hooks";


import api, { socket } from "@/utils/api";
import SelectInput from "@mui/material/Select/SelectInput";

export default function ChatUI() {
  const [community,setCommunity] = useState(null)
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
const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (searchQuery.length > 0) {
      const fetchCommunity= async () => {
        try {
          const response = await api.get(
            `/message/search?query=${searchQuery}`
          );

          setSearchResults(response.data.community);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      fetchCommunity();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchQuery(e.target.value);
        };
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

console.log("search query",searchQuery);
console.log("searchResults",searchResults);




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

  const [input,setInput] = useState("")
  const [message,setMessage] = useState([])
  console.log("community",input);
  console.log("message",message);


  const handilpush = ()=>{
    setMessage((prev) => [...prev, input]);
  }
  //// join to community 

  const handleJoin = (id:string)=>{
    try {
      const response = api.patch(`/message/join/${id}`)
    console.log("response join",response)
    socket.on("communtjoin",(data)=>{
      console.log("join comunity",data);
      setCommunity(data)
     })
    } catch (error) {
      console.log("join error",error);

    }

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
            onChange={handleSearchChange}
            className="w-full p-2 pl-10 border rounded-md focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          {searchQuery && searchResults.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full max-h-60 overflow-y-auto border  border-gray-300 bg-white p-4 rounded-lg shadow-md z-50 ">
                  <ul className="mt-2 space-y-2 ">
                    {searchResults.map((community) => (
                      <li key={community._id} className="cursor-pointer flex items-center gap-2 pl-4 hover:bg-primary hover:bg-opacity-20 rounded-full"

                        onClick={()=>handleCommunitySelect(community)}
                      >
                        <Image
                          width={100}
                          height={100}
                          src={community.profile || "/default-profile.png"}
                          alt={`${community.name}`}
                          className="w-7 h-7 rounded-full"
                        />
                        <div>
                          <p className="tex-sm font-semibold">
                             {community.name}
                          </p>
                          
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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

      <Sidebar props={{setCommunity,community}}/>


      <main className="flex-1 flex flex-col" key={community?._id}>
    {community ? (
      <>
        <header className="flex items-center justify-between bg-white p-4 border-b">

          <div className="flex items-center"
          onClick={()=>router.push(`/community/details/${selectedCommunity._id}`)}>
            <img
              src={selectedCommunity.profile}

          <div className="flex items-center">
            <Image
            width={100}
            height={100}
              src={community.profile}

              className="w-10 h-10 rounded-full"
              alt="Group"
            />
            <div className="ml-3">
              <h2 className="font-medium">{community.name}</h2>
              <span className="text-sm text-gray-500">
                {community.members.length} Members
              </span>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4">
         
          <div className="flex justify-center px-4 py-8">
            {!community.members.includes(activeuser._id) ? (
              <div className="border border-primary rounded-lg shadow-lg max-w-md w-full bg-white p-6">
              <div className="text-center">
                <h1 className="text-black font-bold text-2xl mb-2">
                  Join Our Community
                </h1>
                <p className="text-gray-600 mb-4">
                  Connect with job seekers and employers, expand your network, and unlock new opportunities.
                  Share experiences and get the support you need to land your dream job.
                </p>
              </div>
            </div>
            ):(
              <div>
          {message.map((item)=>(
            <div>{item}</div>
          ))}
          </div>
            )}
          </div>
        </div>
        <footer className="p-4 h-20 bg-white border-t flex">
          {community?.members.includes(activeuser._id) ?(
            <>
              <input
            type="text"
            placeholder="Type a message..."
            onChange={(e)=>setInput(e.target.value)}
            className="flex-1 p-2 border rounded-l-md focus:outline-none"
          />
          <button className=" text-primary px-4 py-2 rounded-r-md">
            <HiPaperClip />
          </button>

          <button className="bg-primary text-white px-4 py-2 rounded-r-md"
          onClick={handilpush}
          >
            <LuSend />
          </button>
            </>
          ):(
            <button
                    onClick={() => handleJoin(community._id)}
                    className="text-white bg-primary hover:bg-primary-dark transition-colors duration-300 font-semibold rounded-md py-2 px-4 w-full"
                  >
                    Join Now
                  </button>
          )}
        </footer>
      </>
    ) : (
      <div className="flex-1 flex items-center justify-center text-gray-600">
      Select a community to start chatting!
    </div>
    )}
  </main>
    </div>
  );
}
function push(input: string): import("react").SetStateAction<never[]> {
  throw new Error("Function not implemented.");
}

