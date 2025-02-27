"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { setPosts, addPost, IPost } from "../postSlice";
import handleAsync from "@/utils/handleAsync";
import api from "@/utils/api";

// fetch all the posts
export const fetchAllPosts = createAsyncThunk(
  "post/fetchAllPosts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<{ posts: IPost[] }> = await api.get(
        "/post/allposts"
      );

      if (!response.data || !response.data.posts) {
        return rejectWithValue("No posts found.");
      }

      dispatch(setPosts(response.data.posts)); // ✅ Update Redux store
      return response.data.posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return rejectWithValue("Failed to fetch posts.");
    }
  }
);

export const addPostByUser = createAsyncThunk(
  "posts/addPost",
  async (
    { description, mediaFiles }: { description: string; mediaFiles: File[] },
    { dispatch, rejectWithValue }
  ) => {
    console.log("Media Files to Upload:", mediaFiles);
    const formData = new FormData();

    formData.append("description", description);
    console.log("Media Files to Upload:", mediaFiles);
    formData.append("media", mediaFiles[0]);

    mediaFiles.forEach((file) => {
      formData.append("media", file);
    });

    try {
      const response = await api.post("/post/upload", formData);
      console.log("jhdsgfhdgsjhfgjs", formData);

      if (response.status >= 200 && response.status < 300) {
        alert("Post added successfully");

        dispatch(addPost(response.data.post));

        const allPostsResponse: AxiosResponse<{ posts: IPost[] }> =
          await api.get("/post/allposts");

        if (!allPostsResponse.data || !allPostsResponse.data.posts) {
          return rejectWithValue("No posts found.");
        }

        dispatch(setPosts(allPostsResponse.data.posts)); // ✅ Update Redux store
        return allPostsResponse.data.posts;
      } else {
        throw new Error(
          `Error: ${response.data.message || "Failed to add post"}`
        );
      }
    } catch (error: any) {
      console.error("API error:", error);
      return rejectWithValue("Failed to create or fetch posts.");
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "post/fetchCommentById",
  async (id: string, { rejectWithValue }) => {
    const response = await handleAsync<AxiosResponse<{ post: IPost }>>(() =>
      api.get(`/post/post/${id}`)
    );

    if (!response?.data || !response.data.post) {
      return rejectWithValue("No posts found.");
    }

    return response.data.post;
  }
);

export const updatePostByUser = createAsyncThunk(
  "posts/updatePostByUser",
  async (
    {
      postId,
      description,
      mediaFiles,
    }: { postId: string; description: string; mediaFiles: File[] },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      formData.append("description", description);
      console.log("Media Files to Upload:", mediaFiles);
      formData.append("media", mediaFiles[0]);

      mediaFiles.forEach((file) => {
        formData.append("media", file);
      });

      console.log(postId);
      const response = await api.patch(`post/update/${postId}`, formData);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

//  delete a post by the owner
export const DeletePost = createAsyncThunk(
  "post/softDeletePost",
  async ({ postId }: { postId: string }, { rejectWithValue }) => {
    try {
      console.log("first");
      const response: AxiosResponse<{ post: IPost }> = await api.put(
        `/post/delete/${postId}`
      );
      console.log(response);

      if (!response.data || !response.data.post) {
        return rejectWithValue("Post not found.");
      }

      return response.data.post;
    } catch (error) {
      console.error("Error deleting post:", error);
      return rejectWithValue("Failed to delete post.");
    }
  }
);
