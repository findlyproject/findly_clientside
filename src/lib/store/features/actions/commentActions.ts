import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import api from "../../../../utils/api"; 
import { addComment, findCommentReplay, IComment, removeDeletedReply, setComments,setCommentWithReplay,updateComment } from "../postSlice";
import handleAsync from "@/utils/handleAsync";

export interface CommentResponse {
  comment: IComment;
}

interface AddCommentArgs {
  postId: string;
  comment: string;
}

interface updateCommentArgs {
  commentId: string;
  newComment: string;
}



export const fetchAllComments = createAsyncThunk( 
  "post/fetchAllComments",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<{ comments: IComment[] }> = await api.get(
        "/post/allcomments"
      );
      if (!response.data || !response.data.comments) {
        return rejectWithValue("No posts found.");
      }
      dispatch(setComments(response.data.comments));
      return response.data.comments;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return rejectWithValue("Failed to fetch posts.");
    }
  }
);


export const addCommentonPost = createAsyncThunk(
  "post/addComment",
  async (
    { postId, comment }: AddCommentArgs,

    { dispatch, rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<CommentResponse> = await api.post(
        `/post/comment`,
        { postId, comment }
      );
      if (!response.data || !response.data.comment) {
        return rejectWithValue("Failed to add comment.");
      }
      dispatch(addComment({ postId, comment: response.data.comment }));
      return response.data.comment;
    } catch (error) {
      console.error("Error adding comment:", error);
      return rejectWithValue("Failed to add comment.");
    }
  }
);


export const fetchCommentById = createAsyncThunk(
  "post/fetchCommentById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<CommentResponse> = await api.get(
        `/post/viewcomment/${id}`
      );
      if (!response.data || !response.data.comment) {
        return rejectWithValue("No posts found.");
      }
      return response.data.comment;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return rejectWithValue("Failed to fetch posts.");
    }
  }
);


export const updateAComment = createAsyncThunk(
  "post/updateComment",
  async (
    { commentId, newComment }: updateCommentArgs,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<CommentResponse> = await api.put(
        `/post/edit-comment/${commentId}`,
        { newComment }
      );
      if (!response.data || !response.data.comment) {
        return rejectWithValue("No posts found.");
      }
      console.log(response.data.comment);
      const responses: AxiosResponse<{ comments: IComment[] }> = await api.get(
        "/post/allcomments"
      );
      dispatch(setComments(responses.data.comments));
      return response.data.comment;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return rejectWithValue("Failed to fetch posts.");
    }
  }
);

//delete a comment by the owner
export const deleteAComment = createAsyncThunk(
  "post/deleteAComment",
  async (
    { commentId }: { commentId: string },
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<CommentResponse> = await api.post(
        `/post/delete-comment/${commentId}`
      );
      if (!response.data || !response.data.comment) {
        return rejectWithValue("No posts found.");
      }
      console.log(response.data.comment);

      return response.data.comment;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return rejectWithValue("Failed to fetch posts.");
    }
  }
);



export const findReplies=createAsyncThunk(
  "get/findReplies",
  async (commentId:string, { dispatch, rejectWithValue }) => {
    
    console.log("dsflad");
    
    const response = await handleAsync<AxiosResponse>(() => api.get(`/post/user/findreply/${commentId}`));

console.log("response replaies",response)
    if (!response) {
      return rejectWithValue("subscription  failed")
    }
    const replies=response.data.replies
    console.log("repliesaaaaaaaaaaaaaaaaa",replies);
    
    const result = replies.filter((data: boolean) => !data.isDeleted);

    console.log("repliesactiongetttt ",result);
    
dispatch(findCommentReplay(result))
    console.log("response replaies",response);
    
   


  } 
)

export const postReplay=createAsyncThunk(
  "post/replay",
  async ({ postId, commentId, replyText }:{postId:string,commentId:string,replyText:string} ,{ dispatch, rejectWithValue }) => {
    
    console.log("dsflad");
    
    const response = await handleAsync<AxiosResponse>(() => api.post("/post/user/postreplay",{postId:postId,commentId:commentId,replyText:replyText}));

console.log("response replaies",response)
    if (!response) {
      return rejectWithValue("subscription  failed")
    }



  } 
)

export const deleteReplay=createAsyncThunk(
  "delete/replay",
  async ({ replayId, commentId }:{replayId:string,commentId:string} ,{ dispatch, rejectWithValue }) => {
    
    console.log("replayId",replayId);
    console.log("commentId",commentId);
    
   
    const response = await handleAsync<AxiosResponse>(() =>
      api.delete("/post/user/deletereplay", {
        data: { commentId, replayId }
      })
    );

console.log("delete replaies",response)
    if (!response) {
      return rejectWithValue("subscription  failed")
    }
     if(response.status===200){
      // const deletedReplyId = response.data._id;
      //   dispatch(removeDeletedReply(deletedReplyId))

     }
  } 
)




export const getcommentswithreplies=createAsyncThunk(
  "fetch/commentreplay",
  async (_,{ dispatch, rejectWithValue }) => {
    
    
    
   
    const response = await handleAsync<AxiosResponse>(() =>
      api.get("/post/user/getcommentswithreplies"));

console.log("getcommentswithreplies",response)
    if (!response) {
      return rejectWithValue("subscription  failed")
    }
    const comments=response.data.comments;
    console.log("comments",comments);
    
     if(response.status===200){
  dispatch(setCommentWithReplay(comments))
      
     }
  } 

  
)



export const updateReplay=createAsyncThunk(
  "updateReplay",
  async ({ replayedId, commentId,newReplyText}:{replayedId:string,commentId:string,newReplyText:string} ,{ dispatch, rejectWithValue }) => {
    
    
    
   
    const response = await handleAsync<AxiosResponse>(() => api.put("/post/user/editreplay",{commentId,replayedId,newReplyText}));

console.log("updateReplay",response)
    if (!response) {
      return rejectWithValue("subscription  failed")
    }
  
     if(response.status===200){

      
     }
  } 
)



