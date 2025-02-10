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
  likedBy?: string[];
  reports?:  IReport[];
  comments?:  IComment[] ;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}


interface PostState {
  posts: IPost[] | null;
  comments:IComment[] | null;
  postsLength: number | null;
}

const initialState: PostState = {
  posts: null,
  comments:null,
  postsLength: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<IPost[]>) => {
      if(state.posts!==null)
        state.posts=state.posts.concat(action.payload);
    },

    //comment 
    setComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<{ postId: string; comment: IComment }>) => {
      const { postId, comment } = action.payload;
      
      const post = state.posts?.find((p) => p._id === postId);
      if (post?.comments) {
        post.comments.push(comment);
      }
    },
    updateComment: (state, action) => {
      const { commentId, newComment } = action.payload;
    
      if (!state.comments) return; // Ensure comments exist
    
      const commentIndex = state.comments.findIndex(comment => comment._id === commentId);
      
      if (commentIndex !== -1) {
        state.comments[commentIndex] = { 
          ...state.comments[commentIndex], 
          text: newComment // Assuming `text` is the property storing comment content
        };
      }
    },
  },
});

export const { setPosts,addPost,addComment,updateComment,setComments } = postSlice.actions;

export default postSlice.reducer;
