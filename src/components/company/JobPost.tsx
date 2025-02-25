"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";

export const JobPost = () => {
  const [requirementInput, setRequirementInput] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);

  const [benefitInput, setBenefitInput] = useState("");
  const [benefits, setBenefits] = useState<string[]>([]);

  const [responsibleInput, setResponsibleInput] = useState("");
  const [responsibles, setResponsibles] = useState<string[]>([]);
  const {register,handleSubmit,formState: { errors },} = useForm();

  const onSubmit = (data) => {
    data.requirements = requirements;
    data.benefits = benefits;
    data.jobResponsibilities = responsibles;


    console.log(data);
  };
  // Generalized function for handling Enter key events
const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  setList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (e.key === "Enter" && inputValue.trim()) {
    e.preventDefault();
    setList((prev) => [...prev, inputValue.trim()]);
    setInputValue(""); // Clear input after adding
  }
};

  return (
    <div className=" mt-48 max-w-screen-2x1 container mx-auto xl">
      {/* form */}
      <div className=" bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
<div className="lg:w-1/2 w-full">
<label className="block mb-2 text-lg">Job Title</label>
<input type="text" placeholder="Ex:Web Developer"
{...register("title")} className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"/>
</div>
<div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Industry Type</label>
              <select
                {...register("industry")}
                className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
              >
                <option value="">Choose your industry</option>
                <option value="Full-time">IT</option>
                <option value="Part-time"></option>
                <option value="Temporary"></option>
              </select>
            </div>
<div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("jobType")}
                className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
              >
                <option value="">Choose your experience</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
</div>
          {/* 2nd row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salary.rate")} className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm">
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                placeholder="$20k"
                {...register("salary.min")}
                className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="text"
                placeholder="$120k"
                {...register("salary.max")}
                className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          {/* 3rd row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience level</label>
              <select {...register("experienceLevel")} className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm">
                <option value="">choose your experience level</option>
                <option value="Hourly">Entry</option>
                <option value="Monthly">Mid</option>
                <option value="Yearly">Senior</option>
                <option value="Yearly">Expert</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                placeholder="Ex: New York"
                {...register("location")}
                className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          {/* 4th row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Application Deadline</label>
              <input
                type="date"
                placeholder="Ex: 2023-10-28"
                {...register("applicationDeadline")}
                className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Qualification</label>
              <input
                type="text"
                placeholder="Ex:Gaduate"
                {...register("qualification")}
                className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          {/* 5th row */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
  {/* Requirements Section */}
  <div className="lg:w-1/2 w-full">
    <label className="block mb-2 text-lg">Requirements</label>
    <input
      type="text"
      value={requirementInput}
      onChange={(e) => setRequirementInput(e.target.value)}
      onKeyDown={(e) => handleKeyDown(e, requirementInput, setRequirementInput, setRequirements)}
      placeholder="Type a requirement and press Enter"
      className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
    />

    <div className={`mt-2 p-3 w-full rounded-md ${requirements.length ? "bg-gray-100" : "bg-transparent"}`}>
      {requirements.length !== 0 && (
        <ul className="list-disc list-inside w-full">
          {requirements.map((req, index) => (
            <li 
              key={index} 
              className="flex justify-between items-center text-gray-800 break-words overflow-hidden"
            >
              <span className="truncate">{req}</span> 
              <button
                onClick={() => setRequirements((prev) => prev.filter((_, i) => i !== index))}
                className="ml-3 px-1 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-900"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>

  {/* Benefits Section */}
  <div className="lg:w-1/2 w-full">
    <label className="block mb-2 text-lg">Benefits</label>
    <input
      type="text"
      value={benefitInput}
      onChange={(e) => setBenefitInput(e.target.value)}
      onKeyDown={(e) => handleKeyDown(e, benefitInput, setBenefitInput, setBenefits)}
      placeholder="Type a benefit and press Enter"
      className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
    />

    <div className={`mt-2 p-3 w-full rounded-md ${benefits.length ? "bg-gray-100" : "bg-transparent"}`}>
      {benefits.length !== 0 && (
        <ul className="list-disc list-inside w-full">
          {benefits.map((ben, index) => (
            <li 
              key={index} 
              className="flex justify-between items-center text-gray-800 break-words overflow-hidden"
            >
              <span className="truncate">{ben}</span>
              <button
                onClick={() => setBenefits((prev) => prev.filter((_, i) => i !== index))}
                className="ml-3 px-1 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-900"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</div>

          {/* 6th row */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
  {/* Job Responsibilities Section */}
  <div className="lg:w-1/2 w-full">
    <label className="block mb-2 text-lg">Job Responsibilities</label>
    <textarea
      rows={2}
      value={responsibleInput}
      
      onChange={(e) => setResponsibleInput(e.target.value)}
      onKeyDown={(e) => handleKeyDown(e,responsibleInput, setResponsibleInput, setResponsibles)}
      placeholder="Type a responsibility and press Enter"
      className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
    />

    <div className={`mt-2 p-3 w-full rounded-md ${responsibles.length ? "bg-gray-100" : "bg-transparent"}`}>
      {responsibles.length !== 0 && (
        <ul className="list-disc list-inside w-full">
          {responsibles.map((res, index) => (
            <li 
              key={index} 
              className="flex justify-between items-center text-gray-800 break-words overflow-hidden"
            >
              <span className="truncate">{res}</span>
              <button
                onClick={() => setResponsibles((prev) => prev.filter((_, i) => i !== index))}
                className="ml-3 px-1 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-900"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>

  {/* Job Description Section */}
  <div className="lg:w-1/2 w-full">
    <label className="block mb-2 text-lg">Job Description</label>
    <textarea
      className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
      rows={6}
      placeholder="Enter Job Description"
      {...register("description")}
    />
  </div>
</div>

          {/* last row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Conatct Email</label>
            <input
              type="email"
              placeholder="your email"
              {...register("contactEmail")}
              className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
            />
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Conatct Number</label>
            <input
              type="tel"
              placeholder="0000 0000"
              {...register("contactPhone")}
              className="block w-full  bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
            />
          </div>
          </div>
          <input
            type="submit"
            className="block bg-red-600 mt-12bg-blueI text-white font-semibold px-8 py-2 rounded-sm
cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};
