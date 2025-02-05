import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the user's active profile
interface UserProfile {
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
  };
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
}

const initialState: LoginState = {
  activeuser: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<UserProfile | null>) => {
      state.activeuser = action.payload;
    },
    SetLogout: (state) => {
      state.activeuser = null;
    },
  },
});


export const { setActive, SetLogout } = loginSlice.actions;
export default loginSlice.reducer;
