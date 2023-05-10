import { combineReducers } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import searchSlice from "./searchSlice";
import tagSlice from "./tagSlice";
import tasksSlice from "./tasksSlice";
import weatherReducer from "./weatherSlice";

const rootReducer = combineReducers({
  tasks: tasksSlice,
  weather: weatherReducer,
  search: searchSlice,
  modal: modalSlice,
  tag: tagSlice,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
