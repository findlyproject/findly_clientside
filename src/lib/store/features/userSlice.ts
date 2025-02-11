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
    setEducation: (state, action: PayloadAction<Education>) => {
      state.activeuser?.education.push(action.payload);
    },
    setRemoveEducation: (state, action: PayloadAction<number>) => {
      if (state.activeuser?.education) {
        state.activeuser.education = state.activeuser.education.filter((_, index) => index !== action.payload);
      }
    },
    setjobLocations: (state, action: PayloadAction<string>) => {
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
    setLocation: (state, action: PayloadAction<string>) => {
      if (state.activeuser) {
        state.activeuser.location = action.payload;
      }
    },
    setPersonalDetails: (state, action: PayloadAction<Partial<EditState>>) => {
      if (state.activeuser) {
        state.activeuser.firstName = action.payload.firstName ?? state.activeuser.firstName;
        state.activeuser.lastName = action.payload.lastName ?? state.activeuser.lastName;
        state.activeuser.email = action.payload.email ?? state.activeuser.email;
        state.activeuser.phoneNumber = action.payload.phoneNumber ?? state.activeuser.phoneNumber;
        state.activeuser.dateOfBirth = action.payload.dateOfBirth ?? state.activeuser.dateOfBirth;
        state.activeuser.about = action.payload.about ?? state.activeuser.about;
        state.activeuser.profileImage = action.payload.profileImage ?? state.activeuser.profileImage;
        state.activeuser.banner = action.payload.banner ?? state.activeuser.banner;


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
