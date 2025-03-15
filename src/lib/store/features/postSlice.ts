import { createSlice, PayloadAction } from "@reduxjs/toolkit";


import {  IPost, IComment, IReply, ISavePost, SavePost} from "@/types/Types";




export interface PostState {
  posts: IPost[] | null;
  postsAdmin:IPost[]|null
  comments:IComment[] | null;
  postsLength: number | null;
  commentReplay?:IReply[]
  commentsReplay?:IComment[] | null;
  likes: string[]; 
  saved:SavePost []
}

const initialState: PostState = {
  postsAdmin:null,
  posts: null,
  comments:null,
  postsLength: null,
  likes:[],
  saved:[],
};


const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      const existingIds = new Set(state.posts?.map(post => post.id) ?? []);
    
      state.posts = [
        ...(state.posts ?? []), 
        ...action.payload.filter(post => !existingIds.has(post.id))
      ];
    },
    
    setPostsAdmin: (state, action: PayloadAction<IPost[]>) => {
      state.postsAdmin =action.payload
      
    },
  
    addPost: (state, action: PayloadAction<IPost[]>) => {
      if(state.posts!==null)
        state.posts=state.posts.concat(action.payload);
    },
    updatePost: (state, action: PayloadAction<{ postId: string; updatedData: IPost }>) => {
      if (!state.posts) return; // Return early if posts list is null
    
      const { postId, updatedData } = action.payload;
      const postIndex = state.posts.findIndex((post) => post._id === postId);
    
      if (postIndex !== -1) {
        state.posts[postIndex] = { ...state.posts[postIndex], ...updatedData };
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      if (!state.posts) return; 
    
      state.posts = state.posts.filter((post) => post._id !== action.payload);
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
    
    updateComment: (
      state,
      action: PayloadAction<{ postId: string; commentId: string; updatedComment: IComment }>
    ) => {
      const { postId, commentId, updatedComment } = action.payload;
      
      const post = state.posts?.find((p) => p._id === postId);
      if (!post || !Array.isArray(post.comments)) return;
    
      const commentIndex = post.comments.findIndex((c) => c._id === commentId);
      if (commentIndex !== -1) {
        post.comments[commentIndex] = updatedComment;
      }
    },
    
    deleteComment: (
      state,
      action: PayloadAction<{ postId: string; commentId: string }>
    ) => {
      const { postId, commentId } = action.payload;
      
      const post = state.posts?.find((p) => p._id === postId);
      if (!post || !Array.isArray(post.comments)) return;
    
      post.comments = post.comments.filter((c) => c._id !== commentId);
    },
    
    findCommentReplay:(state,action)=>{
      
      
    state.commentReplay=action.payload
   
    },
     removeDeletedReply:(state, action) => {
      const deletedReplyId = action.payload; 
      

      state.commentReplay = state.commentReplay?.filter(reply => reply._id !== deletedReplyId);
     

    },
    setCommentWithReplay:(state,action)=>{
      state.commentsReplay=action.payload
    },
    setLikes: (state, action: PayloadAction<[]>) => {
      state.likes = action.payload
    },
    setSaved:(state,action:PayloadAction<[]>)=>{
      state.saved=action.payload
    },

    resetPostState: () => initialState,
    
  },
  
});

export const {setPostsAdmin, setPosts,addPost,deletePost,addComment,setComments,updateComment,deleteComment,findCommentReplay,removeDeletedReply,setCommentWithReplay,updatePost,setLikes,setSaved,resetPostState,} = postSlice.actions;

export default postSlice.reducer;
