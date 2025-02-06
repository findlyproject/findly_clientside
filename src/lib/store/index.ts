


import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";


import themeReducer from "./features/them";
import registerReducer from "./features/registerSlice";
import paymentReducer from "./features/paymentSlice";
import loginReducer from "./features/userSlice";
import userReducer from "./features/userSlice";
import ratingReducer from "./features/ratingSlice"

const userPersistConfig = { key: "user", storage };
const loginPersistConfig = { key: "login", storage };
const ratingPersistConfig={key:"login",storage}
const registerPersistConfig={key:"register",storage}
const paymentPersistConfig={key:"payment",storage}

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedRegisterReducer = persistReducer(registerPersistConfig, registerReducer);
const persistedLoginReducer = persistReducer(loginPersistConfig, loginReducer);
const persistedRatingReducer=persistReducer(ratingPersistConfig,ratingReducer)
const persistedPaymentReducer=persistReducer(paymentPersistConfig,paymentReducer)

export const makeStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
      register: persistedRegisterReducer,
      payment: persistedPaymentReducer,
      login: persistedLoginReducer,  
      user: persistedUserReducer, 
      rating:persistedRatingReducer  ,
      
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });


export const store = makeStore();
export const persistor = persistStore(store);


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
