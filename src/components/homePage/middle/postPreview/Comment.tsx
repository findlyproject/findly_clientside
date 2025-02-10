"use client";
import {faSmile,faImage,faEllipsis,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IComment, IPost } from "@/lib/store/features/postSlice";
import {deleteAComment, updateAComment} from "@/lib/store/features/actions/commentActions"
import { addCommentonPost, fetchCommentById } from "@/lib/store/features/actions/commentActions";
import EmojiPicker from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react"; 
import { FormEvent } from "react";
dayjs.extend(relativeTime); //setting up the date 

interface CommentsProps {
  postId: string;
  comments: IComment[];
}

export const Comments = ({ postId, comments }: CommentsProps) => {

  const { activeuser } = useAppSelector((state) => state.login);

  const [isShowMenu, setIsShowMenu] = useState(false); // view the edit & delete menu bar
  const [commentData, setCommentData] = useState(""); // use for updating a comment
  const [newCommentData, setnewCommentData] = useState(""); // for adding a new  comment
  const [showPicker, setShowPicker] = useState(false); // toggle emoji picker
  const [edit, setEdit] = useState(false); //setting up a comment for editing
  const [openCommentId, setOpenCommentId] = useState(""); // setup a specific id of a comment 
  const [editingCommentId, setEditingCommentId] = useState(""); //get the id editing comment


  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  if (!comments) return <div className="text-center p-4">Loading...</div>;


  // adding a new comment by active user
  

  const handleSubmit = (postId: string) => {
    if (!newCommentData.trim()) return;
    dispatch(addCommentonPost({ postId, comment:newCommentData }));
    setnewCommentData("");
  };

  // emoji picker
  const handleEmojiClick = (emojiObject:EmojiClickData) => {
    if (edit) {
      setCommentData((prevComment) => prevComment + emojiObject.emoji);
    } else {
      setnewCommentData((prevComment) => prevComment + emojiObject.emoji);
    }
  };
  
  // setting up a comment for editing
  const editComment = (id:string) => {
    setEditingCommentId(id)
    setEdit(true) 
    getCommentById(id)
    
  };

  //getting the specific comment by id
  const getCommentById=(id:string)=>{
      dispatch(fetchCommentById(id)).unwrap()
      .then((fetchedComment) => {
        setCommentData(fetchedComment); 
      })
      .catch((error) => {
        console.error("Error fetching comment:", error);
      });
    }
  

  // Toggle Comment Menu
  const toggleMenu = (id:string) =>{ 
    setIsShowMenu((prev) => !prev)
    setOpenCommentId(id)
  };

  
 const handleSaveEdit = () => {
  if (!commentData.trim()) return;
    dispatch(updateAComment({commentId:editingCommentId,newComment:commentData }))
    setEdit(false)
   
  };
  //delete comment
  const deleteComment = async (commentid:string) => {
    dispatch(deleteAComment({commentId:commentid} ))
};

  return (
    <>
      <section className="mt-2">
        {/* Add Comment Form */}
        <form className="flex flex-col space-y-2 p-3 border rounded-lg shadow-sm bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10">
              <img
                src={
                  activeuser?.profileImage ||
                  "https://res.cloudinary.com/dq1auwpkm/image/upload/v1738735360/profile_jtwxaj.png"
                }
                alt="Profile"
                width={30}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex-grow flex items-center border rounded-lg px-3 py-2 space-x-2 bg-gray-100">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-grow bg-transparent focus:outline-none"
                onChange={(e) => setnewCommentData(e.target.value)}
                value={newCommentData}
              />
              <button
                type="button"
                className="p-2  rounded-full"
                onClick={() => setShowPicker((prev) => !prev)}
              >
                <span className="text-gray-500 cursor-pointer hover:text-gray-700">
                  <FontAwesomeIcon icon={faSmile} />
                </span>
                {showPicker && (
                  <div className="absolute z-10 w-[300px] sm:w-[250px] md:w-[350px] lg:w-[400px]  transform -translate-x-1/2">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </button>

              <span className="text-gray-500 cursor-pointer hover:text-gray-700">
                <FontAwesomeIcon icon={faImage} />
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              onClick={() => handleSubmit(postId)}
            >
              Post
            </button>
          </div>
        </form>

        {/* List Comments */}
        <section className="mt-3 space-y-4">
          {comments.slice()
           .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((comment) => (
            <div
              key={comment._id}
              className="p-3 border rounded-lg shadow-sm bg-white"
            >
            {edit && editingCommentId === comment._id ? (
                      // Edit Mode
                      <div >
                        <div className="relative flex border rounded-lg px-4 py-2">
                        <input
                    type="text"
                    name="comment"
                    value={commentData}
                    onChange={(e)=> setCommentData(e.target.value)}
                    className="w-full border-none focus:outline-none"
                  />
                  <button
                      type="button"
                      className="p-2  rounded-full"
                      onClick={() => setShowPicker((prev) => !prev)}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z" clipRule="evenodd" />
              </svg>

                    </button>

                  </div>
                        <div className="mt-2 flex gap-2">
                          <button
                            className="bg-green-500 text-white px-4 py-1 rounded-md"
                            onClick={handleSaveEdit}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-500 text-white px-4 py-1 rounded-md"
                            onClick={() =>{setEdit(false) ; setEditingCommentId("")}}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
              <div className="flex items-start space-x-3">
                {/* ✅ Commenter Profile */}
                <div className="w-10 h-10">
                  <img
                    src={
                      comment.user?.profileImage ||
                      "https://res.cloudinary.com/dq1auwpkm/image/upload/v1738735360/profile_jtwxaj.png"
                    }
                    alt="userprofile"
                    width={30}
                    height={30}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                {/* ✅ Comment Content */}
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {comment.user?.firstName} {comment.user?.lastName}
                      </h3>
                      {/* <p className="text-gray-500 text-sm">{comment.user.}</p> */}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {dayjs(comment.updatedAt).fromNow()}
                    </div>
                  </div>

                  <p className="text-gray-700 mt-1">{comment.comment}</p>

                  {/* Comment Actions */}
                  <div className="flex space-x-3 mt-2 text-gray-500 text-sm">
                    <button className="hover:underline">Like</button>
                    <button
                      // onClick={() => setIsShowReplyList((prev) => !prev)}
                      className="hover:underline"
                    >
                      {comment.replies?.length
                        ? `View Replies (${comment.replies.length})`
                        : "Reply"}
                    </button>
                    {comment?.user?._id === activeuser?._id && (
                    <button onClick={()=>toggleMenu(comment._id)} className="hover:underline">
                      <FontAwesomeIcon icon={faEllipsis} />
                      
                      {isShowMenu && openCommentId==comment._id && (
                <div className="absolute  bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="border-t border-gray-200">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => editComment(comment?._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => deleteComment(comment?._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              )}
                    </button>
                    )}
                    
                  </div>
                </div>
              </div>
                    )}

              {/* Reply Input */}
              {/* {isShowReplyList && (
                <div className="mt-2 pl-10">
                  <div className="flex items-center space-x-2">
                    <img
                      src={activeuser?.profileImage || "/default-profile.png"}
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Add a reply..."
                      value={replyText}
                      onChange={handleReplyChange}
                      className="border rounded-lg px-3 py-2 flex-grow focus:outline-none"
                    />
                    {replyText && (
                      <button
                        onClick={addReply}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                      >
                        Reply
                      </button>
                    )}
                  </div>
                </div>
              )} */}

       
              
            </div>
          ))}
        </section>
      </section>
    </>
  );
};
