import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company, SkillType, TitleType, Admin } from "@/types/Types";

interface AdminState {
  admin: Admin | null;
  skills: SkillType[];
  titles: TitleType[];
  companies: Company[];
}
const initialState: AdminState = {
  admin: null,
  skills: [],
  titles: [],
  companies: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setSkills: (state, action: PayloadAction<SkillType[]>) => {
      state.skills = action.payload;
    },
    setJOBTitles: (state, action: PayloadAction<TitleType[]>) => {
      state.titles = action.payload;
    },
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
    },
  },
});

export const { setAdmin, setSkills, setJOBTitles, setCompanies } =
  adminSlice.actions;
export default adminSlice.reducer;
