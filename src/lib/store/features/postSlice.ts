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
      state.posts = [...(state.posts ?? []), ...action.payload];
      
    },
    setPostsAdmin: (state, action: PayloadAction<IPost[]>) => {
      state.postsAdmin =action.payload
      
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

export const {setPostsAdmin, setPosts,addPost,addComment,setComments,findCommentReplay,removeDeletedReply,setCommentWithReplay,updatePost,setLikes,setSaved,resetPostState,} = postSlice.actions;

export default postSlice.reducer;
