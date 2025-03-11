import React, { useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setImages,
  setPersonalDetails,
  
} from "@/lib/store/features/userSlice";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { User } from "@/types/Types";
interface PersonaldetailsProps {
    loading: (isLoading: boolean) => void;
  }
interface ImageType {
    profileImage: string | File | undefined;
    banner: string | File | undefined;
}

interface input {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined | number;
    dateOfBirth: Date | undefined |number ;
    about: string | undefined;
    gender:string |undefined
}


function Personaldetails({ loading }: PersonaldetailsProps) {
    
  const user = useAppSelector((state) => state.user.activeuser as User);

  const [input, setInput] = useState<input>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    dateOfBirth: user.dateOfBirth,
    about: user.about,
    gender:user.gender
  });

  const [image, setImage] = useState<ImageType>({
    profileImage: user.profileImage,
    banner: user.banner,
  });
  const dispatch = useAppDispatch();

  const handilchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handilImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files ? e.target.files[0] : null;
    setImage((priv) => ({
      ...priv,
      [name]: file,
    }));
  };

  const handleImageeChange = async () => {
    try {
        loading(true);
      if (!image.profileImage || !image.banner) {
        console.error("Both profile and banner images must be selected");
        return;
      }

      const uploadImage = async (image: File) => {
        const response = await api.get("/user/generate-signed-url", {
          params: { fileType: image.type },
        });

        const { api_key, timestamp, signature, folder, cloudName } =
          response.data;

        console.log("Uploading image:", image);

        const formData = new FormData();
        formData.append("file", image);
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
        if (!data.secure_url) {
          throw new Error("Upload failed");
        }

        return data.secure_url;
      };

      const [profileImageUrl, banner] = await Promise.all([
        uploadImage(image.profileImage as File),
        uploadImage(image.banner as File),
      ]);

      console.log("Profile Image URL:", profileImageUrl);
      console.log("Banner Image URL:", banner);

      await dispatch(setPersonalDetails(input));
      await dispatch(
        setImages({ profileImage: profileImageUrl, banner: banner })
      );
      toast.success("Images uploaded successfully");
    } catch (error) {
        toast.warning("Select both profile and banner images");
      console.error("Error uploading images:", error);
    } finally {
        loading(false);
    }
  };

  const handilsubmit = () => {
    handleImageeChange();
  };
  return (
    <div>
      <div className="py-2 relative">
        <Image
          src={
            image?.banner
              ? typeof image?.banner === "string"
                ? image?.banner
                : URL.createObjectURL(image?.banner)
              : "/assets/loginbanner.jpg"
          }
          alt="banner image"
          width={500}
          height={50}
          className="w-full h-44 object-cover rounded-lg"
        />

        <input
          type="file"
          accept="image/*"
          name="banner"
          className="hidden"
          id="bannerUpload"
          onChange={handilImage}
        />
        <button onClick={() => document.getElementById("bannerUpload")?.click()}>
          <div className="absolute top-5 right-5 text-back bg-gray-100 p-1 rounded-full cursor-pointer text-4xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
</svg></div>
        </button>

        <div className="absolute top-24 left-5 flex flex-col items-center">
          <Image
            src={
              image?.profileImage
                ? typeof image?.profileImage === "string"
                  ? image?.profileImage
                  : URL.createObjectURL(image?.profileImage)
                : "/assets/profile.png"
            }
            alt="profile image"
            width={100}
            height={100}
            className="w-32 h-32 rounded-full shadow-xl border border-gray-300 object-cover"
          />

          <input
            type="file"
            accept="image/*"
            name="profileImage"
            className="hidden"
            id="profileUpload"
            onChange={handilImage}
          />
          <button
            onClick={() => document.getElementById("profileUpload")?.click()}
          >
            
            <div className="absolute top-24 left-24 text-black bg-gray-100 p-1 rounded-full cursor-pointer text-3xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
</svg></div>

          </button>
        </div>
      </div>

      <div className="p-6 bg-gray-100 rounded-lg shadow-lg mt-4 w-full">
        <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="grid gap-3">
            <label>FirstName</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={input.firstName}
              onChange={handilchange}
              className="p-2 border rounded-md"
            />
          </div>
          <div className="grid gap-3">
            <label>LastName</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={input.lastName}
              onChange={handilchange}
              className="p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="grid gap-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={input.email}
              onChange={handilchange}
              className="p-2 border rounded-md"
            />
          </div>
          <div className="grid gap-3">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={input.phoneNumber}
              onChange={handilchange}
              className="p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="grid gap-3">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={input.dateOfBirth ? new Date(input.dateOfBirth).toISOString().split('T')[0] : ''}
              onChange={handilchange}
              className="p-2 border rounded-md"
            />
          </div>
          <div className="grid gap-3">
            <label>Gender</label>
            <select
              type="name"
              name="gender"
              value={input.gender}
              onChange={handilchange}
              className="p-2 border rounded-md"
            >
              <option>Choose your Gender</option> 
              <option name="male">Male</option> 
              <option name="female">Female</option> 
              <option name="other">Other</option> 

              </select>         </div>
        </div>
        <div className="grid gap-3">
          <label>About</label>
          <input
            name="about"
            placeholder="About Yourself"
            value={input.about}
            onChange={handilchange}
            className="mt-4 w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="p-2 bg-green-500 rounded-lg text-xl mt-3 "
            onClick={handilsubmit}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Personaldetails;