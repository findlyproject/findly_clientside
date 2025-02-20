
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Url } from "url";

export interface Ieducation {
  qualification: string;
  startYear: string;
  endYear: string;
  college: string;
  Subject: string; 
}
<<<<<<< HEAD
export interface LocationType {
=======
export interface IlocationType {
>>>>>>> 0e7888464bd06148eee8a0fd7563175062a8f8d6
  country: string;
  countryName: string;
  state: string;
  stateName: string;
  city: string;
}

export interface JobLocationType {
  country: string;
  countryName: string;
  state: string;
  stateName: string;
  city: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  dateOfBirth?: Date;

<<<<<<< HEAD
  location?: LocationType;
gender:string
=======
  location?: IlocationType;

>>>>>>> 0e7888464bd06148eee8a0fd7563175062a8f8d6
 

  profileImage?: string;
  banner?: string;
  skills?: string[];
  jobTitle?: string[];
  jobLocation?: JobLocationType[];
  education: {
    Subject: string;
    qualification: string;
    startYear:string;
    endYear:string;
    location: string;
    college:string
  }[]

  experience: 
  {
    jobRole:string;
    companyName:string,
    startYear:string  
    endYear:string       
  }[]
  projects?: {
    title: string;
    description: string;
    link?: string | Url | undefined;
  }[];
  connecting: {
    connectionID:string;
    status: boolean;
    createdAt:Date}[]
  about?: string;
  resumePDF?: {
    fileUrl: string;
    fileName: string;
    uploadedAt: Date | null;
    isDeleted: boolean;
  }[];
  resumeVideo?: {
    fileUrl: string;
    fileName: string;
    uploadedAt: Date | null;
    isDeleted: boolean;
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
  googlestate: boolean;
  userdetails:UserProfile|null
  connectionRequest:UserProfile|null
  connections:UserProfile[]
  forgotPassword:{
    email:string,
    otp:string,
  }
}

const initialState: LoginState = {
  activeuser: null,
  googlestate: true,
  userdetails:null,
  connectionRequest:null,
  connections:[],
  forgotPassword:{
    email:"",
    otp:"",
  }
};

// interface EditState {
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   phoneNumber?: string;
//   dateOfBirth?: Date;
//   about?: string;
//   profileImage?: string;
//   banner?: string;
// }
interface ResumeFile {
  fileUrl: string;
  fileName: string;
  uploadedAt: Date | null;
  isDeleted: boolean;
}

interface ResumePayload {
  resumePDF: ResumeFile[];
  resumeVideo: ResumeFile[];
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<UserProfile | null>) => {
      state.activeuser = action.payload;
    },
    setGooglelogin: (state) => {
      state.googlestate = false;
    },
    SetLogout: (state) => {
      state.activeuser = null;
      state.googlestate = true
    },
    setEducation: (state, action: PayloadAction<Ieducation>) => {
      state.activeuser?.education.push(action.payload);
    },
    setRemoveEducation: (state, action: PayloadAction<number>) => {
      if (state.activeuser?.education) {
        state.activeuser.education = state.activeuser.education.filter((_, index) => index !== action.payload);
      }
    },
    setjobLocations: (state, action: PayloadAction<JobLocationType[]>) => {
      state.activeuser?.jobLocation?.push(action.payload);
    },
    setRemovejoblocation: (state, action: PayloadAction<number>) => {
      if (state.activeuser?.jobLocation) {
        state.activeuser.jobLocation = state.activeuser.jobLocation.filter((_, index) => index !== action.payload);
      }
    },
    setjobTItles: (state, action: PayloadAction<string>) => {
      state.activeuser?.jobTitle?.push(action.payload);
    },
    setRemovjobTItles: (state, action: PayloadAction<number>) => {
      if (state.activeuser?.jobTitle) {
        state.activeuser.jobTitle = state.activeuser.jobTitle.filter((_, index) => index !== action.payload);
      }
    },
    setLocation: (state, action: PayloadAction<IlocationType>) => {
      if (state.activeuser) {
        state.activeuser.location = action.payload;
      }
    },
    setPersonalDetails: (state, action: PayloadAction<UserProfile>) => {
      if (state.activeuser) {
        state.activeuser.firstName = action.payload.firstName ?? state.activeuser.firstName;
        state.activeuser.lastName = action.payload.lastName ?? state.activeuser.lastName;
        state.activeuser.email = action.payload.email ?? state.activeuser.email;
        state.activeuser.phoneNumber = action.payload.phoneNumber ?? state.activeuser.phoneNumber;
        state.activeuser.dateOfBirth = action.payload.dateOfBirth ?? state.activeuser.dateOfBirth;
        state.activeuser.about = action.payload.about ?? state.activeuser.about;
        
      }
    },
    setProject: (state, action: PayloadAction<{ title: string; description: string; link?: string }>) => {
      state.activeuser?.projects?.push(action.payload);
    },
    setremovproject: (state, action: PayloadAction<number>) => {
      if (state.activeuser?.projects) {
        state.activeuser.projects = state.activeuser.projects.filter((_, index) => index !== action.payload);
      }
    },
    setskils: (state, action: PayloadAction<string>) => {
      state.activeuser?.skills?.push(action.payload);
    },
    setRemovskils: (state, action: PayloadAction<number>) => {
      if (state.activeuser?.skills) {
        state.activeuser.skills = state.activeuser.skills.filter((_, index) => index !== action.payload);
      }
    },
    setResume: (state, action: PayloadAction<ResumePayload>) => {
      if (state.activeuser) {

        state.activeuser.resumePDF = action.payload.resumePDF;
        state.activeuser.resumeVideo = action.payload.resumeVideo;
  
        
      }
    },
    setRemoveResume: (state,action) => {
      if (state.activeuser) {
        if(action.payload==="resume"){
          state.activeuser.resumePDF = [];
        }else if(action.payload==="introductionVideo"){
          state.activeuser.resumeVideo = [];
        }
      
       
      }
    },
  
    setDetailes:(state,action)=>{
state.userdetails=action.payload
    },
    setConnectionRequest:(state,action:PayloadAction<UserProfile | null>)=>{
state.connectionRequest=action.payload
    },
    setAllConnections:(state,action:PayloadAction<UserProfile []>)=>{
state.connections=action.payload
    },
    setImages:(state,action)=>{
      if (state.activeuser) {
        state.activeuser.profileImage = action.payload.profileImage;
        state.activeuser.banner = action.payload.banner;
      }
  },
  setforgotPassword:(state,action)=>{
    state.forgotPassword.email = action.payload.email;
    state.forgotPassword.otp = action.payload.otp;
    console.log("otpotp",action.payload)
   },
  },
});

export const {
  setResume,
  setRemoveResume,
  setActive,
  SetLogout,
  setGooglelogin,
  setAllConnections,
  setConnectionRequest,
  setDetailes,
  setEducation,
  setLocation,
  setRemovskils,
  setProject,
  setremovproject,
  setRemoveEducation,
  setjobLocations,
  setskils,
  setPersonalDetails,
  setRemovjobTItles,
  setjobTItles,
  setRemovejoblocation,
  setImages,
  setforgotPassword,
} = loginSlice.actions;

export default loginSlice.reducer;
