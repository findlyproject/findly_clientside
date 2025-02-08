import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "./userSlice";

export interface IReport {
  _id: string;
}

interface IReply {
  _id: string;
  user: UserProfile | null;
  reply: string;
  repliedAt?: Date;
  isDeleted: boolean;
}

export interface IComment {
  _id: string;
  user: UserProfile | null;
  comment: string;
  replies: IReply[];  
  isDeleted: boolean;
  createdAt:Date;
  updatedAt:Date

}



export interface IPost {
  _id: string;
  description?: string;
  images?:string [];
  video?:string;
  owner: UserProfile | null;
  likedBy: string[];
  reports:  IReport[];
  comments:  IComment[] ;
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
  posts: IPost[] | null;
  comments:IComment[] | null;
  filterByPosts: FilterByPosts | null;
  currPage: string | null;
  pageNumber: number;
  isPostsLoading: boolean;
  postsLength: number | null;
}

const initialState: PostState = {
  posts: null,
  comments:null,
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
    //comment 
    setComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<{ postId: string; comment: IComment }>) => {
      const { postId, comment } = action.payload;
      
      const post = state.posts?.find((p) => p._id === postId);
      if (post) {
        post.comments.push(comment);
      }
    },
     updateComment: (state,action: PayloadAction<{ commentId: string; newComment: IComment }>) => {
      const {commentId, newComment } = action.payload;
      console.log(newComment)
      console.log(commentId)
      console.log(state.comments)

      const comment = state.comments?.find((c) => c._id === commentId);
      console.log(comment)
      if (comment) {
        comment.comment = newComment.comment; // ✅ Update the comment text
      }
    },
    
  },
});

export const { setPosts, setIsPostsLoading, setFilterByPosts,addComment,updateComment,setComments } = postSlice.actions;

export default postSlice.reducer;
