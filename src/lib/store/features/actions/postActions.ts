"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  setPosts,
  addPost,
  setPostsAdmin,
  PostState,
  updatePost,
  deletePost,
} from "../postSlice";
import handleAsync from "@/utils/handleAsync";
import api from "@/utils/api";
import { IPost } from "@/types/Types";
import { toast } from "react-toastify";

// fetch all the posts
export const fetchAllPostsAdmin = createAsyncThunk(
  "post/fetchAllPosts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<{ posts: IPost[] }> = await api.get(
        `/admin/findallposts`
      );
      console.log("response of admin posts", response);

      if (!response.data || !response.data.posts) {
        return rejectWithValue("No posts found.");
      }

      dispatch(setPostsAdmin(response.data.posts));
      return response.data.posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return rejectWithValue("Failed to fetch posts.");
    }
  }
);
export const fetchAllPosts = createAsyncThunk(
  "post/fetchAllPosts",
  async (page: number , { dispatch, rejectWithValue, getState }) => {
    try {
      const response: AxiosResponse<{ posts: IPost[] }> = await api.get(
        `/post/allposts?page=${page}&limit=5`
      );
      console.log("response of all post", response);

      if (!response.data || !response.data.posts) {
        return rejectWithValue("No posts found.");
      }

      const data: IPost[] = response.data.posts;

      const { post } = getState() as { post: PostState };
      const prevPosts = post.posts ?? [];

      const updatedPosts = [...prevPosts];

      data.forEach((job) => {
        if (!job.isDeleted) {
          const index = updatedPosts.findIndex((j) => j?._id === job?._id);
          if (index !== -1) {
            updatedPosts[index] = { ...job };
          } else {
            updatedPosts.push({ ...job });
          }
        }
      });

      dispatch(setPosts(updatedPosts));

      return updatedPosts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return rejectWithValue("Failed to fetch posts.");
    }
  }
);

export const addPostByUser = createAsyncThunk(
  "posts/addPost",
  async (
    {
      description,
      mediaFiles,
      routes,
    }: { description: string; mediaFiles: File[]; routes: string },
    { dispatch, rejectWithValue }
  ) => {
    const formData = new FormData();

    formData.append("description", description);

    mediaFiles.forEach((file) => {
      formData.append("media", file);
    });

    const response = await api.post(`/${routes}/upload`, formData);

    if (response.status >= 200 && response.status < 300) {
      toast.success("Post added successfully");

      dispatch(addPost(response.data.post));

      const allPostsResponse: AxiosResponse<{ posts: IPost[] }> = await api.get(
        "/post/allposts"
      );

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
  }
);

export const fetchPostById = createAsyncThunk(
  "post/fetchCommentById",
  async (id: string, { rejectWithValue }) => {
    const response = await handleAsync<AxiosResponse<{ post: IPost }>>(() =>
      api.get(`/post/post/${id}`)
    );
    console.log("post", response);

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
      routes,
      postId,
      description,
      mediaFiles,
    }: {
      routes: string;
      postId: string;
      description: string;
      mediaFiles: File[];
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      formData.append("description", description);

      mediaFiles.forEach((file) => {
        formData.append("media", file);
      });

      const response = await api.patch(`${routes}/update/${postId}`, formData);
      dispatch(updatePost({ postId, updatedData: response.data.post }));
      return response.data.post;
    } catch (error) {
      return rejectWithValue(error|| "Something went wrong");
    }
  }
);

//  delete a post by the owner
export const DeletePost = createAsyncThunk(
  "post/softDeletePost",
  async ({ postId }: { postId: string }, {dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<{ post: IPost }> = await api.put(
        `/post/delete/${postId}`
      );

      if (!response.data || !response.data.post) {
        return rejectWithValue("Post not found.");
      }
      dispatch(deletePost(response.data.post._id))
      return response.data.post;
    } catch (error) {
      console.error("Error deleting post:", error);
      return rejectWithValue("Failed to delete post.");
    }
  }
);
