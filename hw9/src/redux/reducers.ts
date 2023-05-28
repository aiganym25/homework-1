import { combineReducers } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import tasksSlice from "./tasksSlice";
import weatherReducer from "./weatherSlice";

const rootReducer = combineReducers({
  tasks: tasksSlice,
  weather: weatherReducer,
  search: searchSlice
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
