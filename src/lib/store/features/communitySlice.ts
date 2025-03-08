import { createSlice } from "@reduxjs/toolkit";



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