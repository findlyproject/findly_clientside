"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const EditProfile = () => {
  const [user, setUser] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    location: "",
    gender: "Male",
    profileImage: "",
    banner: "",
    about: "",
    skills: [],
    jobTitle: [],
    jobLocation: [],
    education: {
      qualification: "",
      startYear: "",
      endYear: "",
      collage: "",
    },
    projects: [{ title: "", description: "", link: "" }],
    role: "user",
    subscriptionStartDate: "",
    subscriptionEndDate: "",
    resume: [{ fileUrl: "", type: "PDF" }],
    coverLetter: "",
    connecting: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, [name]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${user._id}`, user);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await axios.get("/api/users/profile");
      setUser(userData.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Edit Profile</h1>

      {/* Profile & Banner */}
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile & Banner Image</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <label className="block text-gray-600">Profile Image</label>
            <Image src="/assets/profile.png" alt="user logo" className="w-24 h-24 rounded-full mx-auto object-cover" width={100} height={100} />
            <input type="file" name="profileImage" onChange={handleImageChange} className="mt-2" />
          </div>
          <div className="text-center">
            <label className="block text-gray-600">Banner Image</label>
            <Image src="/assets/register-1.jpg" alt="user logo" width={300} height={300} className="w-full h-24 object-cover rounded-md" />
            <input type="file" name="banner" onChange={handleImageChange} className="mt-2" />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="firstName" placeholder="First Name" value={user.firstName} onChange={handleChange} className="p-2 border rounded-md" />
            <input type="text" name="lastName" placeholder="Last Name" value={user.lastName} onChange={handleChange} className="p-2 border rounded-md" />
          </div>
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={user.phoneNumber} onChange={handleChange} className="mt-4 w-full p-2 border rounded-md" />
          <textarea name="about" placeholder="About Yourself" value={user.about} onChange={handleChange} className="mt-4 w-full p-2 border rounded-md"></textarea>
        </div>

        {/* Education Details */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          <input type="text" name="education.qualification" placeholder="Qualification" value={user.education.qualification} onChange={handleChange} className="w-full p-2 border rounded-md" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input type="text" name="education.startYear" placeholder="Start Year" value={user.education.startYear} onChange={handleChange} className="p-2 border rounded-md" />
            <input type="text" name="education.endYear" placeholder="End Year" value={user.education.endYear} onChange={handleChange} className="p-2 border rounded-md" />
          </div>
          <input type="text" name="education.collage" placeholder="College/University" value={user.education.collage} onChange={handleChange} className="mt-4 w-full p-2 border rounded-md" />
        </div>

        {/* Projects */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          {user.projects.map((project: any, index: number) => (
            <div key={index} className="mb-4">
              <input type="text" name="title" placeholder="Project Title" value={project.title} onChange={handleChange} className="w-full p-2 border rounded-md" />
              <textarea name="description" placeholder="Project Description" value={project.description} onChange={handleChange} className="mt-2 w-full p-2 border rounded-md"></textarea>
              <input type="text" name="link" placeholder="Project Link" value={project.link} onChange={handleChange} className="mt-2 w-full p-2 border rounded-md" />
            </div>
          ))}
        </div>

        {/* Resume Upload */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Resume Upload</h2>
          <input type="file" name="resume" onChange={handleImageChange} className="mt-2" />
        </div>

        {/* Cover Letter */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Cover Letter</h2>
          <textarea name="coverLetter" placeholder="Write your cover letter" value={user.coverLetter} onChange={handleChange} className="w-full p-2 border rounded-md"></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md text-lg">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
