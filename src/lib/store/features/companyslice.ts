import { createSlice } from "@reduxjs/toolkit"

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

const initialState:loginState={
    activeCompany:null
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
    }

   }
})

export const {setActiveCompany,setCompanyLogOut}=loginSlice.actions
export default loginSlice.reducer 