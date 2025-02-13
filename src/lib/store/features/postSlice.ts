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
  updatedAt:Date
 
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
  likedBy?: UserProfile[];
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
  commentReplay?:IReply[]
  commentsReplay?:IComment[] | null;
  likes: string[]; 
}

const initialState: PostState = {
  posts: null,
  comments:null,
  postsLength: null,
  likes:[]
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
    findCommentReplay:(state,action)=>{
      console.log("action.payload",action.payload);
      
    state.commentReplay=action.payload
    console.log("state.commentReplay",state.commentReplay);
    },
     removeDeletedReply:(state, action) => {
      const deletedReplyId = action.payload; 
      console.log("deletedReplyId",deletedReplyId);
      

      state.commentReplay = state.commentReplay.filter(reply => reply._id !== deletedReplyId);
      console.log("state.commentReplay", state.commentReplay);

    },
    setCommentWithReplay:(state,action)=>{
      state.commentsReplay=action.payload
    },
    setLikes: (state, action: PayloadAction<[]>) => {
      state.likes = action.payload
    }
    
  },
});

export const { setPosts,addPost,addComment,setComments,findCommentReplay,removeDeletedReply,setCommentWithReplay,setLikes} = postSlice.actions;

export default postSlice.reducer;
