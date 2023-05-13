import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
}

const initialState: SearchState = {
  query: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
