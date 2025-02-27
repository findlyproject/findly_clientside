// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAppDispatch } from "@/lib/store/hooks";
// import { Country, State, City } from "country-state-city";
// import {
//   setEducation,
//   setLocation
 
// } from "@/lib/store/features/registerSlice";

// export default function EducationPage() {
//   const dispatch = useAppDispatch();
//   const [Location, setLocallocation] = useState("");
//   const [College, setLocalcollege] = useState("");
//   const [StartYear, setStartYear] = useState("");
//   const [EndYear, setEndYear] = useState("");

  
//   const [locationError, setlocationError] = useState("");
//   const [collegeError, setcollegeError] = useState("");
//   const [startError, setstartError] = useState("");
//   const [endError, setendError] = useState("");
  
//   console.log("StartYear",StartYear,EndYear,College);
  
 
  
//   const router = useRouter();
//   const validateYears = (year: string): boolean => {
//     return /^\d{4}$/.test(year); // Ensures 4-digit year
//   };
//   const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();

//     setlocationError("");
//     setcollegeError("");
//     setstartError("");
//     setendError("");

//     let isValid = true;

//     if (!Location) {
//       setlocationError("Location is required");
//       isValid = false;
//     }

//     if (!College) {
//       setcollegeError("School or College/University is required");
//       isValid = false;
//     }

//     if (!StartYear) {
//       setstartError("Start Year is required");
//       isValid = false;
//     }

//     if (!EndYear) {
//       setendError("End Year is required");
//       isValid = false;
//     }

//     if (isValid) {
      
      
      
//       dispatch(setLocation(Location));

//       dispatch(setEducation([{college:College,startYear:StartYear,endYear:EndYear}]));

//       router.push(`/register/namepage/educationpage/questionpage`);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen  px-4">
//       <div className="w-full max-w-3xl  p-6 ">
//         <h1 className="text-gray-800 font-semibold text-2xl text-center">
//           Your profile enables you to connect with new people and uncover
//           opportunities
//         </h1>

//         <form className="mt-6 space-y-4 flex flex-col items-center ">
//           <div className="flex flex-col w-1/2">
//             <label className="text-gray-700 font-medium mb-1">Location</label>
//             <input
//               type="text"
//               placeholder="Location"
//               value={Location}
//               onFocus={()=>setlocationError("")}
//               onChange={(e) => setLocallocation(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//             {locationError && (
//               <span className="text-red-500">{locationError}</span>
//             )}
//           </div>

//           <div className="flex flex-col w-1/2">
//             <label className="text-gray-700 font-medium mb-1">
//               School or College/University
//             </label>
//             <input
//               type="text"
//               placeholder="School or College/University"
//               value={College}
//               onFocus={()=>setcollegeError("")}
//               onChange={(e) => setLocalcollege(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//             {collegeError && (
//               <span className="text-red-500">{collegeError}</span>
//             )}
//           </div>

//           <div className="flex w-1/2 gap-4">
//             <div className="flex flex-col w-1/2">
//               <label className="text-gray-700 font-medium mb-1">
//                 Start Year
//               </label>
//               <input
//                 type="text"
//                 placeholder=" Start year"
//                 value={StartYear}
//                 onFocus={()=>setstartError("")}
//                 onChange={(e) => setStartYear(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               {startError && <span className="text-red-500">{startError}</span>}
//             </div>

//             <div className="flex flex-col w-1/2">
//               <label className="text-gray-700 font-medium mb-1">End Year</label>
//               <input
//                 type="text"
//                 placeholder="End year"
//                 value={EndYear}
//                 onFocus={()=>setendError("")}
//                 onChange={(e) => setEndYear(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               {endError && <span className="text-red-500">{endError}</span>}
//             </div>
//           </div>

//           <div className="w-full flex justify-center">
//             <button
//               className="w-1/2 py-2 bg-primary text-white font-semibold rounded-full  focus:outline-none focus:ring-2 focus:ring-primary"
//               onClick={handleContinue}
//             >
//               Continue
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { Country, State, City } from "country-state-city";
import {
  setEducation,
  setLocation
 
} from "@/lib/store/features/registerSlice";

