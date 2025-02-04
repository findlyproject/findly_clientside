import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./features/them"
import registerReducer from './features/registerSlice'
import paymentReducer from "./features/paymentSlice"
import loginReducer from './features/loginSlice'
export const makeStore = () => {
    return configureStore({
     reducer:{
       
       theme:themeReducer,
       register:registerReducer,
       payment:paymentReducer,
       login:loginReducer
     }
    });
  };
  
  export type AppStore = ReturnType<typeof makeStore>;
  export type RootState = ReturnType<AppStore["getState"]>;
  export type AppDispatch = AppStore["dispatch"];