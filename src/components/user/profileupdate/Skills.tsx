import { setprofessionalUserData } from "@/lib/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function Skills() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.activeuser);
  const skillsList = useAppSelector((state) => state.admin.skills);

  // Initialize skills with existing user skills
  const [skills, setSkills] = useState<string[]>(user?.skills || []);

  const [selectedSkill, setSelectedSkill] = useState("");

  const handleAddSkill = () => {
    if (selectedSkill && !skills.includes(selectedSkill)) {
      const updatedSkills = [...skills, selectedSkill];
      setSkills(updatedSkills);
      dispatch(setprofessionalUserData({ skills: updatedSkills }));
      setSelectedSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    dispatch(setprofessionalUserData({ skills: updatedSkills }));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Skills</h2>
      <div className="flex gap-3 items-center">
        <select
          className="border p-3 w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
        >
          <option value="">Select a skill</option>
          {skillsList?.map((skill, index) => (
            <option key={index} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>

        <button
          className="bg-primary text-white p-2 rounded-lg font-medium disabled:opacity-50 transition duration-200 disabled:cursor-not-allowed"
          onClick={handleAddSkill}
          disabled={!selectedSkill}
        >
          Add
        </button>
      </div>

      {/* Display Added Skills */}
      {skills.length > 0 && (
        <div className="mt-4">
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <li
                key={index}
                className="bg-blue-100 text-blue-800 p-1 rounded-full flex items-center gap-1 text-xs"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(index)}
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

export default Skills;
