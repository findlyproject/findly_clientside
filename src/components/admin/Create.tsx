"use client";
import { SkillType, TitleType } from "@/lib/store/features/adminSlice";

import api from "@/utils/api";

import { useEffect, useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { toast } from "react-toastify";
import { CiBookmarkRemove } from "react-icons/ci";
import { VscVerifiedFilled } from "react-icons/vsc";
import { VscVerified } from "react-icons/vsc";
import { MdEdit } from "react-icons/md";

const Create = () => {
  const [skill, setSkill] = useState("");
  const [allskills, setallSkills] = useState<SkillType[]>([]);
  const [editingSkill, setEditingSkill] = useState<string | null>(null);

  const [titles, setTitles] = useState("");
  const [alltitles, setallTitles] = useState<TitleType[]>([]);
  const [titleEditing, setTitleEditing] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState("skills");
  const formattedSkill =
    skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase();
  const formattedTitles =
    titles.charAt(0).toUpperCase() + titles.slice(1).toLowerCase();

  useEffect(() => {
    const fetch = async () => {
      const response = await api.get(`/admin/allskills`);

      setallSkills(response.data.skills);

      const responseofTitle = await api.get("/admin/alladmin");

      setallTitles(responseofTitle.data.titles);
    };
    fetch();
  }, []);

  const handleSkill = async () => {
    if (!skill.trim()) {
      toast.warn("Please enter a skill name");
      return;
    }

    try {
      if (editingSkill) {
        const response = await api.patch(`/admin/editskill/${editingSkill}`, {
          newskill: skill,
        });
        console.log(" skill edit response", response);

        setallSkills((prevSkills) => {
          console.log("Previous Skills:", prevSkills);

          const updatedSkills = prevSkills.map((s) =>
            s._id == editingSkill ? { ...s, name: skill } : s
          );

          console.log("Updated Skills:", updatedSkills);
          return updatedSkills;
        });

        setEditingSkill(null);
      } else {
        const response = await api.post(`/admin/addskill`, {
          name: formattedSkill,
        });

        setallSkills((prevSkills) => [
          ...prevSkills,
          { _id: response.data.skill._id, name: formattedSkill, status: true },
        ]);
      }
      setSkill("");
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const handleTitles = async () => {
    if (!titles.trim()) {
      toast.warn("Please enter a title name");
      return;
    }

    try {
      if (titleEditing) {

        const response = await api.patch(`/admin/edittitle/${titleEditing}`, {
          newTitle: titles,
        });

        setallTitles((prevTitles) => {
          const updatedTitle = prevTitles.map((s) =>
            s._id == titleEditing ? { ...s, name: titles } : s
          );

          return updatedTitle;
        });

        setTitleEditing(null);
      } else {
        const response = await api.post(`/admin/addtitle`, {
          name: formattedTitles,
        });

       



        setallTitles((prevTitles) => [
          ...prevTitles,
          { _id: response.data.title._id, name: formattedTitles, status: true },
        ]);
      }
      setTitles("");
      }

      
     catch (error) {
      console.error("Error adding titles:", error);
    }
  };

  const handleRemove = async (skillId: string) => {
    const response = await api.patch(`/admin/removeskill/${skillId}`);

    setallSkills((prevskill) =>
      prevskill.filter((skill) => skill._id !== skillId)
    );
  };

  const handleTitleRemove = async (titleId: string) => {
    const response = await api.patch(`/admin/removetitle/${titleId}`);

    setallTitles((prevTitle) =>
      prevTitle.filter((title) => title._id !== titleId)
    );
  };

  const handleTitleApprove = async (titleid: string) => {
    const response = await api.patch(`/admin/approvetitle/${titleid}`);

    setallTitles((prevTitles) =>
      prevTitles.map((s) => (s._id === titleid ? { ...s, status: true } : s))
    );
  };

  const handleTitleEdit = async (Item: TitleType) => {
    setTitles(Item.name);
    setTitleEditing(Item._id);
    
    
  };

  const handleEdit = async (skillItem: SkillType) => {
    setSkill(skillItem.name);
    setEditingSkill(skillItem._id);
  };

  const handleApprove = async (skillid: string) => {
    const response = await api.patch(`/admin/approveskill/${skillid}`);

    setallSkills((prevSkills) =>
      prevSkills.map((s) => (s._id === skillid ? { ...s, status: true } : s))
    );
  };
  return (
    <div className="flex flex-col items-start min-h-screen bg-gray-100 p-6">
      <nav className="flex space-x-4 bg-white p-4 rounded-lg shadow-md w-full">
        <button
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "skills" ? "bg-primary text-white" : "text-gray-700"
          }`}
          onClick={() => setActiveTab("skills")}
        >
          Skills
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "jobtitles"
              ? "bg-primary text-white"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("jobtitles")}
        >
          Job Titles
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "courses" ? "bg-primary text-white" : "text-gray-700"
          }`}
          onClick={() => setActiveTab("courses")}
        >
          Courses
        </button>
      </nav>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full  mt-6">
        {activeTab === "skills" && (
          <>
            <div className="p-3 rounded-lg items-center inline-flex ">
              <div className="h-5 items-center gap-3 flex">
                <div className="relative" title="Settings">
                  <IoMdCreate className="text-xl" />
                </div>
                <h2 className="text-gray-500 text-xl font-medium leading-snug">
                  Create Skill
                </h2>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative flex items-center border rounded-lg px-3 py-1 w-full h-10">
                <input
                  type="text"
                  placeholder="Write a skill"
                  className="w-full focus:outline-none"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                />
              </div>

              <button
                onClick={handleSkill}
                className="px-4 py-2 h-10 rounded-lg bg-primary text-white font-semibold"
              >
                {editingSkill ? "Update" : "Done"}
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-600">
                Skills List
              </h3>
              <ul>
                {allskills.map((skillItem, index) => (
                  <li key={index} className="p-2 rounded-md bg-gray-100 my-2">
                    <div className="flex  justify-between">
                      {skillItem.name}

                      <div className="flex space-x-2">
                        <button onClick={() => handleRemove(skillItem._id)}>
                          <CiBookmarkRemove className="text-xl" />
                        </button>
                        <button onClick={() => handleEdit(skillItem)}>
                          <MdEdit className="text-primary" />
                        </button>
                        <button onClick={() => handleApprove(skillItem._id)}>
                          {skillItem.status === true ? (
                            <VscVerifiedFilled className="text-xl text-primary" />
                          ) : (
                            <VscVerified className="text-xl text-primary" />
                          )}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {activeTab === "jobtitles" && (
          <>
            <div className="p-3 rounded-lg items-center inline-flex ">
              <div className="h-5 items-center gap-3 flex">
                <div className="relative" title="Settings">
                  <IoMdCreate className="text-xl" />
                </div>
                <h2 className="text-gray-500 text-xl font-medium leading-snug">
                  Create Job Titles
                </h2>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative flex items-center border rounded-lg px-3 py-1 w-full h-10">
                <input
                  type="text"
                  placeholder="Write a title"
                  className="w-full focus:outline-none"
                  value={titles}
                  onChange={(e) => setTitles(e.target.value)}
                />
              </div>

              <button
                onClick={handleTitles}
                className="px-4 py-2 h-10 rounded-lg bg-primary text-white font-semibold"
              >
                {titleEditing ? "Update" : "Done"}
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-600">
                Titles List
              </h3>
              <ul>
                {alltitles.map((Item, index) => (
                  <li key={index} className="p-2 rounded-md bg-gray-100 my-2">
                    <div className="flex  justify-between">
                      {Item.name}
                      <div className="flex space-x-2">
                        <button onClick={() => handleTitleRemove(Item._id)}>
                          <CiBookmarkRemove className="text-xl text-primary" />
                        </button>
                        <button onClick={() => handleTitleEdit(Item)}>
                          <MdEdit className="text-primary" />
                        </button>
                        <button onClick={() => handleTitleApprove(Item._id)}>
                          {Item.status === true ? (
                            <VscVerifiedFilled className="text-xl text-primary" />
                          ) : (
                            <VscVerified className="text-xl text-primary" />
                          )}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {activeTab === "courses" && (
          <h2 className="text-xl text-gray-500">Coming soon...</h2>
        )}
      </div>
    </div>
  );
};

export default Create;
