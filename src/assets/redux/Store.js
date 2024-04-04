import { configureStore, combineReducers} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { Reducer } from "./Reducer";

const rootreducer = combineReducers({ user: Reducer });

const Store = configureStore({
  reducer: rootreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});


export default Store;
