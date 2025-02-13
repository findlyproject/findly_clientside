"use client";
import Image from "next/image";
import user from "../../../public/assets/user-06.webp";
import Link from "next/link";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const handleAdminLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const response = await api.post("/admin/logout");

    if (response.status >= 200 && response.status < 300) {
      alert("Admin Logout successful");
      router.push("/"); // ✅ Redirect after logout
    } else {
      throw new Error(response.data?.message || "An error occurred");
    }
  };
  return (
    <div className="xl:p-4 p-2 flex-col justify-start items-start gap-5 inline-flex ">
      <div className="w-full pt-4 justify-between items-center gap-2.5 inline-flex">
        <Link href="">
          <Image src={user} alt="Pagedone logo image" className="w-2 h-2" />
        </Link>
      </div>

      <div className="w-full">
        <div className="w-full h-8 px-3 items-center flex">
          <h6 className="text-gray-500 text-xs font-semibold leading-4 hidden lg:block">
            MENU
          </h6>
        </div>
        <ul className="flex-col gap-1 flex">
          <li>
            <Link href="/admin/dashboard">
              <div className="flex-col flex p-3 bg-white rounded-lg">
                <div className="h-5 gap-3 flex">
                  <div className="relative" title="home">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g id="category 02">
                        <g id="icon">
                          <path
                            d="M2.5 5.41667C2.5 3.80584 3.80584 2.5 5.41667 2.5C7.0275 2.5 8.33333 3.80584 8.33333 5.41667C8.33333 7.0275 7.0275 8.33333 5.41667 8.33333C3.80584 8.33333 2.5 7.0275 2.5 5.41667Z"
                            stroke="#6B7280"
                            strokeWidth="1.6"
                          />
                          <path
                            d="M11.6667 5.41667C11.6667 4.24628 11.6667 3.66109 11.9476 3.24072C12.0691 3.05873 12.2254 2.90248 12.4074 2.78088C12.8278 2.5 13.4129 2.5 14.5833 2.5C15.7537 2.5 16.3389 2.5 16.7593 2.78088C16.9413 2.90248 17.0975 3.05873 17.2191 3.24072C17.5 3.66109 17.5 4.24628 17.5 5.41667C17.5 6.58705 17.5 7.17224 17.2191 7.59262C17.0975 7.7746 16.9413 7.93085 16.7593 8.05245C16.3389 8.33333 15.7537 8.33333 14.5833 8.33333C13.4129 8.33333 12.8278 8.33333 12.4074 8.05245C12.2254 7.93085 12.0691 7.7746 11.9476 7.59262C11.6667 7.17224 11.6667 6.58705 11.6667 5.41667Z"
                            stroke="#6B7280"
                            strokeWidth="1.6"
                          />
                          <path
                            d="M11.6667 14.5833C11.6667 12.9725 12.9725 11.6667 14.5833 11.6667C16.1942 11.6667 17.5 12.9725 17.5 14.5833C17.5 16.1942 16.1942 17.5 14.5833 17.5C12.9725 17.5 11.6667 16.1942 11.6667 14.5833Z"
                            stroke="#6B7280"
                            strokeWidth="1.6"
                          />
                          <path
                            d="M2.5 14.5833C2.5 13.4129 2.5 12.8278 2.78088 12.4074C2.90248 12.2254 3.05873 12.0691 3.24072 11.9476C3.66109 11.6667 4.24628 11.6667 5.41667 11.6667C6.58705 11.6667 7.17224 11.6667 7.59262 11.9476C7.7746 12.0691 7.93085 12.2254 8.05245 12.4074C8.33333 12.8278 8.33333 13.4129 8.33333 14.5833C8.33333 15.7537 8.33333 16.3389 8.05245 16.7593C7.93085 16.9413 7.7746 17.0975 7.59262 17.2191C7.17224 17.5 6.58705 17.5 5.41667 17.5C4.24628 17.5 3.66109 17.5 3.24072 17.2191C3.05873 17.0975 2.90248 16.9413 2.78088 16.7593C2.5 16.3389 2.5 15.7537 2.5 14.5833Z"
                            stroke="#6B7280"
                            strokeWidth="1.6"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h2 className="text-gray-500 text-sm font-medium leading-snug hidden lg:block">
                    Home
                  </h2>
                </div>
              </div>
            </Link>
          </li>
          <li></li>
          <li>
            <div className="flex-col flex">
              <div className="flex-col flex p-3 bg-white rounded-lg">
                <div className="justify-between inline-flex">
                  <Link href="/admin/reports" className="h-5 gap-3 flex">
                    <div className="relative" title="Reports">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#6B7280"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                        />
                      </svg>
                    </div>
                    <h2 className="text-gray-500 text-sm font-medium leading-snug hidden lg:block">
                      Reports
                    </h2>
                  </Link>
                  <Link
                    href=""
                    className="lg:flex items-center gap-3 hidden "
                  >
                    <div className="px-2.5 py-0.5 bg-indigo-100 rounded-3xl">
                      <h6 className="text-indigo-600 text-xs font-medium leading-4">
                        12
                      </h6>
                    </div>
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <g id="Right arrow 4">
                          <path
                            id="icon"
                            d="M6.00236 3.99719L10.0025 7.99736L6 11.9999"
                            stroke="#6B7280"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </li>
          <li>
            <Link href="/admin/users">
              <div className="flex-col gap-1 flex">
                <div className="flex-col flex bg-white rounded-lg p-3">
                  <div className="h-5 gap-3 flex">
                    <div className="relative" title="Users">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#6B7280"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-gray-500 text-sm font-medium leading-snug hidden lg:block">
                      Users
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/posts">
              <div className="flex-col gap-1 flex">
                <div className="flex-col flex bg-white rounded-lg p-3">
                  <div className="h-5 gap-3 flex">
                    <div className="relative" title="Posts">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#6B7280"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                        />
                      </svg>
                    </div>
                    <h2 className="text-gray-500 text-sm font-medium leading-snug hidden lg:block">
                      Posts
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <div className="w-full flex-col flex">
        <div className="h-8 px-3 items-center inline-flex">
          <h6 className="text-gray-500 text-xs font-semibold leading-4 hidden lg:block">
            SETTINGS
          </h6>
        </div>
        <ul className="flex-col gap-1 flex">
          <li>
            <Link href="">
              <div className="p-3 rounded-lg items-center inline-flex">
                <div className="h-5 items-center gap-3 flex">
                  <div className="relative" title="Profile">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g id="User Circle">
                        <path
                          id="icon"
                          d="M5.5 16C5.5 13.9289 7.51472 12.25 10 12.25C12.4853 12.25 14.5 13.9289 14.5 16M12.25 7.75C12.25 8.99264 11.2426 10 10 10C8.75736 10 7.75 8.99264 7.75 7.75C7.75 6.50736 8.75736 5.5 10 5.5C11.2426 5.5 12.25 6.50736 12.25 7.75ZM17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                          stroke="#6B7280"
                          strokeWidth="1.6"
                        />
                      </g>
                    </svg>
                  </div>
                  <h2 className="text-gray-500 text-sm font-medium leading-snug hidden lg:block">
                    Profile
                  </h2>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link href="">
              <div className="p-3 rounded-lg items-center inline-flex">
                <div className="h-5 items-center gap-3 flex">
                  <div className="relative" title="Settings">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g id="Help circle">
                        <path
                          id="icon"
                          d="M6.89302 7.67903C6.89302 8.12086 7.2512 8.47903 7.69302 8.47903C8.13485 8.47903 8.49302 8.12086 8.49302 7.67903H6.89302ZM9.41044 11.9928C9.41044 12.4346 9.76861 12.7928 10.2104 12.7928C10.6523 12.7928 11.0104 12.4346 11.0104 11.9928H9.41044ZM9.97915 13.7854C9.53732 13.7854 9.17915 14.1436 9.17915 14.5854C9.17915 15.0273 9.53732 15.3854 9.97915 15.3854V13.7854ZM10.0208 15.3854C10.4626 15.3854 10.8208 15.0273 10.8208 14.5854C10.8208 14.1436 10.4626 13.7854 10.0208 13.7854V15.3854ZM16.7 10C16.7 13.7003 13.7003 16.7 10 16.7V18.3C14.584 18.3 18.3 14.584 18.3 10H16.7ZM10 16.7C6.29969 16.7 3.3 13.7003 3.3 10H1.7C1.7 14.584 5.41604 18.3 10 18.3V16.7ZM3.3 10C3.3 6.29969 6.29969 3.3 10 3.3V1.7C5.41604 1.7 1.7 5.41604 1.7 10H3.3ZM10 3.3C13.7003 3.3 16.7 6.29969 16.7 10H18.3C18.3 5.41604 14.584 1.7 10 1.7V3.3ZM8.49302 7.67903C8.49302 7.14654 8.68796 6.80331 8.93991 6.58348C9.20767 6.34985 9.58974 6.21456 10 6.21456C10.4103 6.21456 10.7923 6.34985 11.0601 6.58348C11.312 6.80331 11.507 7.14654 11.507 7.67903H13.107C13.107 6.70187 12.7252 5.91287 12.112 5.37787C11.5146 4.85667 10.7432 4.61456 10 4.61456C9.25677 4.61456 8.48535 4.85667 7.888 5.37787C7.27483 5.91287 6.89302 6.70187 6.89302 7.67903H8.49302ZM11.507 7.67903C11.507 8.07278 11.4159 8.2976 11.308 8.46417C11.1782 8.66443 11.0054 8.81873 10.7151 9.08755C10.4468 9.33601 10.1005 9.6662 9.83713 10.1449C9.56679 10.6362 9.41044 11.2306 9.41044 11.9928H11.0104C11.0104 11.4613 11.1162 11.1393 11.2389 10.9162C11.3686 10.6805 11.5464 10.4984 11.8023 10.2614C12.0362 10.0449 12.3874 9.74064 12.6508 9.33412C12.936 8.89392 13.107 8.36372 13.107 7.67903H11.507ZM9.97915 15.3854H10.0208V13.7854H9.97915V15.3854Z"
                          fill="#6B7280"
                        />
                      </g>
                    </svg>
                  </div>
                  <h2 className="text-gray-500 text-sm font-medium leading-snug hidden lg:block">
                    Settings
                  </h2>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <button  onClick={handleAdminLogout}>
              <div className="p-3 rounded-lg items-center inline-flex">
                <div className="h-5 items-center gap-3 flex">
                  <div className="relative" title="Logout">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g id="Logout">
                        <path
                          id="icon"
                          d="M9.16667 17.5L5.83333 17.5V17.5C3.98765 17.5 2.5 16.0123 2.5 14.1667V14.1667L2.5 5.83333V5.83333C2.5 3.98765 3.98765 2.5 5.83333 2.5V2.5L9.16667 2.5M8.22814 10L17.117 10M14.3393 6.66667L17.0833 9.41074C17.3611 9.68852 17.5 9.82741 17.5 10C17.5 10.1726 17.3611 10.3115 17.0833 10.5893L14.3393 13.3333"
                          stroke="#6B7280"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                  </div>
                  <h2 className="text-gray-500 text-sm font-medium leading-snug hidden lg:block">
                    Logout
                  </h2>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
