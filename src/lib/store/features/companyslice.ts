import { createSlice } from "@reduxjs/toolkit";

import { Company, applicationData } from "@/types/Types";

interface loginState {
  activeCompany: Company | null;
}

interface loginState {
  activeCompany: Company | null;
  application: applicationData[];

  forgotPassword: {
    email: string;
    otp: string;
  };
}

const initialState: loginState = {
  activeCompany: null,
  application: [],
  forgotPassword: {
    email: "",
    otp: "",
  },
};

export const loginSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setActiveCompany: (state, action) => {
      state.activeCompany = action.payload;
    },
    setCompanyLogOut: (state) => {
      state.activeCompany = null;
    },
    setAppliedUsers: (state, action) => {
      state.application = action.payload;
    },
    setforgotPassword: (state, action) => {
      state.forgotPassword.email = action.payload.email;
      state.forgotPassword.otp = action.payload.otp;
    },
  },
});

export const {
  setActiveCompany,
  setCompanyLogOut,
  setAppliedUsers,
  setforgotPassword,
} = loginSlice.actions;
export default loginSlice.reducer;
