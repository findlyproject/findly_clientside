import { connectionRequest } from './actions/userActions';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


  export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  location?: string;
  profileImage?: string;
  banner?: string;
  skills?: string[];
  jobTitle?: string[];
  jobLocation?: string[];
  education: {
    qualification: string;
    startYear: string;
    endYear: string;
    location: string;
    college:string
  }[]

  experience:{
    jobRole:string
      companyName:string,
      companyLogo:string,
      startYear:string,
      endYear:string
  }[]
  projects?: {
    title: string;
    description: string;
    link?: string;
  }[];
  connecting: {
    connectionID:string
    status:boolean;
  }[];  
  about?: string;
  resume?: {
    fileUrl: string;
    type: "PDF" | "Video";
    uploadedAt?: Date;
  }[];
  role: "user" | "premium";
  subscriptionEndDate: Date | null;
  subscriptionStartDate: Date | null;
  coverLetter?: string;
  isBlocked?: boolean;
  _id: string;
}

interface LoginState {
  activeuser: UserProfile | null;
  googlestate:boolean;
  userdetails:UserProfile| null
  connectionRequest:UserProfile|null
  
}

const initialState: LoginState = {
  activeuser: null,
  googlestate:true,
  userdetails:null,
  connectionRequest:null,
  
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<UserProfile | null>) => {
      state.activeuser = action.payload;
    },
    setGooglelogin: (state)=>{
      state.googlestate = false
    },
    SetLogout: (state) => {
      state.activeuser = null;
      state.googlestate = true
    },
    setDetailes:(state,action)=>{
state.userdetails=action.payload
    },
    setConnectionRequest:(state,action:PayloadAction<UserProfile | null>)=>{
state.connectionRequest=action.payload
    }
  },
});


export const { setActive, SetLogout,setGooglelogin ,setDetailes,setConnectionRequest} = loginSlice.actions;
export default loginSlice.reducer;
