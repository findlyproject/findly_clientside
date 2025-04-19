import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  alljobs: string[];
}
const initialState = {
  allJobs: [],
};

const jobSlice = createSlice({
  name: "Job",
  initialState,
  reducers: {
    setjobs: (state, action) => {
      state.allJobs = action.payload;
    },
    addJob: (state, action) => {
      if(state.allJobs!==null)
        state.allJobs=state.allJobs.concat(action.payload);
    },
  },
});

export const { setjobs,addJob } = jobSlice.actions;
export default jobSlice.reducer;
