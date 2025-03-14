"use client";

import { TitleType, SkillType } from "@/types/Types";

import { useEffect, useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { toast } from "react-toastify";
import { CiBookmarkRemove } from "react-icons/ci";
import { VscVerifiedFilled } from "react-icons/vsc";
import { VscVerified } from "react-icons/vsc";
import { MdEdit } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  editSkill,
  editTitle,
  handleApproveSkill,
  handleApproveTitle,
  handleBlock,
  handleRemoveSkill,
  handleRemoveTitle,
  postSkill,
  postTitle,
  showSkills,
  showSTitles,
} from "@/lib/store/features/actions/adminActions";

const Create = () => {
  const [skill, setSkill] = useState("");

  const [editingSkill, setEditingSkill] = useState<string | null>(null);

  const [titles, setTitles] = useState("");

  const [titleEditing, setTitleEditing] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const skills = useAppSelector((state) => state.admin.skills);
  const jobtitles = useAppSelector((state) => state.admin.titles);
  const [activeTab, setActiveTab] = useState("skills");
  const formattedSkill =
    skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase();
  const formattedTitles =
    titles.charAt(0).toUpperCase() + titles.slice(1).toLowerCase();

  console.log("skills", skills);

  useEffect(() => {
    fetchSkills();
    fetchTitle();
  }, []);

  const fetchSkills = () => {
    dispatch(showSkills());
  };
  const fetchTitle = () => {
    dispatch(showSTitles());
  };

  const handleSkill = async () => {
    if (!skill.trim()) {
      toast.warn("Please enter a skill name");
      return;
    }
    try {
      if (editingSkill) {
        const result = await dispatch(editSkill({ skill, editingSkill }));

        console.log("resultedit", result);
        if (result.type === "edit/skills/fulfilled") {
          dispatch(showSkills());
        }
      } else {
        const result = await dispatch(postSkill(formattedSkill));
        console.log("result", result);
        if (result.type === "post/skills/fulfilled") {
          dispatch(showSkills());
        }
      }
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
        const result = await dispatch(editTitle({ titles, titleEditing }));

        if (result.type === "edit/Title/fulfilled") {
          dispatch(showSTitles());
        }
        setTitleEditing(null);
      } else {
        const result = await dispatch(postTitle(formattedTitles));
        console.log("resultpodtgfftf", result);

        if (result.type === "post/Title/fulfilled") {
          dispatch(showSTitles());
        }
      }
      setTitles("");
    } catch (error) {
      console.error("Error adding titles:", error);
    }
  };

  const handleRemove = async (skillId: string) => {
    console.log("skillId", skillId);

    const result = await dispatch(handleRemoveSkill(skillId));
    console.log("result", result);

    if (result.type === "remove/skill/fulfilled") {
      dispatch(showSkills());
    }
  };

  const handleTitleRemove = async (titleId: string) => {
    const result = await dispatch(handleRemoveTitle(titleId));
    if (result.type === "remove/title/fulfilled") {
      dispatch(showSTitles());
    }
  };

  const handleTitleApprove = async (titleid: string) => {
    const result = await dispatch(handleApproveTitle(titleid));

    if (result.type === "approve/title/fulfilled") {
      dispatch(showSTitles());
    }
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
    const result = await dispatch(handleApproveSkill(skillid));
    if (result.type === "approve/skills/fulfilled") {
      dispatch(showSkills());
    }
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
                {skills.map((skillItem, index) => (
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
                {jobtitles.map((Item, index) => (
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
