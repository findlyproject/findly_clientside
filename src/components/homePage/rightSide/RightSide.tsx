import { findnMembers } from "@/lib/store/features/actions/communityActions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { useEffect, useState } from "react";

import React from "react";
import api, { socket } from "@/utils/api";
import { IoMdArrowBack } from "react-icons/io";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import EmojiPicker from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import OutsideClickHandler from "react-outside-click-handler";
import { BsThreeDots } from "react-icons/bs";
import { Connection, User } from "@/types/Types";

import { MessageType } from "@/types/Types";
import { toast } from "react-toastify";
export default function RightSide() {
  const dispatch = useAppDispatch();
  const [starred, setStarred] = useState([]);
  const [conversation, setConversation] = useState({});
  const [Chatlist, setChatlist] = useState([]);
  const [selectedUser, setSelectedUser] = useState<Connection | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("focused");
  const [focused, setFocused] = useState<Connection[]>([]);

  const [other, setOther] = useState<User[]>([]);
  const activeuser = useAppSelector((state) => state.user.activeuser);
  const [showPicker, setShowPicker] = useState(false);

  const [filterDropdown, setfilterDropdown] = useState(false);
  const [Dropdown, setDropdown] = useState<string | null>(null);

  const handleFilterDropdown = () => {
    setfilterDropdown((prev) => !prev);
  };
  const handleDropdown = (event: React.MouseEvent, userId: string) => {
    event.stopPropagation();
    setDropdown(Dropdown === userId ? null : userId);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await api.get(`/connecting/getconnection`);
      console.log("response of members", response);
      setMembers(response.data.connections);
    };
    fetch();
    // fetchMembers();
  }, []);

  const handleStarred = async () => {
    setActiveTab("starred");
    const starredres = await api.get(`/message/starred`);
    console.log("starredres", starredres);

    setStarred(starredres.data.starredUsers);
  };

  useEffect(() => {
    if (activeTab === "focused") {
      setFocused(Chatlist);
    } else {
      setOther(members);
    }
  }, [activeTab, members, Chatlist, starred]);

  const fetchMembers = () => {
    const result = dispatch(findnMembers);
    console.log("result", result);
  };

  console.log("other..", other);
  const fetchMessages = async () => {
    if (selectedUser) {
      const responseofMessage = await api.get(
        `/message/conversation/${activeuser?._id}/${
          selectedUser?.connectionID?._id || selectedUser?._id
        }`
      );
      console.log("responseofMessage", responseofMessage);
      setMessages(responseofMessage.data.messages);
    }
  };
  useEffect(() => {
    fetchMessages();
    fetchUsers();
  }, [selectedUser, activeuser?._id]);
  console.log("messages", messages);

  const handleUserSelect = (user: Connection) => {
    console.log("user....", user);
    setSelectedUser(user);
    setMessages([]);
    fetchMessages();
    socket.emit("joinRoom", user?.connectionID?._id || user?._id);
  };

  // Send Message
  const handleSendMessage = async () => {
    const response = await api.post(
      `/message/send/${activeuser?._id}/${
        selectedUser?.connectionID?._id || selectedUser?._id
      }`,
      { message: message }
    );
    console.log("responseresponse", response);
    console.log("responseresponse", response);

    setMessage("");
    fetchUsers();
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
      console.log("Connected to server:", socket.id);
    });

    socket.emit("joinRoom", activeuser?._id);

    socket.on("receiveMessage", (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    // Cleanup on Component Unmount
    return () => {
      socket.off("receiveMessage");
      socket.off("connect");
    };
  }, [selectedUser?.connectionID?._id]);

  console.log("all messages", messages);
  console.log("selectedUser", selectedUser);

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };
  const fetchUsers = async () => {
    const response = await api.get(`/message/chatlist`);
    console.log("response of chatlist of active user", response);
    setChatlist(response.data.chats);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  console.log("Chatlist", Chatlist);

  const fetchAllConversation = async () => {
    const senderId = activeuser?._id;
    const receiverId = selectedUser?._id || selectedUser?.connectionID?._id;
    console.log("selectedUser...conver", selectedUser);

    console.log("senderId,receiverId", senderId, receiverId);
    if (!senderId || !receiverId) {
      toast.warn("Sender or Receiver ID missing. Skipping API call.");
      return;
    }
    const response = await api.get(
      `/message/conversations/${senderId}/${receiverId}`
    );

    console.log("response of conversation of this user", response);
    setConversation(response.data.conversation);
  };
  useEffect(() => {
    if (
      activeuser?._id &&
      (selectedUser?._id || selectedUser?.connectionID?._id)
    ) {
      fetchAllConversation();
    } else {
      console.log("Waiting for IDs to be ready...");
    }
  }, [activeuser, selectedUser]);
  console.log("conversss", conversation);

  const handleBlock = async (recieverid: string, block: string) => {
    if (!activeuser?._id || !recieverid) {
      console.error("Missing active user or receiver ID");
      return;
    }
    const response = await api.post(
      `/message/blockOrunblock/${activeuser?._id}/${recieverid}`,
      { action: block }
    );
    console.log("res", response);
    fetchAllConversation();
  };

  const handleStar = async (recieverid: string, star: string) => {
    const response = await api.post(
      `/message/starOrRemovestar/${activeuser?._id}/${recieverid}`,
      { action: star }
    );
    console.log("response of starring", response);
    fetchAllConversation();
  };
  const handleClearChat = async (receiverId: string) => {
    const response = await api.patch(
      `/message/clearchat/${activeuser?._id}/${receiverId}`
    );

    console.log("response of clearchat", response);
    fetchMessages();
  };

  const handleDeleteConversation = async (receiverId: string) => {
    const response = await api.delete(
      `/message/deleteconversation/${activeuser?._id}/${receiverId}`
    );

    console.log("response of handleDeleteConversation", response);
    fetchAllConversation();
    setActiveTab("focused");
  };
  return (
    <>
      <div
        id="hs-sidebar-empty-content"
        className="hs-overlay z-50 [--auto-close:lg] border lg:block lg:translate-x-0 lg:start-auto lg:bottom-0   
hs-overlay-open:translate-x-0
translate-x-full transition-all duration-300 transform 
rounded-lg
  overflow-y-auto max-h-screen scroll-smooth scrollbar-hidden
bg-white border-s border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 w-[270px]"
        role="dialog"
        aria-label="Sidebar"
      >
        <div className="flex h-screen">
          {!selectedUser && (
            <aside className="w-full  border-r overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center w-full border-b border-gray-400">
                  <div className="flex items-center space-x-2 mb-4 ">
                    <Image
                      src={activeuser?.profileImage || ""}
                      alt="user"
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                    <h2 className="text-sm font-semibold">Messaging</h2>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <button
                        onClick={handleFilterDropdown}
                        className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-1"
                      >
                        <HiOutlineAdjustmentsHorizontal className="text-xl text-gray-600" />
                      </button>

                      {filterDropdown && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-50">
                          <ul className="flex flex-col">
                            <li>
                              <button
                                onClick={() => setActiveTab("other")}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-semibold"
                              >
                                My Connections
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={handleStarred}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-semibold"
                              >
                                Starred
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <RiArrowDropDownLine className="text-3xl" />
                  </div>
                </div>
                <br></br>

                {/* <div className="w-full relative">
                  <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 " />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  />
                </div> */}

                <div className="flex justify-center space-x-4">
                  <button
                    className={`px-4 py-2 text-sm font-semibold transition-all ${
                      activeTab === "focused"
                        ? "border-b-2 border-primary text-primary"
                        : "border-b border-gray-700 text-gray-700"
                    }`}
                    onClick={() => setActiveTab("focused")}
                  >
                    Focused
                  </button>

                  <button
                    className={`px-4 py-2 text-sm font-semibold transition-all ${
                      activeTab === "other"
                        ? "border-b-2 border-primary text-primary"
                        : "border-b border-gray-700 text-gray-700"
                    }`}
                    onClick={() => setActiveTab("other")}
                  >
                    Other
                  </button>
                </div>

                <div className="space-y-4 mt-4">
                  {activeTab === "starred" ? (
                    starred?.length > 0 ? (
                      starred.map((user, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                            selectedUser === user
                              ? "bg-blue-100"
                              : "bg-white hover:bg-gray-200"
                          }`}
                          onClick={() => handleUserSelect(user)}
                        >
                          <div className="flex items-center">
                            <img
                              src={user?.profileImage}
                              alt="User"
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-3">
                              <h2 className="text-sm font-semibold">
                                {user.firstName}
                              </h2>
                              <p className="text-sm text-gray-400">
                                {user.jobTitle?.[0]}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center">
                        No Starred Users
                      </p>
                    )
                  ) : activeTab === "other" ? (
                    other.map((chat, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                          selectedUser === chat
                            ? "bg-blue-100"
                            : "bg-white hover:bg-gray-200"
                        }`}
                        onClick={() => handleUserSelect(chat)}
                      >
                        <div className="flex items-center">
                          <img
                            src={chat.connectionID?.profileImage}
                            alt="User"
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="ml-3">
                            <h2 className="text-sm font-semibold">
                              {chat.connectionID?.firstName}
                            </h2>
                            <p className="text-sm text-gray-400">
                              {chat.connectionID?.jobTitle[0]}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      {focused.map((item) => {
                        const formattedDate = new Date(
                          item.lastMessage.timestamp
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                        });

                        return (
                          <div
                            key={item.user?._id}
                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition  ${
                              selectedUser === item.user
                                ? "bg-blue-100"
                                : "bg-white hover:bg-gray-200"
                            }`}
                            onClick={() => handleUserSelect(item.user)}
                          >
                            <div className="flex items-center">
                              <img
                                src={item.user?.profileImage}
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div className="ml-3 ">
                                <h2 className="text-sm font-semibold">
                                  {item.user?.firstName}
                                </h2>

                                <p className="text-sm text-gray-600">
                                  {item.lastMessage?.message && (
                                    <>
                                      <span className="font-medium">
                                        {item.lastMessage?.sender ===
                                        activeuser?._id
                                          ? "You: "
                                          : item.user?.firstName + ": "}
                                      </span>
                                      {item.lastMessage?.message}
                                    </>
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="ml-auto text-xs text-gray-500 text-end flex flex-col items-end">
                              {item.lastMessage?.message && (
                                <span>{formattedDate}</span>
                              )}

                              {item.unreadCount > 0 &&
                                item.lastMessage.sender !== activeuser?._id &&
                                !item.lastMessage.seen && (
                                  <div className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-[10px]">
                                    {item.unreadCount}
                                  </div>
                                )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </aside>
          )}

          {selectedUser && (
            <main className="w-full flex flex-col h-full bg-white">
              {selectedUser ? (
                <>
                  <header className="flex items-center justify-between bg-gray-50 p-4 border-b">
                    <div className="flex items-center">
                      <IoMdArrowBack
                        onClick={() => setSelectedUser(null)}
                        className="text-xl"
                      />
                      <img
                        src={
                          selectedUser?.connectionID?.profileImage ||
                          selectedUser?.profileImage
                        }
                        className="w-10 h-10 rounded-full"
                        alt="User"
                      />
                      <div className="ml-3">
                        <h2 className="font-medium">
                          {selectedUser?.connectionID?.firstName ||
                            selectedUser?.firstName}
                        </h2>
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        onClick={(event) =>
                          handleDropdown(
                            event,
                            selectedUser?.connectionID?._id || selectedUser?._id
                          )
                        }
                      >
                        <BsThreeDots className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                      </button>

                      {(Dropdown === selectedUser?.connectionID?._id ||
                        Dropdown === selectedUser?._id) &&
                        selectedUser?._id && (
                          <div className="absolute top-full right-0 mt-1 w-40 bg-white shadow-lg rounded-lg border z-50">
                            <ul className="flex flex-col">
                              {conversation?.isStarredUsers
                                ?.map((id) => id.toString())
                                .includes(
                                  selectedUser?._id ||
                                    selectedUser?.connectionID?._id
                                ) ? (
                                <li>
                                  <button
                                    onClick={() =>
                                      handleStar(
                                        selectedUser?.connectionID?._id ||
                                          selectedUser?._id,
                                        "removestar"
                                      )
                                    }
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-semibold"
                                  >
                                    Remove star
                                  </button>
                                </li>
                              ) : (
                                <li>
                                  <button
                                    onClick={() =>
                                      handleStar(
                                        selectedUser?.connectionID?._id ||
                                          selectedUser?._id,
                                        "star"
                                      )
                                    }
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-semibold"
                                  >
                                    Star
                                  </button>
                                </li>
                              )}

                              {conversation?.isBlockedUsers
                                ?.map((id) => id.toString())
                                .includes(
                                  activeuser?._id || selectedUser?._id
                                ) ? (
                                <li>
                                  <button
                                    onClick={() =>
                                      handleBlock(
                                        selectedUser?.connectionID?._id ||
                                          selectedUser?._id,
                                        "unblock"
                                      )
                                    }
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-semibold"
                                  >
                                    UnBlock
                                  </button>
                                </li>
                              ) : (
                                <li>
                                  <button
                                    onClick={() =>
                                      handleBlock(
                                        selectedUser?.connectionID?._id ||
                                          selectedUser?._id,
                                        "block"
                                      )
                                    }
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-semibold"
                                  >
                                    Block
                                  </button>
                                </li>
                              )}

                              <li>
                                <button
                                  onClick={() =>
                                    handleDeleteConversation(
                                      selectedUser?.connectionID?._id ||
                                        selectedUser?._id
                                    )
                                  }
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-semibold"
                                >
                                  Delete conversation
                                </button>
                              </li>

                              <li>
                                <button
                                  onClick={() =>
                                    handleClearChat(
                                      selectedUser?.connectionID?._id ||
                                        selectedUser?._id
                                    )
                                  }
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-semibold"
                                >
                                  Clear chat
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                    </div>
                  </header>

                  <div className="flex-grow p-4 overflow-y-auto">
                    {messages.map((msg, index) => {
                      const showProfile =
                        index === 0 ||
                        messages[index - 1].sender !== msg.sender;

                      return (
                        <div
                          key={index}
                          className={`w-max grid ${
                            msg.sender === activeuser?._id ? "ml-auto" : ""
                          }`}
                        >
                          {showProfile && (
                            <div className="flex items-center space-x-1">
                              <img
                                src={`${
                                  msg.sender === activeuser?._id
                                    ? activeuser?.profileImage
                                    : selectedUser?.connectionID?.profileImage
                                    ? selectedUser?.connectionID?.profileImage
                                    : selectedUser?.profileImage
                                }`}
                                className="w-8 h-8 rounded-full"
                              />
                              <p className="text-sm font-semibold">
                                {msg.sender === activeuser?._id
                                  ? "You"
                                  : selectedUser?.connectionID?.firstName
                                  ? selectedUser?.connectionID?.firstName
                                  : selectedUser?.firstName}
                              </p>
                            </div>
                          )}

                          <div
                            className={`px-3.5 py-1 rounded-md mb-2 flex flex-col ${
                              msg.sender === activeuser?._id
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <h5 className="text-sm font-normal leading-snug">
                              {msg.message}
                            </h5>

                            <h6 className="text-gray-300 text-xs font-light self-end mt-1">
                              {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </h6>
                          </div>
                        </div>
                      );
                    })}
                    <>
                      <p>
                        {conversation?.isBlockedUsers?.map((item) =>
                          item == activeuser._id
                            ? "you blocked this user"
                            : "you are blocked by this user"
                        )}
                      </p>
                    </>
                  </div>

                  <footer className="p-4   flex items-center">
                    <div className="w-full pl-3 pr-1 py-1 flex items-center gap-2 justify-between">
                      <div className="relative flex flex-col w-full">
                        <div className="relative flex items-center bg-white px-3 py-2 rounded-full border border-gray-300 w-full gap-2">
                          <button
                            type="button"
                            className="p-2 rounded-full"
                            onClick={() => setShowPicker((prev) => !prev)}
                          >
                            <span className="text-gray-500 cursor-pointer hover:text-gray-700">
                              <FontAwesomeIcon icon={faSmile} />
                            </span>
                          </button>

                          <div className="flex-grow">
                            <input
                              className="w-full text-black text-xs font-medium leading-4 focus:outline-none px-2"
                              placeholder="Type here..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                          </div>

                          <div className="flex items-center ">
                            <button
                              className="flex items-center px-2 py-2 bg-primary rounded-full shadow text-white text-xs font-semibold"
                              onClick={handleSendMessage}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z"
                                  stroke="white"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                />
                              </svg>
                            
                            </button>
                          </div>
                        </div>

                        {showPicker && (
                          <div
                            className="absolute bottom-full  left-0 mb-2 bg-white shadow-lg rounded-lg p-1 z-50 ml-[-15]"
                            style={{ width: "250px", height: "300px" }}
                          >
                            <EmojiPicker
                              onEmojiClick={handleEmojiClick}
                              height={280}
                              width={240}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </footer>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select a user to start chatting
                </div>
              )}
            </main>
          )}
        </div>
      </div>
    </>
  );
}
