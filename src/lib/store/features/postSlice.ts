import { createSlice, PayloadAction } from "@reduxjs/toolkit";


import { User,Company, IPost, IComment, IReply, ISavePost} from "@/types/Types";


// export interface SavePost{
//   _id:string;
//   postId:{
//      _id:string

//   }
//   userId:{
//     _id:string
//     firstName:string;
//     profileImage:string

//   }
//   timestamp:Date
// }
// export interface IReport {
// _id: string; 
// reportedBy:User;
// reason:string;
// isDeleted:boolean;  
// createdAt:Date;
// updatedAt:Date;

// }

// export interface IReply {
//   _id: string;
//   user: User|Company | null;
//   reply: string;
//   repliedAt?: Date;
//   isDeleted: boolean;
//   updatedAt:Date
 
// }

// export interface IComment {
//   _id: string;
//   user: User | Company  | null;
//   comment: string;
//   replies: IReply[];  
//   isDeleted: boolean;
//   createdAt:Date;
//   updatedAt:Date

// }

// export interface ISavePost{
//   _id:string
//   description:string
//   images?:string[]
//   video?:string
// }
// export interface IPost {
//   _id: string;
//   description?: string;
//   images?:string [];
//   video?:string;
//   owner: User | null;
//   likedBy?: User[];
//   reports?:  IReport[]| null|undefined;
//   comments?:  IComment[] ;
//   isDeleted?: boolean;
//   createdAt?: string;
//   updatedAt?: string;
// }


export interface PostState {
  posts: IPost[] | null;
  postsAdmin:IPost[]|null
  comments:IComment[] | null;
  postsLength: number | null;
  commentReplay?:IReply[]
  commentsReplay?:IComment[] | null;
  likes: string[]; 
  saved:ISavePost []
}

const initialState: PostState = {
  postsAdmin:null,
  posts: null,
  comments:null,
  postsLength: null,
  likes:[],
  saved:[]
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
