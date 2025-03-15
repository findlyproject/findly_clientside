import { setprofessionalUserData } from "@/lib/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function Jobtitle() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.activeuser);
  const jobTitles = useAppSelector((state) => state.admin.titles);

  // Initialize job titles with existing user job titles
  const [jobTitle, setJobTitle] = useState<string[]>(user?.jobTitle || []);
  const [selectedJob, setSelectedJob] = useState("");

  const handleAddJobTitle = () => {
    if (selectedJob && !jobTitle.includes(selectedJob)) {
      const updatedJobTitles = [...jobTitle, selectedJob];
      setJobTitle(updatedJobTitles);
      dispatch(setprofessionalUserData({ jobTitle: updatedJobTitles }));
      setSelectedJob("");
    }
  };

  const handleRemoveJobTitle = (index: number) => {
    const updatedJobTitles = jobTitle.filter((_, i) => i !== index);
    setJobTitle(updatedJobTitles);
    dispatch(setprofessionalUserData({ jobTitle: updatedJobTitles }));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center md:text-left">
        Job Title
      </h2>

      {/* Dropdown & Button */}
      <div className="flex flex-col md:flex-row gap-3 items-center">
        <select
          className="border p-3 w-full md:w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
        >
          <option value="">Select a Job</option>
          {jobTitles.map((job, index) => (
            <option key={index} value={job.name}>
              {job.name}
            </option>
          ))}
        </select>

        <button
          className="bg-primary text-white p-2 rounded-lg font-medium disabled:opacity-50 transition duration-200 disabled:cursor-not-allowed"
          onClick={handleAddJobTitle}
          disabled={!selectedJob}
        >
          Add
        </button>
      </div>

      {/* Display Added Job Titles */}
      {jobTitle.length > 0 && (
        <div className="mt-4">
          <ul className="flex flex-wrap gap-2 justify-center md:justify-start">
            {jobTitle.map((job, index) => (
              <li
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
              >
                {job}
                <button
                  onClick={() => handleRemoveJobTitle(index)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <RxCross2 size={15} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Jobtitle;
