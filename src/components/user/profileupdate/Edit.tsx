"use client";
import React, { useEffect } from "react";
import Personaldetails from "./Personaldetails";
import Skills from "./Skills";
import Education from "./Education";
import Project from "./Project";
import Joblocation from "./Joblocation";
import Location from "./Location";
import Jobtitle from "./Jobtitle";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  showSkills,
  showSTitles,
} from "@/lib/store/features/actions/adminActions";
import Experience from "./Experience";
import { setprofessionalUserData } from "@/lib/store/features/userSlice";
import { updateOtherDetails } from "@/lib/store/features/actions/userActions";

function Edit() {
  const route = useRouter();
  const dispatch = useAppDispatch();

  const activeuser = useAppSelector((state) => state.user.activeuser);
  const { professionalData } = useAppSelector((state) => state.user);

  const handleSubmit = () => {
    console.log("professionalData", professionalData);
    dispatch(updateOtherDetails({ otherDetails: professionalData }));
    toast.success("Personal details saved successfully!");
  };
  useEffect(() => {
    dispatch(showSkills());
    dispatch(showSTitles());

    if (activeuser) {
      const professionalData = {
        location: activeuser.location,
        skills: activeuser.skills,
        jobTitle: activeuser.jobTitle,
        jobLocation: activeuser.jobLocation,
        education: activeuser.education,
        experience: activeuser.experience,
        projects: activeuser.projects,
      };
      dispatch(setprofessionalUserData(professionalData));
    }
  }, []); 

  return (
    <div className="w-full h-auto flex justify-center py-4 pt-24">
      <div className="w-5/6 border rounded-2xl shadow-2xl p-6 relative">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <Personaldetails />
        <div className="p-6 bg-gray-100 rounded-lg shadow-xl space-y-10 mt-4 w-full">
          <h2 className="text-xl font-semibold">Professional Details</h2>
          <div className="lg:flex lg:gap-20 px-4 md:px-10 lg:px-20">
            <Skills />
            <Jobtitle />
          </div>
          <Education />
          <Project />
          <Experience />
          <Joblocation />
          <Location />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => route.push("/user/profile")}
            className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
          >
            cancel
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
