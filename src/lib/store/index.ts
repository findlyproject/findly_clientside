import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./features/them"
import registerReducer from './features/registerSlice'
import paymentReducer from "./features/paymentSlice"
import loginReducer from './features/loginSlice'
import userReducer from "./features/userSlice"
import ratingReducer from "./features/ratingSlice"
export const makeStore = () => {
    return configureStore({
     reducer:{
       
       theme:themeReducer,
       register:registerReducer,
       payment:paymentReducer,
       login:loginReducer,
       user:userReducer,
       rating:ratingReducer
     }
    });
  };
  
  export type AppStore = ReturnType<typeof makeStore>;
  export type RootState = ReturnType<AppStore["getState"]>;
  export type AppDispatch = AppStore["dispatch"];