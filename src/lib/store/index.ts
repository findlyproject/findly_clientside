import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./features/them"
import registerReducer from './features/registerSlice'
export const makeStore = () => {
    return configureStore({
     reducer:{
       
       theme:themeReducer,
       register:registerReducer
     }
    });
  };
  
  export type AppStore = ReturnType<typeof makeStore>;
  export type RootState = ReturnType<AppStore["getState"]>;
  export type AppDispatch = AppStore["dispatch"];