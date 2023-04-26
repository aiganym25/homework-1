import { formatDate } from "../format-date";
import { TodoItem } from "../todo";
import "./gm-modal.css";

const fetchTodaysTasks = async () => {
  try {
    const response = await fetch("http://localhost:3004/tasks");
    const tasks = await response.json();
    const todayTasks = tasks.filter(
      (task: TodoItem) => formatDate(task.date) === "Today" && !task.isCompleted
    );
    return todayTasks;
  } catch (error) {
    console.error(error);
  }
};

export function showGoodMorningModal() {
  const modal = document.createElement("div");
  modal.classList.add("gm-modal");
  const modalContent = document.createElement("div");
  modalContent.classList.add("gm-modal__content");

  const title = document.createElement("h3");
  title.classList.add("gm-modal__content__header");

  title.innerHTML = "Good Morning";

  fetchTodaysTasks().then((tasks) => {
    if (tasks.length !== 0) {
      const intro = document.createElement("p");
      intro.textContent = "You have the next planned tasks for today:\n";
      const taskContainer = document.createElement("div");
      taskContainer.classList.add("task-container");
      tasks.forEach((task: TodoItem) => {
        {
          const taskElem = document.createElement("div");
          taskElem.textContent = `\t${task.title}`;
          taskContainer.append(taskElem);
        }
      });

      const okButton = document.createElement("div");
      okButton.classList.add("gm-modal__button");
      okButton.textContent = "Ok";

      okButton.addEventListener("click", () => {
        modal.style.display = "none";
      });
      modalContent.append(title, intro, taskContainer, okButton);

    }
  });

  modal.append(modalContent);

  return modal;
}
