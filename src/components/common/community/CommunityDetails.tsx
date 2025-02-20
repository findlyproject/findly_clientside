"use client";
import React, { useState } from "react";

export default function CommunityDetails() {
  const [activeTab, setActiveTab] = useState("images");

  const images = [
    "https://i.pinimg.com/474x/1a/d7/9b/1ad79bd7a043fa44e497c11d09443704.jpg",
    "https://i.pinimg.com/474x/11/30/cd/1130cdadc60fae91e1781bac0ee0aa8d.jpg",
    "https://i.pinimg.com/736x/31/71/00/317100cdc901c0f87d4baa2d2188ba44.jpg",
    "https://i.pinimg.com/474x/1a/d7/9b/1ad79bd7a043fa44e497c11d09443704.jpg",
    "https://i.pinimg.com/474x/11/30/cd/1130cdadc60fae91e1781bac0ee0aa8d.jpg",
    "https://i.pinimg.com/736x/31/71/00/317100cdc901c0f87d4baa2d2188ba44.jpg",
  ];

  const videos = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
  ];

  const members = [
    {
      name: "Sophia Madison",
      img: "https://i.pravatar.cc/40?img=6",
      admin: true,
    },
    { name: "Lucas West", img: "https://i.pravatar.cc/40?img=7", admin: false },
    { name: "Ancy", img: "https://i.pravatar.cc/40?img=5", admin: false },
    { name: "Joe", img: "https://i.pravatar.cc/40?img=4", admin: false },
    { name: "Maria", img: "https://i.pravatar.cc/40?img=2", admin: false },
  ];
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative">
        <img
          src="https://i.pinimg.com/736x/42/19/7c/42197c33c1c2b1e3f918ba86c5f196a4.jpg"
          alt="Community Banner"
          className="w-full h-[250px] object-cover rounded-lg"
        />

        <div className="absolute left-4 bottom-[-40px]">
          <img
            src="https://i.pinimg.com/474x/75/87/df/7587df77ef521cf98057d0028ee983f1.jpg"
            alt="Community Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold">Developers</h2>
        <p className="text-gray-600 mt-2">
          This is a brief description about the community. It explains its
          purpose, activities, and members. Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Tempora quisquam vitae laborum, libero
          esse nesciunt soluta laboriosam praesentium aspernatur quae nobis amet
          in facere totam ducimus? Beatae, atque. Est, quaerat.
        </p>
      </div>

      <div className="mt-6">
        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "images" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("images")}
          >
            Images
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "videos" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </button>

          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "members" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("members")}
          >
            Members
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {activeTab === "images" ? (
    images.map((src, index) => (
      <img
        key={index}
        src={src}
        className="w-full h-[150px] object-cover rounded-lg"
        alt="Post"
      />
    ))
  ) : activeTab === "videos" ? (
    videos.map((src, index) => (
      <video key={index} src={src} className="w-full h-[150px] rounded-lg" controls />
    ))
  ) : (
    <ul className="space-y-2">
        <h1 className="text-xl font-semibold">6 Members</h1>
    {members.map((member, index) => (
      <li key={index} className="py-2 flex items-center border-b pb-2">
        <img src={member.img} className="w-8 h-8 rounded-full" alt={member.name} />
        <span className="ml-3">{member.name}</span>
        {member.admin && (
          <span className="text-primary ml-auto bg-gray-100 border border-primary rounded-full text-sm px-2 py-1">
            Admin
          </span>
        )}
      </li>
    ))}
  </ul>
  
  )}
</div>

      </div>
    </div>
  );
}
