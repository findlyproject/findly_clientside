"use client";
import Image from "next/image";
import Link from "next/link";
import { LuSend } from "react-icons/lu";
import { FaEllipsisV, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { HiPaperClip } from "react-icons/hi2";
import { useRouter } from "next/navigation";
export default function ChatUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [ismenuOpen, setIsmenuOpen] = useState(false);
  const router = useRouter();
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
  const chatData = [
    {
      name: "Developers",
      message: "👋",
      img: "https://i.pinimg.com/474x/75/87/df/7587df77ef521cf98057d0028ee983f1.jpg",
      status: "online",
      unread: 3,
    },
    {
      name: "Learn Javascript",
      message: "Have a nice day 😊",
      img: "https://i.pinimg.com/736x/0e/4f/dc/0e4fdce8ac22e09688c580e5bc4dcd7d.jpg",
      status: "offline",
      unread: 1,
    },
    {
      name: "Evan Warren",
      message: "Hey. It’s time to start your workout!",
      img: "https://i.pravatar.cc/40?img=3",
      status: "online",
      unread: 2,
    },
    {
      name: "Jane Smith",
      message: "See you later!",
      img: "https://i.pravatar.cc/40?img=4",
      status: "offline",
      unread: 0,
    },
    {
      name: "Gloria Black",
      message: "Fine! Keep it up 💪",
      img: "https://i.pravatar.cc/40?img=5",
      status: "online",
      unread: 0,
    },
    {
      name: "Audrey Watson",
      message: "Thanks!",
      img: "https://i.pravatar.cc/40?img=6",
      status: "offline",
      unread: 0,
    },
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-1/4 bg-white border-r p-4 overflow-y-auto hidden md:block">
        <div className="flex  justify-between">
          <h2 className="text-xl font-semibold">
            Messages <span className="text-gray-500">(22)</span>
          </h2>
          <div className="relative inline-block">
            <div
              className="cursor-pointer p-2 rounded-full hover:bg-gray-200"
              onClick={() => setIsmenuOpen(!ismenuOpen)}
            >
              <FaEllipsisV className="text-primary text-xl" />
            </div>

            {ismenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <ul className="py-2 text-sm text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      alert("Reported");
                      setIsmenuOpen(false);
                    }}
                  >
                    New Community
                  </li>

                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsmenuOpen(false)}
                  >
                    Back
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 pl-10 border rounded-md focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="space-y-4">
          {chatData.map((chat, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm"
            >
              <div
                className="flex items-center space-x-3"
                onClick={() => router.push(`/community`)}
              >
                <div className="relative">
                  <img
                    src={chat.img}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">{chat.name}</h2>
                  <p className="text-xs text-gray-600 truncate w-40">
                    {chat.message}
                  </p>
                </div>
              </div>

              {chat.unread > 0 && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {chat.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white p-4 border-b">
          <div
            className="flex items-center"
            onClick={() => router.push(`/community/details`)}
          >
            <img
              src="https://i.pinimg.com/474x/75/87/df/7587df77ef521cf98057d0028ee983f1.jpg"
              className="w-10 h-10 rounded-full"
              alt="Group"
            />
            <div className="ml-3">
              <h2 className="font-medium">Developers</h2>
              <span className="text-sm text-gray-500">56 members</span>
            </div>
          </div>
          <div className="relative">
            <div
              className="flex space-x-4 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaEllipsisV className="text-gray-600" />
            </div>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                <ul className="py-2 text-sm text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => alert("Reported")}
                  >
                    Report
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => alert("Left the community")}
                  >
                    Leave Community
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    Back
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex flex-col items-start">
            <div className="flex items-start">
              <img
                src="https://i.pravatar.cc/40?img=4"
                className="w-8 h-8 rounded-full"
                alt="User"
              />
              <div className="ml-3 bg-gray-200 p-3 rounded-lg max-w-xs">
                <p className="text-sm">Hi guys! I am ready! 💪😊</p>
              </div>
            </div>
            <span className="text-xs text-gray-500 mt-1 ml-11">11:08 AM</span>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-start">
              <div className="bg-primary text-white p-3 rounded-lg max-w-xs">
                <p className="text-sm">
                  Hello, I have a cool idea. Are you ready guys? 🔥
                </p>
              </div>
              <img
                src="https://i.pravatar.cc/40?img=5"
                className="w-8 h-8 rounded-full ml-3"
                alt="You"
              />
            </div>
            <span className="text-xs text-gray-500 mt-1">11:08 AM</span>
          </div>

          <div className="flex flex-col items-start">
            <div className="flex items-start">
              <img
                src="https://i.pravatar.cc/40?img=4"
                className="w-8 h-8 rounded-full"
                alt="User"
              />
              <div className="ml-3 bg-gray-200 p-3 rounded-lg max-w-xs">
                <Image
                  src="https://i.pinimg.com/736x/3d/e2/68/3de268261ccee692c8b085f7e5b7035f.jpg"
                  alt="job"
                  width={500}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            <span className="text-xs text-gray-500 mt-1 ml-11">11:08 AM</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-start">
              <div className="bg-primary text-white p-3 rounded-lg max-w-xs">
                <p className="text-sm">Amazing 🔥</p>
              </div>
              <img
                src="https://i.pravatar.cc/40?img=5"
                className="w-8 h-8 rounded-full ml-3"
                alt="You"
              />
            </div>
            <span className="text-xs text-gray-500 mt-1">11:08 AM</span>
          </div>
        </div>

        <footer className="p-4 bg-white border-t flex">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-l-md focus:outline-none"
          />
          <button className=" text-primary px-4 py-2 rounded-r-md">
            <HiPaperClip />
          </button>

          <button className="bg-primary text-white px-4 py-2 rounded-r-md">
            <LuSend />
          </button>
        </footer>
      </main>

      <aside className="w-1/4 bg-white border-l p-4 overflow-y-auto hidden lg:block">
        <h2 className="text-xl font-semibold">Developers</h2>
        <p className="text-gray-500 text-sm">56 members</p>
        <div className="mt-4">
          <h3 className="font-semibold">Members</h3>
          <div className="mt-2">
            {members.map((member, index) => (
              <div key={index} className="py-2 flex items-center">
                <img
                  src={member.img}
                  className="w-8 h-8 rounded-full"
                  alt={member.name}
                />
                <p className="ml-3">{member.name}</p>
                <span>
                  {member.admin === true ? (
                    <p className="text-primary ml-24 bg-gray-100  border border-primary rounded-full text-sm p-1">
                      admin
                    </p>
                  ) : (
                    ""
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end text-blue-500">
            <Link href="">more</Link>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Shared Posts</h3>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              "https://i.pinimg.com/474x/1a/d7/9b/1ad79bd7a043fa44e497c11d09443704.jpg",
              "https://i.pinimg.com/474x/11/30/cd/1130cdadc60fae91e1781bac0ee0aa8d.jpg",
              "https://i.pinimg.com/736x/31/71/00/317100cdc901c0f87d4baa2d2188ba44.jpg",
              "https://i.pinimg.com/474x/1a/d7/9b/1ad79bd7a043fa44e497c11d09443704.jpg",
              "https://i.pinimg.com/474x/11/30/cd/1130cdadc60fae91e1781bac0ee0aa8d.jpg",
              "https://i.pinimg.com/736x/31/71/00/317100cdc901c0f87d4baa2d2188ba44.jpg",
            ].map((img, index) => (
              <img
                key={index}
                src={img}
                className="w-full max-w-[100px] h-[100px] rounded-lg shadow-md"
                alt={`Shared post ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
