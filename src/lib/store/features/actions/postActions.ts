"use client"
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from "axios";
import { IPost } from '../postSlice';
import handleAsync from '@/utils/handleAsync';
import api from '@/utils/api';
import { setPosts, } from '../postSlice';
import { useAppDispatch } from '../../hooks';


// fetch all the posts
export const fetchAllPosts = createAsyncThunk(
    "post/fetchAllPosts",
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const response: AxiosResponse<{ posts: IPost[] }> = await api.get("/post/allposts");
  
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

// // Load Posts
// export const loadPosts = createAsyncThunk(
//   'posts/loadPosts',
//   async (_, { dispatch, getState, rejectWithValue }) => {
//     const { filterByPosts } = (getState() as any).postModule;
//     const response = await handleAsync<AxiosResponse<PostsResponse>>(() => 
//       postService.query(filterByPosts)
//     );

//     if (!response) {
//       return rejectWithValue("Failed to load posts");
//     }

//     dispatch(setPosts(response.data.posts));
//     return response.data.posts;
//   }
// );
// export const loadMorePosts = createAsyncThunk(
//     'posts/loadMore',
//     async (_, { dispatch, getState, rejectWithValue }) => {
//       const { filterByPosts, pageNumber } = (getState() as any).postModule;
//       const newFilterBy = {
//         ...filterByPosts,
//         page: pageNumber,
//       };
  
//       dispatch(setIsPostsLoading(true));
      
//       const response = await handleAsync<AxiosResponse<PostsResponse>>(() => 
//         postService.query(newFilterBy)
//       );
  
//       if (!response) {
//         dispatch(setIsPostsLoading(false));
//         return rejectWithValue("Failed to load more posts");
//       }
  
//       dispatch(addPostsAction(response.data.posts));
//       dispatch(setIsPostsLoading(false));
//       return response.data.posts;
//     }
//   );


// // Remove Post
// export const removePost = createAsyncThunk(
//   'posts/remove',
//   async (postId: string, { dispatch, rejectWithValue }) => {
//     const response = await handleAsync<AxiosResponse>(() => 
//       postService.remove(postId)
//     );

//     if (!response) {
//       return rejectWithValue("Failed to remove post");
//     }

//     socketService.emit('post-removed', postId);
//     dispatch(removePostAction(postId));
//     return postId;
//   }
// );

// // Save Comment
// export const saveComment = createAsyncThunk(
//   'posts/saveComment',
//   async (comment: any, { dispatch, rejectWithValue }) => {
//     const response = await handleAsync<AxiosResponse>(() => 
//       commentService.save(comment)
//     );

//     if (!response) {
//       return rejectWithValue("Failed to save comment");
//     }

//     const savedComment = response.data;

//     if (comment._id) {
//       dispatch({ type: 'UPDATE_COMMENT', comment: savedComment });
//       socketService.emit('comment-updated', savedComment);
//     } else {
//       dispatch({ type: 'ADD_COMMENT', comment: savedComment });
//       socketService.emit('comment-added', savedComment);
//     }

//     return savedComment;
//   }
// );

// // Remove Comment
// export const removeComment = createAsyncThunk(
//   'posts/removeComment',
//   async (comment: any, { dispatch, rejectWithValue }) => {
//     const response = await handleAsync<AxiosResponse>(() => 
//       commentService.remove(comment)
//     );

//     if (!response) {
//       return rejectWithValue("Failed to remove comment");
//     }

//     socketService.emit('comment-removed', comment);
//     dispatch({ type: 'REMOVE_COMMENT', comment });
//     return comment;
//   }
// );

