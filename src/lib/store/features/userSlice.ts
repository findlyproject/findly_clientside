import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Education {
  qualification: string;
  startYear: string;
  endYear: string;
  location: string;
}

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
  projects?: {
    title: string;
    description: string;
    link?: string;
  }[];
  connecting: string[];
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
  googlestate: boolean;
}

const initialState: LoginState = {
  activeuser: null,
  googlestate: true
};

interface EditState {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  about?: string;
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
      console.log("heeeee",state.activeuser)
      state.activeuser = null;
      state.googlestate = true
      console.log("state.activeuser",state.activeuser)
    },
    
  },
});

export const {
  setActive,
  SetLogout,
  setGooglelogin,
  setEducation,
  setRemoveEducation,
  setjobLocations,
  setRemovejoblocation,
  setjobTItles,
  setRemovjobTItles,
  setLocation,
  setPersonalDetails,
  setProject,
  setremovproject,
  setskils,
  setRemovskils,
} = loginSlice.actions;

export default loginSlice.reducer;
