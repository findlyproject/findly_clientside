import Image from 'next/image'
import React from 'react'
import { MdAddIcCall } from "react-icons/md";
import { FaPencilAlt } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { Spinner } from "@material-tailwind/react";
import { FaCloudUploadAlt } from "react-icons/fa";

const HeaderProfile: React.FC = ({ handlebannerUpload,loading,handleUpload,activecompany,selectedFile,handleFileChange,bannerPreview,handleBannerChange,selectedBanner,preview}) => {
  return (

    <div>
  <div className="flex flex-col items-start">
    <div className="relative  w-full h-48 bg-gray-300 flex items-center justify-center">
      <div 
        onClick={(e) => {
            console.log("helllo");
            e.stopPropagation()
            if (selectedBanner !== null) {
              document.getElementById("bannerUpload")?.click();
            }
          }}
      >
      <Image
        src={bannerPreview}
        alt="Banner"
        layout="fill"
        objectFit="cover"
        className="absolute"
      />

      <input
        type="file"
        accept="image/*"
        id="bannerUpload"
        className="hidden"
        onChange={handleBannerChange}
      />
      {selectedBanner ? (

        
        <span >
        <FaCloudUploadAlt 
         onClick={(e) => {
            e.stopPropagation(); 
            handlebannerUpload();
          }}
          className="absolute  top-1 right-2  flex items-center justify-center bg-white  rounded-full text-black p-1 border border-black text-3xl cursor-pointer"
        />
       {loading&&<Spinner/>}
      </span>
      ) : (
        <label
          htmlFor="bannerUpload"
          className="absolute top-1 right-2 border border-black bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition"
        >
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
</svg>
        </label>
      )}
      </div>

      {/* Profile Logo Positioned at Left-Bottom of Banner */}
     <div >
     <div
     onClick={() => {
        if (selectedFile !== null) {
          document.getElementById("logoUpload")?.click();
        }
      }}
     className="absolute  bottom-[-40px] left-6 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
        <Image
          src={preview}
          alt="Profile"
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />

        <input
          type="file"
          accept="image/*"
          id="logoUpload"
          className="hidden"
          onChange={handleFileChange}
        />
  </div>
        {selectedFile !== null ? (
        
  
            <span >
  <FaCloudUploadAlt 
    onClick={handleUpload} 
    className="absolute inset-0 left-24  top-48 right-0 flex items-center justify-center bg-white  rounded-full text-black p-1 border border-black text-3xl cursor-pointer"
  />
 {loading&&<Spinner/>}
</span>
    ) : (
          <label
            htmlFor="logoUpload"
            className="absolute top-48 left-20 z-5 border border-black  bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-300 transition"
          >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
  <path strokeLinecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
</svg>

          </label>
        )}
     </div>
    
    </div>
  <div className='flex flex-col items-end justify-start   w-full'>
  <div className=''>
  <h2 className="mt-10 font-semibold italic">{activecompany?.name}</h2>
    <p className="text-black flex items-center space-x-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>


      <span className='italic'>{activecompany?.email}</span>
    </p>

    <p className="flex items-center space-x-2">
      <MdAddIcCall className="text-xl" />
      <span className='italic'>{activecompany?.contact}</span>
    </p>
  </div>
  </div>
  </div>
</div>

  )
}

export default HeaderProfile
