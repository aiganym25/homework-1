import { TodoItem } from "../todo";
import { formatDate } from "../format-date";
import "./all-tasks.css";
import Delete from "../assets/bin.svg";

const fetchTodoTasks = async (searchText: string) => {
  const response = await fetch("http://localhost:3004/tasks");
  const tasks = await response.json();
  const todoTasks = tasks.filter((task: TodoItem) => !task.isCompleted);
  const filteredTasks =
    searchText !== ""
      ? todoTasks.filter((task: TodoItem) =>
          task.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : todoTasks;
  return filteredTasks;
};

const completeTask = async (task: TodoItem) => {
  try {
    const response = await fetch(`http://localhost:3004/tasks/${task.id}`, {
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

const deleteTask = async (task: TodoItem) => {
  try {
    const response = await fetch(`http://localhost:3004/tasks/${task.id}`, {
      method: "delete",
    });
    const updatedTask = await response.json();
  } catch (error) {
    console.error(error);
  }
};

export function renderTodoTasks(searchText: string) {
  const allTasksContainer = document.getElementById("all-tasks")!;
  allTasksContainer.innerHTML = "";

  const allTasksComponent = document.createElement("div");
  // ---------- TITLE -----------------------
  const title = document.createElement("div");
  title.classList.add("tasks__header");
  title.textContent = "All Tasks";

  // ----------List ----------------------
  allTasksComponent.append(title);
  const list = document.createElement("ul");
  list.classList.add("task__list");
  fetchTodoTasks(searchText).then((tasks) =>
    tasks.forEach((task: TodoItem) => {
      const listItem = document.createElement("li");
      listItem.classList.add("task__list__item");
      const div = document.createElement("div");
      div.style.display = "flex";

      const checkbox: HTMLDivElement = document.createElement("div");
      checkbox.classList.add("checkbox");

      const taskInfo = document.createElement("div");
      taskInfo.classList.add("task__list__item-info");

      const listItemTitle: HTMLSpanElement = document.createElement("span");
      listItemTitle.classList.add("task__list__item-info__title");
      listItemTitle.id = "todo";
      listItemTitle.textContent = task.title;

      const tag: HTMLDivElement = document.createElement("div");
      tag.classList.add("tag", `${task.tag}-tag`);
      tag.textContent = task.tag;

      const date: HTMLDivElement = document.createElement("div");
      date.classList.add("task__list__item-info__date");
      date.textContent = formatDate(task.date);

      const tag_date: HTMLDivElement = document.createElement("div");
      tag_date.style.display = "flex";
      tag_date.style.alignItems = "center";
      tag_date.append(tag, date);
      tag_date.style.marginTop = "10px";
      taskInfo.append(listItemTitle, tag_date);

      const deleteSvg = document.createElement("img");
      deleteSvg.classList.add("task__list__item__delete-svg");
      deleteSvg.src = Delete;    
      deleteSvg.alt = "delete svg";  


      deleteSvg.addEventListener("click", () => {
        deleteTask(task);
        location.reload();
      });

      checkbox.addEventListener("click", () => {
        completeTask(task);

        location.reload();
      });

      div.append(checkbox, taskInfo, deleteSvg);

      listItem.append(div);
      list.append(listItem);
    })
  );

  allTasksComponent.append(list);
  allTasksContainer.append(allTasksComponent);
  return allTasksComponent;
}

// const form = document.querySelector("#todo-form") as HTMLFormElement;

// form.addEventListener("input", (e) => {
//   e.preventDefault;
//   const newTodo: TodoItem = {
//     text: input.value,
//     completed: false,
//     tag: "",
//     date: "",
//   };
//   todoList.push(newTodo);
//   input.value = "";
//   renderTodoList();
// });

// export const renderTodoList = () => {
// list.innerHTML = '';
// todoList.forEach((todo, index) => {
//   const item = document.createElement("li");
//   item.innerText = todo.text;
//   item.addEventListener("click", () => {
//     // todo.completed = !todo.completed;
//     renderTodoList();
//   });
//   list.appendChild(item);
// });
// };
