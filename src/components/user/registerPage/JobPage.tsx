'use client'

import React, {  useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setjobLocations, setjobTitles } from "@/lib/store/features/registerSlice";
import { registerUser } from "@/lib/store/features/actions/userActions";
import { toast } from "react-toastify";
import { JobLocationType } from "@/lib/store/features/registerSlice";
import { Country, State, City } from "country-state-city";
import api from "@/utils/api";
import { TitleType } from "@/lib/store/features/adminSlice";
export default function JobPage() {
  const formData=useAppSelector((state)=>state.register)
  console.log("formData",formData);
  
  const dispatch=useAppDispatch()
  const [JobTitles, setJobTitles] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
const[Titles,setTitles]=useState<TitleType[]>([])
  useEffect(()=>{
    const fetchTitles=async()=>{
      const res=await api.get(`/admin/alltitle`)
      setTitles(res.data.titles)
    }
    fetchTitles()
  },[])

  console.log("Titles",Titles);
  
  const [JobLocations, setJobLocations] = useState<JobLocationType[]>([]);
  
  
  
  const [newLocation, setNewLocation] = useState({
          country: "",
          countryName: "",
          state: "",
          stateName: "",
          city: ""
      });

      const countries = Country.getAllCountries();
      const states = newLocation.country ? State.getStatesOfCountry(newLocation.country) : [];
      const cities = newLocation.state ? City.getCitiesOfState(newLocation.country, newLocation.state) : [];

      const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
              const { name, value } = e.target;
          
              if (name === "country") {
                const selectedCountry = countries.find((c) => c.isoCode === value);
                setNewLocation({
                  country: selectedCountry?.isoCode || "",
                  countryName: selectedCountry?.name || "",
                  state: "",
                  stateName: "",
                  city: "",
                });
              } else if (name === "state") {
                const selectedState = states.find((s) => s.isoCode === value);
                setNewLocation({
                  ...newLocation,
                  state: selectedState?.isoCode || "",
                  stateName: selectedState?.name || "",
                  city: "",
                });
              } else if (name === "city") {
                setNewLocation({ ...newLocation, city: value });
              }
            };
            
  const[titlesError,settitlesError]=useState("")
  const[joblocationError,setjoblocationError]=useState("")
  
    const router = useRouter();
     

     
      

      
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


      
const handleKeyDown =async (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter" && inputValue.trim()) {
    e.preventDefault();
    setJobTitles([...JobTitles, inputValue.trim()]);
    const response=await api.post(`/admin/titlebyuser`,{name:inputValue})
    setInputValue("");
  }
};


const addTitle = (selectedTitle: string) => {
  if (!JobTitles.includes(selectedTitle)) {
    setJobTitles([...JobTitles, selectedTitle]);
    // setTitlesError(""); // Clear error if a title is selected
  }
};

// Remove a selected job title
// const removeTitle = (index: number) => {
//   setJobTitles(JobTitles.filter((_, i) => i !== index));
// };
const removeTitle = (index: number) => {
  setJobTitles(JobTitles.filter((_, i) => i !== index));
};

const handleAddLocation = () => {
  if (newLocation.country && newLocation.state && newLocation.city) {
      const updatedLocations = [...JobLocations, newLocation]; 
      setJobLocations(updatedLocations); 
      dispatch(setjobLocations(updatedLocations));
      dispatch(setjobTitles(JobTitles));
      setNewLocation({ country: "", countryName: "", state: "", stateName: "", city: "" });
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
        placeholder="Ex. Sales Manager"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown} // Capture "Enter" key
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full"
      />
      
<br/>
     
       {/* Select dropdown for job titles */}
       <select
        onChange={(e) => addTitle(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full"
      >
        <option value="">Select a Job Title</option>
        {Titles.map((title) => (
          <option key={title._id} value={title.name}>
            {title.name}
          </option>
        ))}
      </select>

      

      {/* Display entered job titles */}
      <div className="flex flex-wrap gap-2 mt-2">
        {JobTitles.map((title, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
          >
            {title}
            <button
              onClick={() => removeTitle(index)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
            {titlesError && (
              <span className="text-red-500">{titlesError}</span>
            )}
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-gray-700 font-medium mb-1">
              Job Locations
            </label>
           {/* Country Dropdown */}
           <select
                    name="country"
                    className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={newLocation.country}
                    onChange={handleChange}
                >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                    ))}
                </select>

                {/* State Dropdown */}
                <select
                    name="state"
                    className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={newLocation.state}
                    onChange={handleChange}
                    disabled={!newLocation.country}
                >
                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                    ))}
                </select>

                {/* City Dropdown */}
                <select
                    name="city"
                    className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={newLocation.city}
                    onChange={handleChange}
                    disabled={!newLocation.state}
                >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city.name} value={city.name}>{city.name}</option>
                    ))}
                </select>
                <button
                    onClick={handleAddLocation}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-3"
                    disabled={!newLocation.country || !newLocation.state || !newLocation.city}
                >
                    Add Location
                </button>
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
