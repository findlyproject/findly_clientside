import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
interface EducationType {  
  college: string;  
  startYear: string;  
  endYear: string;  
}  
interface RegisterType {
    email: string
    password:string
    firstName:string
  lastName:string
  location:string
  education:EducationType[]
  jobTitles:string[],
  jobLocations:string[]
}

const initialState: RegisterType = {
  email: "",
  password:"",
  firstName:"",
  lastName:"",
  location:"",
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
 
  setEducation: (state, action: PayloadAction<EducationType>) => {  
    if (!Array.isArray(state.education)) {
      state.education = [];
    }
    state.education.push(action.payload);
  },

    setjobTitles:(state,action)=>{
      state.jobTitles=action.payload
    },
    setjobLocations:(state,action)=>{
      state.jobLocations=action.payload
    }
  },
});

export const { setEmail,setPassword ,setfirstName,setlastName,setLocation,setEducation,setjobTitles,setjobLocations} = registerSlice.actions;
export default registerSlice.reducer;
