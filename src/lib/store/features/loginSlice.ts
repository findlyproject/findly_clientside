import api from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { LOGOUT_USER } from "./actions/userActions";


interface loginType {
    activeuser:{firstName: string;
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
      
        connecting: mongoose.Types.ObjectId[],
      
        about?: string;
      
        resume?: {
          fileUrl: string;
          type: "PDF" | "Video";
          uploadedAt?: Date;
        }[];
        role:"user"|"premium",
        subscriptionEndDate: Date | null,
        subscriptionStartDate: Date | null,
      
        coverLetter?: string;
        isBlocked?: boolean;
        _id: string;}|null,
}

const initialState:loginType={
    activeuser:null,
}


const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers: {
        setActive: (state,actions) => {
          state.activeuser = actions.payload; 
        },
        SetLogout: (state,action)=>{
          switch(action.type){
            case LOGOUT_USER:
              state.activeuser=null

          }
        }
    }

})

// export const logoutUser = createAsyncThunk(
//   "auth/logout", 
//   async (_, thunkAPI) => {
//     try {
//       await api.post("/api/user/logout");
//       localStorage.removeItem("user");

//       return null; 
//     } catch (error: any) {
//       console.log("logout error", error);
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Logout failed");
//     }
//   }
// );


export const { setActive, SetLogout } = loginSlice.actions;
export default loginSlice.reducer