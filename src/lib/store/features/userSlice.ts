import {
  Ieducation,
  IlocationType,
  Job,
  JobLocationType,
  SavedType,
  User,
} from "@/types/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  activeuser: User | null;
  googlestate: boolean;
  userdetails: User | null;
  connectionRequest: User | null;
  connections: User[];
  peopleIknow: User[];
  forgotPassword: {
    email: string;
    otp: string;
  };
  savedJobs: SavedType[];
  jobfilter: {
    title: string;
    experienceLevel: string;
    industry: string;
    jobType: string;
  };
  allJobs: string[];
  professionalData: {
    location?: IlocationType;
    skills?: string[];
    jobTitle?: string[];
    jobLocation?: JobLocationType[];
    education: Ieducation[];
    experience: {
      jobRole: string;
      companyName: string;
      description: string;
      startYear: string;
      endYear: string;
    }[];
    projects?: {
      title: string;
      description: string;
      link?: string;
    }[];
  };
}

const initialState: LoginState = {
  activeuser: null,
  googlestate: true,
  userdetails: null,
  connectionRequest: null,
  connections: [],
  peopleIknow: [],
  forgotPassword: {
    email: "",
    otp: "",
  },
  savedJobs: [],
  jobfilter: {
    title: "",
    experienceLevel: "",
    industry: "",
    jobType: "",
  },
  allJobs: [],
  professionalData: {
    location: undefined,
    skills: [],
    jobTitle: [],
    jobLocation: [],
    education: [],
    experience: [],
    projects: [],
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<User | null>) => {
      state.activeuser = action.payload;
    },
    setGooglelogin: (state) => {
      state.googlestate = false;
    },
    SetLogout: (state) => {
      state.activeuser = null;
      state.googlestate = true;
      state.professionalData = {
        location: undefined,
        skills: [],
        jobTitle: [],
        jobLocation: [],
        education: [],
        experience: [],
        projects: [],
      };
    },
    //setting the professional of activeuser
    setprofessionalUserData: (
      state,
      action: PayloadAction<Partial<typeof state.professionalData>>
    ) => {
      if (!action.payload) return;
    
      // Initialize professionalData only if it doesn't exist
      if (!state.professionalData) {
        state.professionalData = {
          location: state.activeuser?.location || undefined,
          skills: state.activeuser?.skills || [],
          jobTitle: state.activeuser?.jobTitle || [],
          jobLocation: state.activeuser?.jobLocation || [],
          education: [...(state.activeuser?.education || [])],
          experience: state.activeuser?.experience || [],
          projects: state.activeuser?.projects || [],
        };
      }
    
      // Loop through keys in action.payload
      Object.entries(action.payload).forEach(([key, value]) => {
        const typedKey = key as keyof typeof state.professionalData;
    
        if (Array.isArray(state.professionalData[typedKey]) && Array.isArray(value)) {
          const existingArray = state.professionalData[typedKey] as any[];
    
          // Remove duplicates based on a unique property (e.g., `id`)
          const mergedArray = [...existingArray, ...value];
          const uniqueArray = mergedArray.filter(
            (obj, index, self) =>
              index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(obj))
          );
    
          state.professionalData[typedKey] = uniqueArray as never;
        } else if (value !== undefined) {
          state.professionalData[typedKey] = value as never;
        }
      });
    },
    

    setRemoveField: (
      state,
      action: PayloadAction<{
        field:
          | "education"
          | "jobTitle"
          | "projects"
          | "skills"
          | "experience"
          | "jobLocation"
          | "location";
        index: number;
      }>
    ) => {
      const { field, index } = action.payload;

      if (state.activeuser && Array.isArray(state.activeuser[field])) {
        state.activeuser[field] = state.activeuser[field].filter(
          (_, i) => i !== index
        ) as never;
      }

      if (
        state.professionalData &&
        Array.isArray(state.professionalData[field])
      ) {
        state.professionalData[field] = state.professionalData[field].filter(
          (_, i) => i !== index
        ) as never;
      }
    },

    setremovproject: (state, action: PayloadAction<number>) => {
      if (state.activeuser?.projects) {
        state.activeuser.projects = state.activeuser.projects.filter(
          (_, index) => index !== action.payload
        );
      }
    },

    setResume: (state, action: PayloadAction<ResumePayload>) => {
      if (state.activeuser) {
        state.activeuser.resumePDF = action.payload.resumePDF;
        state.activeuser.resumeVideo = action.payload.resumeVideo;
      }
    },
    setRemoveResume: (state, action) => {
      if (state.activeuser) {
        if (action.payload === "resume") {
          state.activeuser.resumePDF = [];
        } else if (action.payload === "introductionVideo") {
          state.activeuser.resumeVideo = [];
        }
      }
    },

    setDetailes: (state, action) => {
      state.userdetails = action.payload;
    },
    setConnectionRequest: (state, action: PayloadAction<User | null>) => {
      state.connectionRequest = action.payload;
    },
    setAllConnections: (state, action: PayloadAction<User[]>) => {
      state.connections = action.payload;
    },
    setImages: (state, action) => {
      if (state.activeuser) {
        state.activeuser.profileImage = action.payload.profileImage;
        state.activeuser.banner = action.payload.banner;
      }
    },
    setforgotPassword: (state, action) => {
      state.forgotPassword.email = action.payload.email;
      state.forgotPassword.otp = action.payload.otp;
      console.log("otpotp", action.payload);
    },
    setPeopleKnow: (state, action) => {
      state.peopleIknow = action.payload;
    },

    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload;
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
  setprofessionalUserData,
  setRemoveField,

  setremovproject,

  setImages,
  setforgotPassword,
  setPeopleKnow,
  setSavedJobs,
} = loginSlice.actions;

export default loginSlice.reducer;
