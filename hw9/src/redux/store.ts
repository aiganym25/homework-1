import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import searchSlice from "./searchSlice";
import tagSlice from "./tagSlice";
import tasksSlice from "./tasksSlice";
import weatherSlice from "./weatherSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    weather: weatherSlice,
    search: searchSlice,
    modal: modalSlice,
    tag: tagSlice
  },
});
