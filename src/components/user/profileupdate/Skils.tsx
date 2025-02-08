import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx';


const skillsList = [
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "TypeScript",
    "Tailwind CSS",
    "Redux",
    "GraphQL",
];
function Skils() {
     const [selectedSkill, setSelectedSkill] = useState("");
      const [addedSkills, setAddedSkills] = useState<string[]>([]);
    
      const handleAddSkill = () => {
        if (selectedSkill && !addedSkills.includes(selectedSkill)) {
          setAddedSkills([...addedSkills, selectedSkill]);
          setSelectedSkill(""); // Reset selection
        }
      };
    
      const handleRemoveSkill = (skillToRemove: string) => {
        setAddedSkills(addedSkills.filter((skill) => skill !== skillToRemove));
      };
    
  return (
    <div>
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg mt-4 w-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Skills</h2>

      {/* Skill Dropdown and Button */}
      <div className="flex gap-3 items-center ">
        <select
          className="border p-3 w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
        >
          <option value="">Select a skill</option>
          {skillsList.map((skill, index) => (
            <option key={index} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleAddSkill}
          disabled={!selectedSkill}
        >
          Add
        </button>
      </div>

      {/* Display Added Skills */}
      {addedSkills.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Added Skills:</h3>
          <ul className="flex flex-wrap gap-2">
            {addedSkills.map((skill, index) => (
              <li
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 font-medium"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <RxCross2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  )
}

export default Skils
