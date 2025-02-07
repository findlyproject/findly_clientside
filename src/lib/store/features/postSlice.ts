import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "./userSlice";

interface IReport {
  _id: string;
}

interface IComment {
  _id: string;
}

export interface IPost {
  _id: string;
  description?: string;
  images?:string [];
  video?:string;
  owner: UserProfile | null;
  likedBy: string[];
  reports: (string | IReport)[];
  comments: (string | IComment)[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FilterByPosts {
  description?: string;
  owner?: string;
  isDeleted?: boolean;
}

interface PostState {
  baseUrl: string;
  posts: IPost[] | null;
  filterByPosts: FilterByPosts | null;
  currPage: string | null;
  pageNumber: number;
  isPostsLoading: boolean;
  postsLength: number | null;
}

const initialState: PostState = {
  baseUrl: process.env.NODE_ENV === "production" ? "/" : "http://localhost:3030/",
  posts: null,
  filterByPosts: null,
  currPage: null,
  pageNumber: 1,
  isPostsLoading: false,
  postsLength: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    setIsPostsLoading: (state, action: PayloadAction<boolean>) => {
      state.isPostsLoading = action.payload;
    },
    setFilterByPosts: (state, action: PayloadAction<FilterByPosts | null>) => {
      state.filterByPosts = action.payload;
    },
  },
});

export const { setPosts, setIsPostsLoading, setFilterByPosts } = postSlice.actions;

export default postSlice.reducer;
