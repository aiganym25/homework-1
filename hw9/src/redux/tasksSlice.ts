import {
  createAsyncThunk,
  createReducer,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Todo } from "../interfaces/Todo";
import { RootState } from "./reducers";
let nextTaskId = 1;

const initialTasksState: Todo[] = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTasksState,
  reducers: {
    getTasks: (state, action) => {
      return action.payload.map((task: Todo) => {
        if (task.id >= nextTaskId) {
          nextTaskId = task.id + 1;
        }
        return task;
      });
    },
    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
        id: nextTaskId,
      };
      nextTaskId++;
      state.push(newTask);
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

export const { addTask, getTasks, deleteTask, completeTask, undoCompleteTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
