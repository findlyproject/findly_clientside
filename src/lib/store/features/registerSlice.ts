import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { EducationType, JobLocationType, RegisterType } from "@/types/Types";
const initialState: RegisterType = {
  email: "",
  password:"",
  firstName:"",
  lastName:"",
  location:{
    country: "",
    countryName: "",
    state: "",
    stateName: "",
    city: ""
  },
  education:[],
  gender:"",
  
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
 
    setEducation: (state, action: PayloadAction<EducationType[]>) => {  
      state.education = action.payload; 
    },
    

    setjobTitles:(state,action)=>{
      state.jobTitles=action.payload
    },
    setjobLocations:(state,action:PayloadAction<JobLocationType[]>)=>{
      state.jobLocations=action.payload
    },
    setGender:(state,action)=>{
state.gender=action.payload
    }
  },
});

export const { setEmail,setPassword ,setfirstName,setlastName,setLocation,setEducation,setjobTitles,setjobLocations,setGender} = registerSlice.actions;
export default registerSlice.reducer;
