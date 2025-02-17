import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
interface EducationType {  
  college: string;  
  startYear: string;  
  endYear: string;  
}  
 export interface JobLocationType {
  country: string;
  countryName: string;
  state: string;
  stateName: string;
  city: string;
}

interface RegisterType {
    email: string
    password:string
    firstName:string
    lastName:string
    location:{
    country: string;
    countryName: string;
    state: string;
    stateName: string;
    city: string;
  }
  education:EducationType[]
  jobTitles:string[],
  jobLocations:JobLocationType[]
}

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
    
  },
});

export const { setEmail,setPassword ,setfirstName,setlastName,setLocation,setEducation,setjobTitles,setjobLocations} = registerSlice.actions;
export default registerSlice.reducer;
