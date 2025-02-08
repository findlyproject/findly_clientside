import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import api from "../../../../utils/api"; 
import { addComment, IComment, setComments,updateComment } from "../postSlice";

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


// fetch all the comments
export const fetchAllComments = createAsyncThunk( 
  "post/fetchAllComments",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<{ comments: IComment[] }> = await api.get("/post/allcomments");

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

// add Comment
export const addCommentonPost = createAsyncThunk(
  "post/addComment",
  async (
    { postId, comment }: AddCommentArgs,
   
    { dispatch, rejectWithValue }
  ) => {
    try {
      console.log(postId, comment)
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

// fetch the comment by id
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

//update a comment by the owner
export const updateAComment = createAsyncThunk(
  "post/updateComment",
  async ({commentId,newComment}:updateCommentArgs, {dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<CommentResponse> = await api.put(
        `/post/edit-comment/${commentId}`,{newComment}
      );
      if (!response.data || !response.data.comment) {
        return rejectWithValue("No posts found.");
      }
      console.log(response.data.comment)
      dispatch(updateComment({commentId,newComment:response.data.comment}))

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
  async ({commentId}:{commentId:string}, {dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<CommentResponse> = await api.post(
        `/post/delete-comment/${commentId}`
      );
      if (!response.data || !response.data.comment) {
        return rejectWithValue("No posts found.");
      }
      console.log(response.data.comment)
      dispatch(updateComment({commentId,newComment:response.data.comment}))
      

      return response.data.comment;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return rejectWithValue("Failed to fetch posts.");
    }
  }
);

