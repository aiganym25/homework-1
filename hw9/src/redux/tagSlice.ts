import { createSlice } from "@reduxjs/toolkit";

interface TagState {
  tag: string;
}

const initialState: TagState = {
  tag: "All",
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setTag: (state, action) => {
      state.tag = action.payload;
    },
  },
});

export const { setTag } = tagSlice.actions;
export default tagSlice.reducer;
