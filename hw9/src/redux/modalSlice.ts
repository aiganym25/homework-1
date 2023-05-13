import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  type: string;
  taskId: number;
}

const initialState: ModalState = {
  isOpen: false,
  type: "",
  taskId: 0,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsOpenModal: (state, action) => {
      state.isOpen = action.payload;
    },
    setModalType: (state, action) => {
      state.type = action.payload;
    },
    setTaskId: (state, action) => {
      state.taskId = action.payload;
    },
  },
});

export const { setIsOpenModal, setModalType, setTaskId } = modalSlice.actions;
export default modalSlice.reducer;
