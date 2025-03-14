import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import api from "../../../../utils/api"; 
import {  addComment, deleteComment, findCommentReplay, setComments,setCommentWithReplay, updateComment } from "../postSlice";
import handleAsync from "@/utils/handleAsync";
import { IComment, IReply } from "@/types/Types";

export interface CommentResponse {
  comment: IComment;
}

interface AddCommentArgs {
  postId: string;
  comment: string;
  routes:string;
}

interface updateCommentArgs {
  postId:string
  commentId: string;
  newComment: string;
  routes:string;
}
interface replayResponse{
  replies:IReply[]
}



export const fetchAllComments = createAsyncThunk( 
  "post/fetchAllComments",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<{ comments: IComment[] }> = await api.get(
        "user/allcomments"
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
    { postId, comment,routes }: AddCommentArgs,

    { dispatch,rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<CommentResponse> = await api.post(
        `/${routes}/comment`,
        { postId, comment }
      );
      if (!response.data || !response.data.comment) {
        return rejectWithValue("Failed to add comment.");
      }
      dispatch(addComment({postId:postId,comment:response.data.comment}))
      return response.data.comment;
    } catch (error) {
      console.error("Error adding comment:", error);
      return rejectWithValue("Failed to add comment.");
    }
  }
);


export const fetchCommentById = createAsyncThunk(
  "post/fetchCommentById",
  async ({ id, routes }: { id: string; routes: string }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<CommentResponse> = await api.get(
        `/${routes}/viewcomment/${id}`
      );
      if (!response.data || !response.data.comment) {
        return rejectWithValue("No posts found.");
      }
      console.log(response.data.comment)
      return response.data.comment.comment;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return rejectWithValue("Failed to fetch posts.");
    }
  }
);


export const updateAComment = createAsyncThunk(
  "post/updateComment",
  async (
    { postId,commentId, newComment,routes }: updateCommentArgs,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<CommentResponse> = await api.put(
        `/${routes}/edit-comment/${commentId}`,
        { newComment }
      );
      if (!response.data || !response.data.comment) {
        return rejectWithValue("No posts found.");
      }
      console.log(response.data.comment);
      
      dispatch(updateComment({postId,commentId, updatedComment: response.data.comment} ));
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
    { postId,commentId,routes }: { postId:string,commentId: string ,routes:string},
    {dispatch, rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<CommentResponse> = await api.post(
        `/${routes}/delete-comment/${commentId}`
      );
      if (!response.data || !response.data.comment) {
        return rejectWithValue("No posts found.");
      }
      
      dispatch(deleteComment({postId,commentId:response.data.comment._id}));
      return response.data.comment;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return rejectWithValue("Failed to fetch posts.");
    }
  }
);



export const findReplies=createAsyncThunk(
  "get/findReplies",
  async ({ commentId,routes }: { commentId: string ,routes:string}, { dispatch, rejectWithValue }) => {
    const response = await handleAsync<AxiosResponse<replayResponse>>(() => api.get(`/${routes}/findreply/${commentId}`));
    if (!response) {
      return rejectWithValue("subscription  failed")
    }
    const replies=response.data.replies    
  
    const result = replies.filter((data) => !data.isDeleted); 
dispatch(findCommentReplay(result))
  } 
)

export const postReplay=createAsyncThunk(
  "post/replay",
  async ({ postId, commentId, replyText ,routes}:{postId:string,commentId:string,replyText:string,routes:string} ,{  rejectWithValue }) => {
    const response = await handleAsync<AxiosResponse>(() => api.post(`/${routes}/postreplay`,{postId:postId,commentId:commentId,replyText:replyText}));
    if (!response) {
      return rejectWithValue("subscription  failed")
    }
  } 
)

export const deleteReplay=createAsyncThunk(
  "delete/replay",
  async ({ replayId, commentId,routes }:{replayId:string,commentId:string,routes:string} ,{ rejectWithValue }) => {

    const response = await handleAsync<AxiosResponse>(() =>
      api.delete(`/${routes}/deletereplay`, {
        data: { commentId, replayId }
      })
    );
    if (!response) {
      return rejectWithValue("subscription  failed")
    }
  } 
)




export const getcommentswithreplies=createAsyncThunk(
  "fetch/commentreplay",
  async (routes:string,{ dispatch, rejectWithValue }) => {
    const response = await handleAsync<AxiosResponse>(() =>
      api.get(`/${routes}/getcommentswithreplies`));


    if (!response) {
      return rejectWithValue("subscription  failed")
    }
    const comments=response.data.comments;  
     if(response.status===200){
  dispatch(setCommentWithReplay(comments))
      
     }
  } 
)



export const updateReplay=createAsyncThunk(
  "updateReplay",
  async ({ replayedId, commentId,newReplyText,routes}:{replayedId:string,commentId:string,newReplyText:string,routes:string} ,{  rejectWithValue }) => {
    const response = await handleAsync<AxiosResponse>(() => api.put(`/${routes}/editreplay`,{commentId,replayedId,newReplyText}));
    if (!response) {
      return rejectWithValue("subscription  failed")
    }
  } 
)



