import { Plus } from "lucide-react";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import CreatePost from "./CreatePost";
import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";

export const AddPost = () => {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
const router=useRouter()

  const { activeCompany } = useAppSelector((state) => state.companyLogin);
  console.log(activeCompany);
  return (
    <>
      {activeCompany ? (
        <>
          <button
            title="To create a post"
            className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-violet-900  transition-transform duration-300 ease-in-out transform hover:scale-110 z-50"
            onClick={() => setMenu((menu) => !menu)}
          >
            <Plus size={24} />
          </button>
          {menu && (
  <div className=" size-36 rounded-full  fixed bottom-1 right-1 flex items-center justify-center ">

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-8 p-1 bg-white shadow-xl rounded-full absolute top-4 left-2/4 "
      onClick={()=>setOpen(true)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>


    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-8 p-1 bg-white shadow-xl rounded-full absolute bottom-16 left-1/4 "
      onClick={()=>router.push("")}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
      />
    </svg>
  </div>
)}

        </>
      ) : (
        <>
          <button
            title="To create a post"
            className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-violet-900 transition z-50"
            onClick={() => setOpen((open) => !open)}
          >
            <Plus size={24} />
          </button>
        </>
      )}

      {open === true && (
        <section className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
            <CreatePost />
          </OutsideClickHandler>
        </section>
      )}
       


      
    </>
  );
};
