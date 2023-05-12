import { setIsOpenModal } from "./modalSlice";
import {
  addTask,
  completeTask,
  deleteTask,
  editTask,
  getTasks,
  undoCompleteTask,
} from "./tasksSlice";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { config } from "../config";
import UrlJoin from "url-join";
import { Todo } from "../interfaces/Todo";

export async function loadTasksThunks(
  searchText: string,
  tagSelected: string,
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) {
  try {
    const response: Response = await fetch(`${config.apiServerURL}`);
    const tasksResponse: Todo[] = await response.json();

    let filteredTasks = tasksResponse;

    if (searchText !== "" && tagSelected !== "All") {
      // Filter by both searchText and tagSelected
      filteredTasks = filteredTasks.filter(
        (task: Todo) =>
          task.title.toLowerCase().includes(searchText?.toLowerCase() ?? "") &&
          task.tag === tagSelected.toLowerCase()
      );
    } else if (searchText !== "") {
      // Filter by searchText only
      filteredTasks = filteredTasks.filter((task: Todo) =>
        task.title.toLowerCase().includes(searchText.toLowerCase() ?? "")
      );
    } else if (tagSelected !== "All") {
      // Filter by tagSelected only
      filteredTasks = filteredTasks.filter(
        (task) => task.tag === tagSelected.toLowerCase()
      );
    }
    dispatch(getTasks(filteredTasks));
  } catch (error) {
    console.log(error);
  }
}

export async function undoCompletedTaskThunk(
  task: Todo,
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) {
  const undoCompletedItem: Todo = {
    id: task.id,
    title: task.title,
    date: task.date,
    tag: task.tag,
    isCompleted: false,
  };
  try {
    await fetch(`${config.apiServerURL}/${task.id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(undoCompletedItem),
    });
    dispatch(undoCompleteTask(task.id));
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTaskThunk(
  id: number,
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) {
  try {
    await fetch(`${config.apiServerURL}/${id}`, {
      method: "delete",
    });
    dispatch(deleteTask(id));
  } catch (error) {
    console.error(error);
  }
}
export async function completeTaskThunk(
  task: Todo,
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) {
  try {
    const response = await fetch(`${config.apiServerURL}/${task.id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: task.id,
        title: task.title,
        date: task.date,
        tag: task.tag,
        isCompleted: true,
      }),
    });
    dispatch(completeTask(task.id));
  } catch (error) {
    console.error(error);
  }
}

export async function addNewTaskThunk(
  newTaskTitle: string,
  selectedTag: string,
  date: string,
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> {
  try {
    await fetch(`${config.apiServerURL}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTaskTitle,
        tag: selectedTag,
        date: date,
        isCompleted: false,
      }),
    });
    dispatch(setIsOpenModal(false));
    dispatch(
      addTask({
        title: newTaskTitle,
        tag: selectedTag,
        date: date,
        isCompleted: false,
      })
    );
  } catch (error) {
    console.error(error);
  }
}

export async function editTaskThunk(
  newTaskTitle: string,
  selectedTag: string,
  date: string,
  id: number,
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) {
  console.log(id);
  try {
    await fetch(`${config.apiServerURL}/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        title: newTaskTitle,
        tag: selectedTag,
        date: date,
        isCompleted: false,
      }),
    });
    dispatch(setIsOpenModal(false));
    dispatch(
      editTask({
        id: id,
        title: newTaskTitle,
        tag: selectedTag,
        date: date,
        isCompleted: false,
      })
    );
  } catch (error) {
    console.error(error);
  }
}
