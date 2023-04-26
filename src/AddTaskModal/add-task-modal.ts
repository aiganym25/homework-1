import { TodoItem } from "../todo";
import "./add-task-modal.css";

export const AddNewTaskModal = () => {
  const modal = document.createElement("div") as HTMLDivElement;
  modal.classList.add("modal");

  const modalContent = document.createElement("div") as HTMLDivElement;
  modalContent.classList.add("modal__content");

  const title = document.createElement("h3") as HTMLHeadElement;
  title.classList.add("modal__content__header");
  title.innerHTML = "Add New Task";

  const input = document.createElement("input") as HTMLInputElement;
  input.setAttribute("type", "text");
  input.classList.add("modal__content__task-input");
  input.placeholder = "Task Title";

  // ----------------- TAGS -------------------------
  const tagContainer = document.createElement("div") as HTMLDivElement;
  tagContainer.classList.add("modal__content__tag-containers");

  const healthTag = document.createElement("div") as HTMLDivElement;
  healthTag.classList.add("tag", "health-tag");
  let selectedTag: string = "";

  healthTag.textContent = "health";
  healthTag.addEventListener("click", () => {
    healthTag.classList.toggle("health-selected");
    selectedTag = "health";
    workTag.classList.remove("work-selected");
    homeTag.classList.remove("home-selected");
    otherTag.classList.remove("other-selected");
  });

  const workTag = document.createElement("div") as HTMLDivElement;
  workTag.classList.add("tag", "work-tag");
  workTag.textContent = "work";
  workTag.addEventListener("click", () => {
    workTag.classList.toggle("work-selected");
    selectedTag = "work";
    healthTag.classList.remove("health-selected");
    homeTag.classList.remove("home-selected");
    otherTag.classList.remove("other-selected");
  });

  const homeTag = document.createElement("div") as HTMLDivElement;
  homeTag.classList.add("tag", "home-tag");
  homeTag.textContent = "home";
  homeTag.addEventListener("click", () => {
    homeTag.classList.toggle("home-selected");
    selectedTag = "home";
    healthTag.classList.remove("health-selected");
    workTag.classList.remove("work-selected");
    otherTag.classList.remove("other-selected");
  });

  const otherTag = document.createElement("div") as HTMLDivElement;
  otherTag.classList.add("tag", "other-tag");
  otherTag.textContent = "other";
  otherTag.addEventListener("click", () => {
    otherTag.classList.toggle("other-selected");
    selectedTag = "other";
    healthTag.classList.remove("health-selected");
    workTag.classList.remove("work-selected");
    homeTag.classList.remove("home-selected");
  });

  tagContainer.append(healthTag, workTag, homeTag, otherTag);

  //----------------- CALENDAR  ------------------------------

  const calendar = document.createElement("input") as HTMLInputElement;
  calendar.setAttribute("type", "date");
  calendar.classList.add("modal__content__calendar");

  const today = new Date().toISOString().substr(0, 10);
  calendar.defaultValue = today;

  // calendar.addEventListener("change", (event) => {
  //   const selectedDate: string = (event.target as HTMLInputElement).value;
  //   // 2023-04-19
  // });

  //-----------------  BUTTONS ------------------------------
  const div = document.createElement("div") as HTMLDivElement;
  div.classList.add("flex");

  const cancelButton = document.createElement("button") as HTMLButtonElement;
  // cancelButton.name = "cancel";
  cancelButton.classList.add("btn", "btn--cancel");

  cancelButton.textContent = "Cancel";

  // event listener to cancelButton
  cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const addButton = document.createElement("button") as HTMLButtonElement;
  addButton.classList.add("btn", "btn--add-task");
  addButton.textContent = "Add task";

  input.addEventListener("input", () => {
    if (
      input.value.trim() !== "" &&
      calendar.value !== "" &&
      selectedTag !== ''
    ) {
      input.style.color = "#000";
      addButton.style.backgroundColor = "#3C86F4";
    } else if (input.value.trim() !== "") {
      input.style.color = "#000";
    } else {
      addButton.style.backgroundColor = "#D3D3D3";
    }
  });

  tagContainer.addEventListener("click", (e) => {
    if (
      selectedTag !== '' &&
      calendar.value !== "" &&
      input.value.trim() !== ""
    ) {
      input.style.color = "#000";
      addButton.style.backgroundColor = "#3C86F4";
    } else {
      addButton.style.backgroundColor = "#D3D3D3";
    }
  });

  // ----------------- ADD NEW TASK ----------------------
  addButton.addEventListener("click", (e) => {
    const task = input.value.trim();
    if (task !== "" && calendar.value !== "" && selectedTag !== '') {
      postTask(task, selectedTag, calendar.value);
      location.reload();
    }
  });

  const postTask = async (task: string, tag: string, date: string) => {
    const response = await fetch(`http://localhost:3004/tasks`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task,
        tag: tag,
        date: date,
        isCompleted: false,
      }),
    });

  };

  div.append(cancelButton, addButton);

  modalContent.append(title, input, tagContainer, calendar, div);

  modal.append(modalContent);
  return modal;
};
