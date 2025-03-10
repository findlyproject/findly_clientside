
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { companyData } from "./companyslice";

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
companies:companyData[]
 }
const initialState: AdminState = {
  admin:null,
  skills:[],
  titles:[],
  companies:[]
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
    },
    setCompanies:(state,action:PayloadAction<companyData[]>)=>{
      state.companies=action.payload
    },
  
  }, 
});

export const { setAdmin,setSkills,setJOBTitles,setCompanies } = adminSlice.actions;
export default adminSlice.reducer;
