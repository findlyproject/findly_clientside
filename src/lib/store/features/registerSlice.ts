import { createSlice } from "@reduxjs/toolkit";

interface RegisterType {
    email: string
    password:string
    firstName:string
  lastName:string
  location:string
  collage:string,
  startYear:string,
  endYear:string,
  jobTitles:string[],
  jobLocations:string[]
}

const initialState: RegisterType = {
  email: "",
  password:"",
  firstName:"",
  lastName:"",
  location:"",
  collage:"",
  startYear:"",
  endYear:"",
  jobTitles:[],
  jobLocations:[]
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setEmail: (state,action) => {
      state.email = action.payload; 
    },
    setPassword:(state,action)=>{
      state.password=action.payload
    },
    setfirstName:(state,action)=>{
state.firstName=action.payload
    },
    setlastName:(state,action)=>{
      state.lastName=action.payload
    },
    setLocation:(state,action)=>{
      state.location=action.payload
    },
    setCollage:(state,action)=>{
  state.collage=action.payload
    },
    setstartYear:(state,action)=>{
      state.startYear=action.payload
    },
    setendYear:(state,action)=>{
      state.endYear=action.payload
    },
    setjobTitles:(state,action)=>{
      state.jobTitles=action.payload
    },
    setjobLocations:(state,action)=>{
      state.jobLocations=action.payload
    }
  },
});

export const { setEmail,setPassword ,setfirstName,setlastName,setLocation,setCollage,setstartYear,setendYear,setjobTitles,setjobLocations} = registerSlice.actions;
export default registerSlice.reducer;
