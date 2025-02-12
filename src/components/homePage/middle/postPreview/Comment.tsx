"use client";
import { faSmile, faEllipsis, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IComment } from "@/lib/store/features/postSlice";
import { deleteAComment, deleteReplay, findReplies, getcommentswithreplies, postReplay, updateAComment, updateReplay } from "@/lib/store/features/actions/commentActions"
import { addCommentonPost, fetchCommentById } from "@/lib/store/features/actions/commentActions";
import EmojiPicker from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import { fetchAllPosts } from "@/lib/store/features/actions/postActions";
import OutsideClickHandler from "react-outside-click-handler";
dayjs.extend(relativeTime);

interface CommentsProps {
  postId: string;
  comments: IComment[];
}

export const Comments = ({ postId, comments }: CommentsProps) => {
  console.log("commentsss", comments);

  const myComments = useAppSelector((state) => state.post.commentsReplay) || []
  console.log("myComments", myComments);


  useEffect(() => {
    display()
  }, [])

  const display = async () => {
    console.log("helloooooiioioi");

    const resultcometsreplay = await dispatch(getcommentswithreplies())
    console.log("resultcometsreplay", resultcometsreplay);
  }





  const { activeuser } = useAppSelector((state) => state.login);

  const [isShowMenu, setIsShowMenu] = useState(false); 
  const [commentData, setCommentData] = useState(""); 
  const [newCommentData, setnewCommentData] = useState(""); 
  const [showPicker, setShowPicker] = useState(false); 
  const [showPickerImogi, setShowPickerImogi] = useState(false); 

  const [edit, setEdit] = useState(false); 
  const [openCommentId, setOpenCommentId] = useState(""); 
  const [editingCommentId, setEditingCommentId] = useState("");
  const [isShowReplyList, setIsShowReplyList] = useState(false)
  const [replyText, setReplyText] = useState("");
  const [commentID, setCommentID] = useState<string | null>(null);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<string | null>(null);
  
  const [editReplyId, setEditReplyId] = useState<string | null>(null)
  const [editReplyText, setEditReplyText] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const replay = useAppSelector((state) => state.post.commentReplay)
  console.log("replay", replay);


  if (!comments) return <div className="text-center p-4">Loading...</div>;


  const handleListCommentReplays = async (commentId: string) => {
    console.log("comments id", commentId);
    const result = await dispatch(findReplies(commentId))
    console.log("result", result);
    if (result.type === "get/findReplies/fulfilled") {
      setIsShowReplyList((prev) => !prev);
      setCommentID(commentId)
    }

  }
  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(e.target.value);
  };

  const handleSubmit = (postId: string) => {
    if (!newCommentData.trim()) return;
    dispatch(addCommentonPost({ postId, comment: newCommentData }));
    setnewCommentData("");
  };


  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    if (edit) {
      setCommentData((prevComment) => prevComment + emojiObject.emoji);
     
    } else {
      setnewCommentData((prevComment) => prevComment + emojiObject.emoji);
    }
  };

  
  const handleEmojiClickReplay = (emojiObject: EmojiClickData) => {
    if (edit) {
   
      setEditReplyText((prevReplay)=>prevReplay+emojiObject.emoji)
    } else {
      setReplyText((prevReplay)=>prevReplay+emojiObject.emoji)
    }
  };



  const editComment = (id: string) => {
    setEditingCommentId(id)
    setEdit(true)
    getCommentById(id)

  };

  const handleEditReply = (replyId: string, currentText: string) => {
    setEditReplyId(replyId);
    setEditReplyText(currentText);
    setEdit(true)
  };
  const handleUpdateReply = async (replayedId: string, commentId: string) => {


    const resultUpdate = await dispatch(updateReplay({ replayedId, commentId, newReplyText: editReplyText }))
    console.log("ress update", resultUpdate);
    if (resultUpdate.type === "updateReplay/fulfilled") {
      console.log("kadskasdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");

      setIsOptionsMenuOpen(null)
      const result = await dispatch(findReplies(commentId))
      console.log("result", result);
      setEdit(false)
    }

    setEditReplyId(null);
  };

  //getting the specific comment by id
  const getCommentById = (id: string) => {
    dispatch(fetchCommentById(id)).unwrap()
      .then((fetchedComment) => {
        setCommentData(fetchedComment);
      })
      .catch((error) => {
        console.error("Error fetching comment:", error);
      });
  }


  // Toggle Comment Menu
  const toggleMenu = (id: string) => {
    setIsShowMenu((prev) => !prev)
    setOpenCommentId(id)
  };


  const handleSaveEdit = () => {
    if (!commentData.trim()) return;
    dispatch(updateAComment({ commentId: editingCommentId, newComment: commentData }))
    setEdit(false)
    dispatch(fetchAllPosts())


  };
  //delete comment
  const deleteComment = async (commentid: string) => {
    dispatch(deleteAComment({ commentId: commentid }))
    dispatch(fetchAllPosts())
  };



  const addReply = async (commentId: string) => {
    if (!replyText.trim()) {
      alert("Reply text is required");
      return;
    }
    setShowPickerImogi(false)


    try {


      const resultPostReplies = await dispatch(postReplay({ postId, commentId, replyText }))

      console.log("resultPostReplies", resultPostReplies);


      if (resultPostReplies.type === "post/replay/fulfilled") {

        setReplyText("");

        const result = await dispatch(findReplies(commentId))
        console.log("result", result);
        getCommentById(commentId)

      } else {
        console.log("error");

      }
    } catch (error) {
      console.error("Error posting reply:", error);
      alert("An error occurred while posting the reply");
    }
  };

  const toggleOptionsMenu = (replyId: string) => {
    setIsOptionsMenuOpen(prevState => (prevState === replyId ? null : replyId));
  };
  const handleDeleteReply = async (replayId: string, commentId: string) => {
    console.log("commentIddddddd", commentId);

    const resultDelete = await dispatch(deleteReplay({ commentId, replayId }));
    console.log("result delete", resultDelete);
    if (resultDelete.type === 'delete/replay/fulfilled') {
      console.log("hey worked");

      const result = await dispatch(findReplies(commentId))
      console.log("result", result);


    }

  }
  return (
    <>
      <section className="mt-2">
        {/* Add Comment Form */}
        <form className="flex flex-col space-y-2 p-3 border rounded-lg shadow-sm bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10">
              <Image
                src={
                  activeuser?.profileImage ||
                  "https://res.cloudinary.com/dq1auwpkm/image/upload/v1738735360/profile_jtwxaj.png"
                }
                alt="Profile"
                width={30}
                height={30}
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
              </button>
              {showPicker && (

              <OutsideClickHandler onOutsideClick={()=>setShowPicker(false)}>

                  <div className="absolute z-10 w-[300px] sm:w-[250px] md:w-[350px] lg:w-[400px]  transform -translate-x-1/2">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                  </OutsideClickHandler>
                )}


              
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
                        onChange={(e) => setCommentData(e.target.value)}
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
                        onClick={() => { setEdit(false); setEditingCommentId(""); }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-3">
                    {/* ✅ Commenter Profile */}
                    <div className="w-10 h-10">
                      <Image
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
                          onClick={() => handleListCommentReplays(comment._id)}
                          className="hover:underline"
                        >
                          {myComments.find((c) => c._id === comment._id)?.replies?.length
                            ? `View Replies [${myComments.find((c) => c._id === comment._id)?.replies.length}]`
                            : "Reply"}
                        </button>
                        {comment?.user?._id === activeuser?._id && (
                          <button onClick={() => toggleMenu(comment._id)} className="hover:underline">
                            <FontAwesomeIcon icon={faEllipsis} />

                            {isShowMenu && openCommentId == comment._id && (
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




                {isShowReplyList && commentID === comment._id && (
                  <div className="mt-2 pl-10">

                    <div className="flex items-center space-x-2">

                      <Image
                        src={activeuser?.profileImage || "/default-profile.png"}
                        alt="User"
                        height={30}
                        width={30}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="relative flex border rounded-lg px-4 py-2">
                        <input
                          ref={inputRef}
                          type="text"
                          placeholder="Add a reply..."
                          value={replyText}
                          onChange={handleReplyChange}
                          className=" px-3 py-2 flex-grow focus:outline-none"
                        />

                        {showPickerImogi && commentID === comment._id&&(
              <OutsideClickHandler onOutsideClick={()=>setShowPickerImogi(false)}>
                          <div className="absolute z-10 w-[300px] sm:w-[250px] md:w-[350px] lg:w-[400px] left-80 top-40  transform -translate-x-1/2">
                            <EmojiPicker onEmojiClick={handleEmojiClickReplay} />
                          </div>
                          </OutsideClickHandler>
                        )}


                        <button
                          type="button"
                          className="p-2  rounded-full"
                          onClick={() => setShowPickerImogi((prev) => !prev)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z" clipRule="evenodd" />
                          </svg>

                        </button>
                      </div>
                      {replyText && (
                        <button
                          onClick={() => addReply(comment._id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                        >
                          Reply
                        </button>
                      )}

                    </div>

                    {replay.length > 0 && (
                      <div className="mt-4 pl-6 border-l-2 border-gray-300">


                        {replay.map((r) => (
                          <div key={r._id} className="flex flex-col space-y-2">
                            {editReplyId === r._id ? (
                              <div className="flex items-center space-x-2 pl-8">
                                 <div className="relative flex border rounded-lg px-4 py-2">
                                <input
                                  type="text"
                                  value={editReplyText}
                                  onChange={(e) => setEditReplyText(e.target.value)}
                                  className=" px-2 py-1 rounded-lg w-full"
                                />
                                 <button
                          type="button"
                          className="p-2  rounded-full"
                          onClick={() => setShowPickerImogi((prev) => !prev)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z" clipRule="evenodd" />
                          </svg>

                        </button>
                        </div>
                                <button
                                  onClick={() => handleUpdateReply(r._id, comment._id)}
                                  className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => { setEditReplyId(null); setIsOptionsMenuOpen(null); }}
                                  className="bg-gray-400 text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-500"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex justify-between p-2">
                                <p className="text-gray-700 pl-8 ">{r.reply}</p>
                                <div className="flex flex-col items-end ">

                                  <div className=" flex justify-between ">
                                    <button
                                      className="text-gray-500 hover:text-gray-700   text-xl"
                                      onClick={() => toggleOptionsMenu(r._id)}
                                    >
                                      <BsThreeDots />
                                    </button>



                                    {isOptionsMenuOpen === r._id && (
                                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-lg shadow-md">
                                        <button onClick={() => handleEditReply(r._id, r.reply)} className="block w-full text-gray-700 text-sm py-2 px-4 hover:bg-gray-100">
                                          Edit
                                        </button>
                                        <button
                                          onClick={() => handleDeleteReply(r._id, comment._id)}
                                          className="block w-full text-red-500 text-sm py-2 px-4 hover:bg-gray-100"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <span className="text-gray-500 text-xs">

                                      {dayjs(r.updatedAt).fromNow()}
                                    </span>
                                  </div>
                                </div>
                              </div>

                            )}

                          </div>
                        ))}



                      </div>
                    )}


                  </div>
                )}




              </div>
            ))}
        </section>
      </section>
    </>
  );
};