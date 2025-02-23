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



interface loginState{
    activeCompany:companyData|null
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
    
    forgotPassword:{
        email:string,
        otp:string,
      }
}

const initialState:loginState={
    activeCompany:null,
    application:[],
    forgotPassword:{
        email:"",
        otp:"",
      }
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
    },
    setforgotPassword:(state,action)=>{
        state.forgotPassword.email = action.payload.email;
        state.forgotPassword.otp = action.payload.otp;
        console.log("otpotpcccc",action.payload)
       },
    

   }
})

export const {setActiveCompany,setCompanyLogOut,setAppliedUsers,setforgotPassword}=loginSlice.actions
export default loginSlice.reducer 