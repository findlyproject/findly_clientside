
import { Plus } from "lucide-react";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import CreatePost from "./CreatePost";

export const AddPost=()=> {
  const [open,setOpen]=useState(false)
  return (
   
  <>
   <button title="To create a post" className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-violet-900 transition z-50" onClick={()=>setOpen(!open)}>
      <Plus size={24} />
    </button>
    {open===true&&
    
          <section className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
          <CreatePost/>
          </OutsideClickHandler>
      
          </section>
          }</>
      
  );
}
