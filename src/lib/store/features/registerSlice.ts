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
  education:[{
    college:"",
    startYear:"",
    endYear:"",
    
  }],
  
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
  //   setCollage:(state,action)=>{
  // state.education.collage=action.payload
  //   },
  //   setstartYear:(state,action)=>{
  //     state.education.startYear=action.payload
  //   },
  //   setendYear:(state,action)=>{
  //     state.education.endYear=action.payload
  //   },
  setEducation: (state, action: PayloadAction<EducationType>) => {  
    // Assuming only one educational experience is needed, otherwise, you would need to push to the array.  
    const education = action.payload;  
    state.education[0] = education; // Update the first education object, if you want to handle multiple, consider using a different approach.  
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
