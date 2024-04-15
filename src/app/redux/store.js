import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { Reducer } from "./reducer";

const rootreducer = combineReducers({ user: Reducer });

const Store = configureStore({
  reducer: rootreducer,
  middleware: (getDefaultMiddleware) =>
getDefaultMiddleware().concat(logger),
  devTools: import.meta.env.DEV ? true : false
});


export default Store;
