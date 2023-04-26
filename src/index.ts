// import ".././main.css";
import { renderWeather } from "./Weather-tbilisi/weather-tbilisi";
import { AddNewTaskModal } from "./AddTaskModal/add-task-modal";
import { renderTodoTasks } from "./All-tasks/all-tasks";
import { renderCompletedTasks } from "./Completed-tasks/completed-tasks";
import { showGoodMorningModal } from "./GM-modal/gm-modal";

renderWeather();

// Add new task modal
const newTaskButton = document.querySelector(".container__new-task")!;
const container = document.querySelector(".container")!;
newTaskButton.addEventListener("click", () => {
  const modalForm = AddNewTaskModal();
  modalForm.style.display = "block";
  container.append(modalForm);
});

// search task
let searchText: string = "";
const searchTodo = document.querySelector(
  ".container__search"
) as HTMLInputElement;
searchTodo.placeholder = "Search Task";
searchTodo.addEventListener("input", () => {
  searchText = searchTodo.value.trim();
  renderTodoTasks(searchText);
  renderCompletedTasks(searchText);
});

const showGM = showGoodMorningModal();
// setting time for showing the good morning modal
const currentDate: string = new Date().toLocaleDateString();
const lastDateOfUsage: string | null = localStorage.getItem("lastDateOfUsage");

if (lastDateOfUsage !== currentDate) {
  localStorage.setItem("lastDateOfUsage", currentDate);
  showGM.style.display = "flex";
} else {
  showGM.style.display = "none";
}
container.append(showGM);

renderTodoTasks(searchText);
renderCompletedTasks(searchText);