export default function EducationPage() {
  const dispatch = useAppDispatch();
  const [Location, setLocallocation] = useState({
    country: "",
    countryName: "",
    state: "",
    stateName: "",
    city: "",
  });


  const countries = Country.getAllCountries();
    const states = Location.country
      ? State.getStatesOfCountry(Location.country)
      : [];
    const cities = Location.state
      ? City.getCitiesOfState(Location.country, Location.state)
      : [];



      console.log("countries",countries);
      console.log("states",states,"cities",cities);
      const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        if (name === "country") {
          const selectedCountry = countries.find((c) => c.isoCode === value);
          setLocallocation({
            country: selectedCountry?.isoCode || "",
            countryName: selectedCountry?.name || "",
            state: "",
            stateName: "",
            city: "",
          });
        } else if (name === "state") {
          const selectedState = states.find((s) => s.isoCode === value);
          setLocallocation({
            ...Location,
            state: selectedState?.isoCode || "",
            stateName: selectedState?.name || "",
            city: "",
          });
        } else if (name === "city") {
          setLocallocation({ ...Location, city: value });
        }
      };
      
  const [College, setLocalcollege] = useState("");
  const [StartYear, setStartYear] = useState("");
  const [EndYear, setEndYear] = useState("");

  
  const [locationError, setlocationError] = useState("");
  const [collegeError, setcollegeError] = useState("");
  const [startError, setstartError] = useState("");
  const [endError, setendError] = useState("");
  
  
  
 
  
  const router = useRouter();
  const validateYears = (year: string): boolean => {
    return /^\d{4}$/.test(year); // Ensures 4-digit year
  };
  const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setlocationError("");
    setcollegeError("");
    setstartError("");
    setendError("");

    let isValid = true;

    if (!Location) {
      setlocationError("Location is required");
      isValid = false;
    }

    if (!College) {
      setcollegeError("School or College/University is required");
      isValid = false;
    }

    if (!StartYear) {
      setstartError("Start Year is required");
      isValid = false;
    }

    if (!EndYear) {
      setendError("End Year is required");
      isValid = false;
    }

    if (isValid) {
      
      
      
     
 if (Location.country && Location.state && Location.city) {
      dispatch(setLocation(Location));
      setLocallocation({
        country: "",
        countryName: "",
        state: "",
        stateName: "",
        city: "",
      });
    }
      dispatch(setEducation([{college:College,startYear:StartYear,endYear:EndYear}]));

      router.push(`/user/register/namepage/educationpage/questionpage`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <div className="w-full max-w-3xl  p-6 ">
        <h1 className="text-gray-800 font-semibold text-2xl text-center">
          Your profile enables you to connect with new people and uncover
          opportunities
        </h1>

        <form className="mt-6 space-y-4 flex flex-col items-center ">
          <div className="flex flex-col w-1/2">
            <label className="text-gray-700 font-medium mb-1">Location</label>

            <select
          name="country"
          className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={Location.country}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>

        {/* State Dropdown */}
        <select
          name="state"
          className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={Location.state}
          onChange={handleChange}
          disabled={!Location.country}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>

        {/* City Dropdown */}
        <select
          name="city"
          className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={Location.city}
          onChange={handleChange}
          disabled={!Location.state}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
            
            {locationError && (
              <span className="text-red-500">{locationError}</span>
            )}
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-gray-700 font-medium mb-1">
              School or College/University
            </label>
            <input
              type="text"
              placeholder="School or College/University"
              value={College}
              onFocus={()=>setcollegeError("")}
              onChange={(e) => setLocalcollege(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {collegeError && (
              <span className="text-red-500">{collegeError}</span>
            )}
          </div>

          <div className="flex w-1/2 gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 font-medium mb-1">
                Start Year
              </label>
              <input
                type="text"
                placeholder=" Start year"
                value={StartYear}
                onFocus={()=>setstartError("")}
                onChange={(e) => setStartYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {startError && <span className="text-red-500">{startError}</span>}
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 font-medium mb-1">End Year</label>
              <input
                type="text"
                placeholder="End year"
                value={EndYear}
                onFocus={()=>setendError("")}
                onChange={(e) => setEndYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {endError && <span className="text-red-500">{endError}</span>}
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              className="w-1/2 py-2 bg-primary text-white font-semibold rounded-full  focus:outline-none focus:ring-2 focus:ring-primary"
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
