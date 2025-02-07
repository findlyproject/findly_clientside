// import { configureStore } from "@reduxjs/toolkit";

// import themeReducer from "./features/them"
// import registerReducer from './features/registerSlice'
// import paymentReducer from "./features/paymentSlice"
// import loginReducer from './features/loginSlice'
// import userReducer from "./features/userSlice"
// export const makeStore = () => {
//     return configureStore({
//      reducer:{
       
//        theme:themeReducer,
//        register:registerReducer,
//        payment:paymentReducer,
//        login:loginReducer,
//        user:userReducer
//      }
//     });
//   };
  
//   export type AppStore = ReturnType<typeof makeStore>;
//   export type RootState = ReturnType<AppStore["getState"]>;
//   export type AppDispatch = AppStore["dispatch"];




import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// Import your reducers
import themeReducer from "./features/them";
import registerReducer from "./features/registerSlice";
import paymentReducer from "./features/paymentSlice";
import loginReducer from "./features/userSlice";
import userReducer from "./features/userSlice";
import ratingReducer from "./features/ratingSlice"
import postReducer from "./features/postSlice"

// Create persist configs for specific reducers
const userPersistConfig = { key: "user", storage };
const loginPersistConfig = { key: "login", storage };
const ratingPersistConfig={key:"login",storage}
const registerPersistConfig={key:"register",storage}
const postPersistConfig={key:"post",storage}

// Wrap reducers with persistReducer
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedRegisterReducer = persistReducer(registerPersistConfig, registerReducer);
const persistedLoginReducer = persistReducer(loginPersistConfig, loginReducer);
const persistedRatingReducer=persistReducer(ratingPersistConfig,ratingReducer)
const persistedpostReducer=persistReducer(postPersistConfig,postReducer)

// Configure the store
export const makeStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
      register: persistedRegisterReducer,//persisted
      payment: paymentReducer,
      login: persistedLoginReducer,  // Persist login state
      user: persistedUserReducer, //persist
      rating:persistedRatingReducer ,  // Persist rating state
      post:persistedpostReducer   // Persist rating state

    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

// Create persistor
export const store = makeStore();
export const persistor = persistStore(store);

// Define types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
