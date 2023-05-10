import {
  createAsyncThunk,
  createReducer,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Todo } from "../interfaces/Todo";
import { RootState } from "./reducers";

const initialTasksState: Todo[] = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTasksState,
  reducers: {
    fetchTasks: (state, action) => {
      return action.payload;
    },

    addTask: (state, action) => {
      state.push(action.payload);
    },
    editTask: (state, action) => {
      const { id } = action.payload;
      const existingTask = state.find((task) => task.id === id);
      if (existingTask) {
        Object.assign(existingTask, action.payload);
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      return state.filter((task) => task.id !== taskId);
    },
    completeTask: (state, action) => {
      const taskId = action.payload;
      const task = state.find((task) => task.id === taskId);
      if (task) {
        task.isCompleted = true;
      }
    },
    undoCompleteTask: (state, action) => {
      const taskId = action.payload;
      const task = state.find((task) => task.id === taskId);
      if (task) {
        task.isCompleted = false;
      }
    },
  },
});

export const selectNotCompletedTasks = createSelector(
  (state: RootState) => state.tasks,
  (tasks) => tasks.filter((task) => !task.isCompleted)
);

export const selectCompletedTasks = createSelector(
  (state: RootState) => state.tasks,
  (tasks) => tasks.filter((task) => task.isCompleted)
);

export const {
  addTask,
  fetchTasks,
  deleteTask,
  completeTask,
  undoCompleteTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
