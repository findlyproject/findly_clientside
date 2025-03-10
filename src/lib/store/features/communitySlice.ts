import { createSlice } from "@reduxjs/toolkit";

export interface MessageType{
    _id:string;
    sender:string;
    receiver:string;
    seen:boolean;
    isDeleted:boolean;
    message:string;
    timestamp:Date;
  
  }

  export interface MemberType{
    _id:string;
    memberId:{
        _id:string;
        firstName:string;
        lastName:string;
        profileImage:string;
        logo:string;
        name:string
    }
    memberModel:string;
  }
  export interface CommunityMessage{
    _id:string;
    communityId:string;
    sender:{
        _id:string;
        profileImage:string;
        logo:string;
        firstName:string;
        lastName:string;
        name:string;
    }
    senderModel:string;
    message:string;
    isDelete:boolean;
    type:string;
    timestamp:Date
  }
export interface Community {
  _id: string;
  name: string;
  description: string;
  profile: string;
  members: MemberType[];
  createdBy:{
    _id:string;
    name:string
  };
  isDeleted:boolean;
  createdAt:string;
  updatedAt:string;

}

const initialState={
    members:[]
}
 export const communitySlice=createSlice({


    name:"community",
    initialState,
    reducers:{
    setMembers:(state,action)=>{
        state.members=action.payload
    }
    }
})

export const {setMembers}=communitySlice.actions
export default communitySlice.reducer