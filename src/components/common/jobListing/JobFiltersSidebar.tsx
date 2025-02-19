"use client";

import React from "react";

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

const JobFiltersSidebar: React.FC = () => {
  const workingSchedule: FilterOption[] = [
    { id: "full-time", label: "Full time", checked: false },
    { id: "part-time", label: "Part time", checked: false },
    { id: "internship", label: "Internship", checked: false },
    { id: "project-work", label: "Project work", checked: false },
    { id: "volunteering", label: "Volunteering", checked: false },
  ];

  const employmentType: FilterOption[] = [
    { id: "full-day", label: "Full day", checked: false },
    { id: "flexible-schedule", label: "Flexible schedule", checked: false },
    { id: "shift-work", label: "Shift work", checked: false },
    { id: "distant-work", label: "Distant work", checked: false },
    { id: "shift-method", label: "Shift method", checked: false },
  ];

  const FilterSection: React.FC<{ title: string; options: FilterOption[] }> = ({
    title,
    options,
  }) => (
    <div className="mb-6 ">
      <h3 className="text-sm text-gray-500 mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={option.id}
              defaultChecked={option.checked}
              className="rounded border-gray-300 text-black focus:ring-black"
            />
            <label
              htmlFor={option.id}
              className="text-sm leading-none cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 h-screen overflow-y-auto mb-32 bg-white">
      {/* Filters Section */}
      <div className="mb-4">
        <h2 className="font-semibold">Filters</h2>
      </div>

      {/* Filter Groups */}
      <FilterSection title="Working schedule" options={workingSchedule} />
      <FilterSection title="Employment type" options={employmentType} />
      <FilterSection title="Working schedule" options={workingSchedule} />
      <FilterSection title="Employment type" options={employmentType} /> 
      <FilterSection title="Working schedule" options={workingSchedule} />
      <FilterSection title="Employment type" options={employmentType} />
    </div>
  );
};

export default JobFiltersSidebar;
