'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setjobLocations, setjobTitles } from "@/lib/store/features/registerSlice";
import { registerUser } from "@/lib/store/features/actions/userActions";
import { toast } from "react-toastify";
export default function JobPage() {
  const formData=useAppSelector((state)=>state.register)
  console.log("formData",formData);
  
  const dispatch=useAppDispatch()
  const [JobTitles, setJobTitles] = useState<string[]>([]);
  const [JobLocations, setJobLocations] = useState<string[]>([]);
  const[titlesError,settitlesError]=useState("")
  const[joblocationError,setjoblocationError]=useState("")
  console.log("titlesError",titlesError);
  
    const router = useRouter();
     

      useEffect(() => {
        dispatch(setjobLocations(JobLocations));
        dispatch(setjobTitles(JobTitles));
      }, [dispatch, JobTitles, JobLocations]); 
      

const validateForm=()=>{
  let isValid=true
  if(JobTitles.length===0){
    settitlesError('jobtitle is required')
    isValid=false
  }


  if(JobLocations.length===0){
    setjoblocationError("job location is required")
    isValid=false
  }
  return isValid
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (validateForm()) {
    const resultAction = await dispatch(
      registerUser({
        ...formData,
        jobTitle: JobTitles,
        jobLocation: JobLocations,
      })
    );
console.log("resultAction",resultAction);

    if (registerUser.fulfilled.match(resultAction)) {
      router.push("/home");
      toast.success("Registration Successful!");
    }
  }
};


      
      

  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <div className="w-full max-w-3xl  p-6 ">
        <h1 className="text-gray-800 font-semibold text-2xl text-center">
        What kind  of job are looking for?
        </h1>
        <p className="text-gray-800   text-center">you can select 5 titles and locations.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 flex flex-col items-center">
          <div className="flex flex-col w-1/2">
            <label className="text-gray-700 font-medium mb-1">Job Title</label>
            <input
              type="text"
              placeholder="Ex.Sales Manager"
              value={JobTitles}
              onFocus={()=>settitlesError("")}
              onChange={(e)=>setJobTitles(e.target.value.split(","))}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {titlesError && (
              <span className="text-red-500">{titlesError}</span>
            )}
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-gray-700 font-medium mb-1">
              Job Locations
            </label>
            <input
              type="text"
              placeholder="Location"
              value={JobLocations}
              onFocus={()=>setjoblocationError("")}
              onChange={(e)=>setJobLocations(e.target.value.split(","))}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {joblocationError && (
              <span className="text-red-500">{joblocationError}</span>
            )}
          </div>

          <div className="w-full flex justify-center">
            <button
            type="submit"
              className="w-1/2 py-2 bg-primary text-white font-semibold rounded-full hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
             
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
