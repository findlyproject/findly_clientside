
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 export interface Rating {
  _id: string;
  review: string;
  starsRating: number;
  userId: {
    firstName: string;
    lastName: string;
    profileImage?: string; 
    jobTitle?: string; 
  };
}

interface RatingState {
  ratings: Rating[];
}

const initialState: RatingState = {
  ratings: [], 
};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    setAllRatings: (state, action: PayloadAction<Rating[]>) => {
      state.ratings = action.payload;
    },
  },
});

export const { setAllRatings } = ratingSlice.actions;
export default ratingSlice.reducer;
