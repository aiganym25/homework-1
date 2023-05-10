import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import tasksSlice from "./tasksSlice";
import weatherSlice from "./weatherSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    weather: weatherSlice,
    search: searchSlice,
  },
});
