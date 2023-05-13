import { Todo } from "../interfaces/Todo";
import { formatDate } from "./date";

export const fetchTodaysTasks = async () => {
  const response = await fetch("http://localhost:3004/tasks");
  const tasks: Todo[] = await response.json();
  const todayTasks = tasks.filter(
    (task: Todo) => formatDate(task.date) === "Today" && !task.isCompleted
  );
  return todayTasks;
};
