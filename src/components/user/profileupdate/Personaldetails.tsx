import React, { useState } from "react";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setImages,
  setPersonalDetails,
  UserProfile,
} from "@/lib/store/features/userSlice";
import api from "@/utils/api";
import { toast } from "react-toastify";

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
}
function Personaldetails({loading}) {
    console.log("props =",loading);
    
  const user = useAppSelector((state) => state.user.activeuser as UserProfile);
  console.log("activuser", user);

  const [input, setInput] = useState<input>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    dateOfBirth: user.dateOfBirth,
    about: user.about,
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
          <FaRegEdit className="absolute top-5 right-5 text-white bg-gray-800 p-2 rounded-full cursor-pointer text-4xl" />
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
            <FaRegEdit className="absolute top-20 left-24 text-white bg-gray-800 p-2 rounded-full cursor-pointer text-3xl" />
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
