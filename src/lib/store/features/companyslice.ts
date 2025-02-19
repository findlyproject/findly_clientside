import { createSlice } from "@reduxjs/toolkit"
import { UserProfile } from "./userSlice";

export interface companyData{
    email:string,
    password:string,
    name: string;
    age: number;
    contact: string;
    logo: string;
    address: {
        city: string;
        country: string;
        pincode: string;
        state: string;
    };
    role: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    subscriptionStartDate: string | null;
    subscriptionEndDate: string | null;
    employees: string[]; 
    _id: string;
}


export interface applicationData{
    companyId: string;
    coverLetter: string;
    createdAt: string;
    introVideo: string;
    jobId: string;
    resume: string;
    status: string;
    updatedAt: string;
    userId: UserProfile;
}


interface loginState{
    activeCompany:companyData|null
    application:applicationData[]
    
}

const initialState:loginState={
    activeCompany:null,
    application:[]
}

export const loginSlice= createSlice({
   name:"company",
   initialState,
   reducers:{
    setActiveCompany:(state,action)=>{
        state.activeCompany=action.payload
        console.log("state.activeCompany",state.activeCompany);
        
    },
    setCompanyLogOut:(state)=>{
        state.activeCompany=null
    },
    setAppliedUsers:(state,action)=>{
       state.application=action.payload
    }

   }
})

export const {setActiveCompany,setCompanyLogOut,setAppliedUsers}=loginSlice.actions
export default loginSlice.reducer 