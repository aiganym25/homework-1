import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WeatherInfo } from "../interfaces/Weather";

const initialState = {
  data : {
    name: null,
    icon: null,
    temp_c: null
  },

};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    updateWeather: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
