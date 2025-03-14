"use client";
import { FilterOption, InputType, JobFiltersSidebarProps } from "@/types/Types";
import React, { useState } from "react";



const JobFiltersSidebar: React.FC<JobFiltersSidebarProps> = ({setInput}) => {

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const Title: FilterOption[] = [
    { id: "Information Technology", label: "Information Technology" },
    { id: "Software Engineer", label: "Software Engineer" },
    { id: "graphic designer", label: "graphic designer" },
    { id: "Cybersecurity Analyst", label: "Cybersecurity Analyst" },
    { id: "DevOps Engineer", label: "DevOps Engineer" },
    { id: "Data Scientist", label: "Data Scientist" },
    { id: "Backend Engineer", label: "Backend Engineer" },
    { id: "Frontend Developer", label: "Frontend Developer" },
  ];

  const ExperienceLevel: FilterOption[] = [
    { id: "Mid", label: "Mid" },
    { id: "Entry", label: "Entry" },
    { id: "Senior", label: "Senior" },
  ];

  const Industry: FilterOption[] = [
    { id: "Information Technology", label: "Information Technology" },
    { id: "Software Development", label: "Software Development" },
    { id: "Cloud Computing", label: "Cloud Computing" },
  ];

  const JobType: FilterOption[] = [
    { id: "Full-time", label: "Full-time" },
    { id: "Part-time", label: "Part-time" },
    { id: "Contract", label: "Contract" },
    { id: "Remote", label: "Remote" },
    { id: "Hybrid", label: "Hybrid" },
  ];

  // Function to handle checkbox selection (only one per category) ///
  const handleCheckboxChange = (category: string, value: string) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [category]: value };
      setInput((prevInput) => ({
        ...prevInput,
        [category]: value,
      }));

      return updatedFilters;
    });
  };
  const clearfilter = () => {
    const clearedFilters: InputType = {
      title: '',
      experienceLevel: '',
      industry: '',
      jobType: '',
    };
    setSelectedFilters({});
    setInput(clearedFilters);
  }

  return (
    <div className="p-6 h-screen overflow-y-auto mb-32 ">
      {/* Filters Section */}
      <div className="mb-4 flex justify-between">
        <h2 className="font-semibold">Filters</h2>
        <button className="bg-primary  text-white p-2 rounded-lg text-sm"
          onClick={clearfilter}
        >
          Clear Filter
        </button>
      </div>

      <FilterSection title="Job Title" options={Title} category="title" selectedFilters={selectedFilters} onCheckboxChange={handleCheckboxChange} />
      <FilterSection title="Experience Level" options={ExperienceLevel} category="experienceLevel" selectedFilters={selectedFilters} onCheckboxChange={handleCheckboxChange} />
      <FilterSection title="Industry" options={Industry} category="industry" selectedFilters={selectedFilters} onCheckboxChange={handleCheckboxChange} />
      <FilterSection title="Job Type" options={JobType} category="jobType" selectedFilters={selectedFilters} onCheckboxChange={handleCheckboxChange} />

     
    </div>
  );
};

const FilterSection: React.FC<{
  title: string;
  options: FilterOption[];
  category: string;
  selectedFilters: Record<string, string>;
  onCheckboxChange: (category: string, value: string) => void;
}> = ({ title, options, category, selectedFilters, onCheckboxChange }) => (
  <div className="mb-6">
    <h3 className="text-sm text-gray-500 mb-3">{title}</h3>
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <input
            type="radio"
            name={category}
            id={option.id}
            checked={selectedFilters[category] === option.id}
            onChange={() => onCheckboxChange(category, option.id)}
            className="rounded border-gray-300 text-black focus:ring-black"
          />
          <label htmlFor={option.id} className="text-sm leading-none cursor-pointer">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default JobFiltersSidebar;
