
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SkillType{
  _id:string
  name:string
  status:boolean
}

export interface TitleType{
  _id:string
  name:string
  status:boolean
}

export interface AdminProfile {
  email:string
<<<<<<< HEAD
  password:string
=======
 
>>>>>>> 0e7888464bd06148eee8a0fd7563175062a8f8d6
  firstName:string
  lastName:string
  phoneNumber:string
  profileImage:string
  bio:string
 
}
 interface AdminState{
admin:AdminProfile|null
skills:SkillType[]
titles:TitleType[]
 }
const initialState: AdminState = {
  admin:null,
  skills:[],
  titles:[]
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state,action) => {
      state.admin = action.payload
      
      
    },
    setSkills:(state,action:PayloadAction<SkillType[]>)=>{
      state.skills=action.payload
    },
    setJOBTitles:(state,action:PayloadAction<TitleType[]>)=>{
      state.titles=action.payload
    }
  }, 
});

export const { setAdmin,setSkills,setJOBTitles } = adminSlice.actions;
export default adminSlice.reducer;
