import { TodoItem } from "../todo";
import { formatDate } from "../format-date";
import "./completed-tasks.css";

const fetchCompletedTasks = async (searchText: string) => {
  try {
    const response = await fetch("http://localhost:3004/tasks");
    const tasks = await response.json();
    const completedTasks = tasks.filter((task: TodoItem) => task.isCompleted);
    const filteredTasks =
      searchText !== ""
        ? completedTasks.filter((task: TodoItem) =>
            task.title.toLowerCase().includes(searchText.toLowerCase())
          )
        : completedTasks;
    return filteredTasks;
  } catch (error) {
    console.error(error);
  }
};

const toggleCompletedTask = async (task: TodoItem) => {
  const undoCompletedItem: TodoItem = {
    id: task.id,
    title: task.title,
    date: task.date,
    tag: task.tag,
    isCompleted: false,
  };
  try {
    const response = await fetch(`http://localhost:3004/tasks/${task.id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(undoCompletedItem),
    });
  } catch (error) {
    console.error(error);
  }
};
export function renderCompletedTasks(searchText: string) {
  const completedTaskContainer = document.getElementById("completed-tasks")!;
  completedTaskContainer.innerHTML = "";

  const listContent = document.createElement("div");

  const title = document.createElement("div");
  title.classList.add("completed__header");
  title.textContent = "Completed Tasks";

  listContent.append(title);
  const list = document.createElement("ul");
  list.classList.add("completed__list");

  fetchCompletedTasks(searchText).then((tasks) =>
    tasks.forEach((task: TodoItem) => {
      const listItem = document.createElement("li");
      listItem.classList.add("completed__list__item");

      const div = document.createElement("div");
      div.style.display = "flex";

      const checkbox = document.createElement("input");
      checkbox.checked = true;
      checkbox.classList.add("checkbox", "checkbox--checked"); // Add CSS class to apply styles

      const taskInfo = document.createElement("div");
      taskInfo.classList.add("completed__list__item-info");

      const listItemTitle = document.createElement("span");
      listItemTitle.classList.add("completed__list__item-info__title");
      listItemTitle.id = "todo";
      listItemTitle.textContent = task.title;

      const tag = document.createElement("div");
      tag.classList.add("tag", `${task.tag}-tag`);
      tag.style.color = "#838383";
      tag.style.background = "#F5F5F5";
      tag.style.marginRight = "10px";
      tag.textContent = task.tag;

      const dateTitle = document.createElement("div");
      dateTitle.classList.add("completed__list__item-info__date");
      const date = formatDate(task.date);
      dateTitle.textContent = date;

      const tag_date = document.createElement("div");
      tag_date.style.display = "flex";
      tag_date.style.alignItems = "center";
      tag_date.append(tag, dateTitle);
      tag_date.style.marginTop = "9px";
      taskInfo.append(listItemTitle, tag_date);

      checkbox.addEventListener("click", () => {
        toggleCompletedTask(task);
        location.reload();
      });

      div.append(checkbox, taskInfo);

      listItem.appendChild(div);
      list.appendChild(listItem);
    })
  );

  listContent.append(list);
  completedTaskContainer.append(listContent);
  return completedTaskContainer;
}
