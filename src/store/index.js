import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/authSlice";
import sidebarSlice from "./slices/sidebarSlice";
import cartReducer from "./slices/cartSlice";
import stepReducer from "./slices/stepSlice";
import directModalSlice from "./slices/depositWithdraw";
import propertySlice from "./slices/propertySlice";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user", "cart"],
};
const reducers = combineReducers({
  user: userReducer,
  sidebar: sidebarSlice,
  cart: cartReducer,
  step: stepReducer,
  directModal: directModalSlice,
  property: propertySlice,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
