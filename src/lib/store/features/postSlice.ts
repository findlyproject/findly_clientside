import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "./userSlice";

export interface IReport {
_id: string; 
reportedBy:UserProfile;
reason:string;
isDeleted:boolean;
createdAt:Date;
updatedAt:Date;

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
  reports?:  IReport[]| null|undefined;
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
    updatePost: (state, action: PayloadAction<{ postId: string; updatedData: Partial<IPost> }>) => {
      if (!state.posts) return; // Return early if posts list is null
    
      const { postId, updatedData } = action.payload;
      const postIndex = state.posts.findIndex((post) => post._id === postId);
    
      if (postIndex !== -1) {
        state.posts[postIndex] = { ...state.posts[postIndex], ...updatedData };
      }
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
    
  },
});

export const { setPosts,addPost,addComment,setComments,updatePost } = postSlice.actions;

export default postSlice.reducer;
