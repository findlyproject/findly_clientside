import api from '@/utils/api';
import { Modal } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaEllipsisV, FaSearch } from 'react-icons/fa';

interface Community {
  _id: string;
  name: string;
  description: string;
  profile: string;
  members: string[];
}

const Sidebar: React.FC = ({props}) => {
    console.log("props",props);
    
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [community, setCommunity] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);

  const [input, setInput] = useState({
    name: '',
    description: '',
    profile: '',
  });

  const [image, setImage] = useState<File | null>(null);
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
        console.log("searchResults",searchQuery,searchResults)






  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const getcommunity =async ()=>{
    const response = await api.get("/message/all")
    console.log("respons all comunity",response)
    setCommunity(response.data.communities)
}


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const postData = async (profile: string) => {
    console.log('Submitting Data:', input);
    try {
      const response = await api.post(`/message/create`, {
        name: input.name,
        description: input.description,
        profile,
      });
      setIsModal(!isModal)
      setIsMenuOpen(!isMenuOpen)
      getcommunity()
      console.log('Response:', response);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleImageToCloud = async () => {
    if (!image) return;

    try {
      const response = await api.get('/user/generate-signed-url', {
        params: { fileType: image.type },
      });

      const { api_key, timestamp, signature, folder, cloudName } = response.data;

      console.log('Uploading Image:', image);

      const formData = new FormData();
      formData.append('file', image);
      formData.append('api_key', api_key);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);
      formData.append('folder', folder);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await uploadResponse.json();

      if (!data.secure_url) {
        throw new Error('Upload failed');
      }

      setInput((prev) => ({
        ...prev,
        profile: data.secure_url,
      }));

      postData(data.secure_url);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };






  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleImageToCloud();
  };


useEffect(()=>{
getcommunity()

},[props.community])



  return (
    <aside className="w-1/4 bg-white border-r p-4 overflow-y-auto hidden md:block">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">
          Messages 
        </h2>
        <div className="relative inline-block">
          <div className="cursor-pointer p-2 rounded-full hover:bg-gray-200" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaEllipsisV className="text-primary text-xl" />
          </div>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
              <div className="py-2 text-sm text-gray-700">
                <button className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>setIsModal(!isModal)}>
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
                      <h2 className="text-2xl font-bold mb-4 text-center">Create New Community</h2>

                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-gray-700">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={input.name}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Community Name"
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-gray-700">Description</label>
                          <textarea
                            name="description"
                            value={input.description}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Community Description"
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-gray-700">Profile Image</label>
                          <input type="file" onChange={handleImageChange} className="w-full px-3 py-2 border rounded-lg" />
                        </div>

                        <div className="flex justify-end space-x-4">
                          <button type="button" className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400" onClick={() => setIsModal(false)}>
                            Cancel
                          </button>

                          <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">
                            Create
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                <button className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setIsMenuOpen(false)}>
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

                        onClick={()=>props.setCommunity(community)}
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
        {community.map((item) => (
          <div key={item._id} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => props.setCommunity(item)}>
              <Image width={40} height={40} src={item.profile} alt="Community" className="w-10 h-10 rounded-full" />

              <div>
                <h2 className="text-sm font-semibold">{item.name}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
