import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company, SkillType, TitleType, Admin, User, Rating } from "@/types/Types";

interface AdminState {
  admin: Admin | null;
  skills: SkillType[];
  titles: TitleType[];
  companies: Company[];
}


 interface AdminState{
admin:Admin|null
skills:SkillType[]
titles:TitleType[]
companies:Company[]
users:User[]
reviews:Rating[]
reports:number
 }
const initialState: AdminState = {
  admin:null,
  skills:[],
  titles:[],
  companies:[],
  users:[],
  reviews:[],
    reports:0
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state,action) => {
      state.admin = action.payload
    },
    setSkills: (state, action: PayloadAction<SkillType[]>) => {
      state.skills = action.payload;
    },
    setJOBTitles: (state, action: PayloadAction<TitleType[]>) => {
      state.titles = action.payload;
    },
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
    },
    setUsers:(state,action:PayloadAction<User[]>)=>{
          state.users=action.payload
    },
    setReviews:(state,action)=>{
      state.reviews=action.payload
    },
    setReports:(state,action)=>{
      state.reports=action.payload
    }
  
  }, 
});

export const { setAdmin,setSkills,setJOBTitles,setUsers,setCompanies,setReviews ,setReports} = adminSlice.actions;
export default adminSlice.reducer;
