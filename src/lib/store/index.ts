import { configureStore } from "@reduxjs/toolkit";
import countReducer from  "./features/count-slice"
import themeReducer from "./features/them"

export const makeStore = () => {
    return configureStore({
     reducer:{
       count:countReducer,
       theme:themeReducer
     }
    });
  };
  
  export type AppStore = ReturnType<typeof makeStore>;
  export type RootState = ReturnType<AppStore["getState"]>;
  export type AppDispatch = AppStore["dispatch"];