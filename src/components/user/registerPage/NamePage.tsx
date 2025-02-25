"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setfirstName, setlastName,setGender } from "@/lib/store/features/registerSlice";
export default function NamePage() {
  const dispatch = useAppDispatch();
  const [gender, setgender] = useState("");

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setgender(event.target.value);
  };
  const [Firstname, setLocalfirstname] = useState("");

  const [Lastname, setLocallastname] = useState("");
  const data = useAppSelector((state) => state.register);
  console.log("data", data);
  const [firstnameerror, setfirstnameError] = useState("");
  const [lastnameerror, setlastnameError] = useState("");
  const router = useRouter();

  const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setfirstnameError("");
    setlastnameError("");
    let isValid = true;
    if (!Firstname) {
      setfirstnameError("Firstname is required");
      isValid = false;
    }

    if (!Lastname) {
      setlastnameError("Lastname is required");
      isValid = false;
    }

    if (isValid) {
      dispatch(setGender(gender))
      dispatch(setfirstName(Firstname));
      dispatch(setlastName(Lastname));
      
      router.push(`/user/register/namepage/educationpage`);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <div className="w-full max-w-3xl  p-6 ">
        <h1 className="text-gray-800 font-semibold text-2xl text-center">
          Your profile enables you to connect with new people and uncover
          opportunities
        </h1>

        <form className="mt-6 space-y-4 flex flex-col items-center">
        <div className="flex flex-col w-1/2">
      <label className="text-gray-700 font-medium mb-1">Gender</label>
      <div className="flex gap-x-4">
        <input 
          type="radio" 
          name="gender" 
          value="Male" 
          id="male" 
          onChange={handleChange}
          checked={gender === "Male"}
        />
        <label htmlFor="male">Male</label>

        <input 
          type="radio" 
          name="gender" 
          value="Female" 
          id="female" 
          onChange={handleChange}
          checked={gender === "Female"}
        />
        <label htmlFor="female">Female</label>

        <input 
          type="radio" 
          name="gender" 
          value="Other" 
          id="other" 
          onChange={handleChange}
          checked={gender === "Other"}
        />
        <label htmlFor="other">Other</label>
      </div>

      
      <p className="mt-2 text-gray-600">Selected Gender: {gender}</p>
    </div>

          <div className="flex flex-col w-1/2">
            <label className="text-gray-700 font-medium mb-1">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={Firstname}
              onFocus={() => setfirstnameError("")}
              onChange={(e) => setLocalfirstname(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {firstnameerror && (
              <span className="text-red-500">{firstnameerror}</span>
            )}
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-gray-700 font-medium mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={Lastname}
              onFocus={() => setlastnameError("")}
              onChange={(e) => setLocallastname(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {lastnameerror && (
              <span className="text-red-500">{lastnameerror}</span>
            )}
          </div>

          <div className="w-full flex justify-center">
            <button
              className="w-1/2 py-2 bg-primary text-white font-semibold rounded-full hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
