//get task
// add task
// methods

import { Todo } from "../interfaces/Todo";
import { formatDate } from "./date";

export const addTask = async (
  task: string,
  tag: string,
  date: string
): Promise<void> => {
  try {
    await fetch(`http://localhost:3004/tasks`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task,
        tag: tag,
        date: date,
        isCompleted: false,
      }),
    });
  } catch (er) {
    throw er;
  }
};

export const getTasks = async (searchText: string): Promise<Todo[]> => {
  const response: Response = await fetch("http://localhost:3004/tasks");
  const tasks: Todo[] = await response.json();
  const todoTasks = tasks.filter((task: Todo) => !task.isCompleted);
  const filteredTasks =
    searchText !== ""
      ? todoTasks.filter((task: Todo) =>
          task.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : todoTasks;
  return filteredTasks;
};

export const getCompletedTasks = async (
  searchText: string
): Promise<Todo[]> => {
  const response: Response = await fetch("http://localhost:3004/tasks");
  const tasks: Todo[] = await response.json();
  const todoTasks = tasks.filter((task: Todo) => task.isCompleted);
  const filteredTasks =
    searchText !== ""
      ? todoTasks.filter((task: Todo) =>
          task.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : todoTasks;
  return filteredTasks;
};

export const deleteTask = async (task: Todo): Promise<void> => {
  try {
    await fetch(`http://localhost:3004/tasks/${task.id}`, {
      method: "delete",
    });
    // const updatedTask = await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const completeTask = async (task: Todo): Promise<void> => {
  try {
    await fetch(`http://localhost:3004/tasks/${task.id}`, {
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
  } catch (error) {
    console.error(error);
  }
};

export const undoCompleteTask = async (task: Todo): Promise<void> => {
  const undoCompletedItem: Todo = {
    id: task.id,
    title: task.title,
    date: task.date,
    tag: task.tag,
    isCompleted: false,
  };
  try {
    await fetch(`http://localhost:3004/tasks/${task.id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(undoCompletedItem),
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchTodaysTasks = async () => {
  const response = await fetch("http://localhost:3004/tasks");
  const tasks: Todo[] = await response.json();
  const todayTasks = tasks.filter(
    (task: Todo) => formatDate(task.date) === "Today" && !task.isCompleted
  );
  return todayTasks;
};
