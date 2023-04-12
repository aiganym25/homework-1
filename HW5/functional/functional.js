(function () {
  let allTasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

  let completedTasks = localStorage.getItem("completed-tasks")
    ? JSON.parse(localStorage.getItem("completed-tasks"))
    : [];

  let filteredAllTasks = allTasks;
  let filteredCompletedTasks = completedTasks;

  let state = undefined;

  /**
   * Global application state
   * @template T
   * @param {T} initialValue
   * @returns {[T, function(T): void]}
   */
  function useState(initialValue) {
    state = state || initialValue;

    function setValue(newValue) {
      state = newValue;
      renderApp();
    }

    return [state, setValue];
  }

  /**
   * Functional component for the list
   * @param allTasks {Array}
   * @param onCompleteTask {function}
   * @param onDeleteTask {function}
   * @returns {HTMLElement} - List element
   */
  function AllTasks({ allTasks, onCompleteTask, onDeleteTask }) {
    const allTasksComponent = document.createElement("div");

    // ---------- TITLE -----------------------
    const title = document.createElement("div");
    title.classList.add("tasks__header");
    title.textContent = "All Tasks";

    // ----------List ----------------------
    allTasksComponent.append(title);

    const list = document.createElement("ul");
    list.classList.add("task__list");

    filteredAllTasks.forEach((taskTitle, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("task__list__item");
      const div = document.createElement("div");
      div.style.display = "flex";

      const checkbox = document.createElement("div");
      checkbox.type = "checkbox";
      checkbox.classList.add("checkbox");

      const listItemTitle = document.createElement("span");
      listItemTitle.id = "todo";
      listItemTitle.textContent = taskTitle;

      const deleteSvg = document.createElement("img");
      deleteSvg.src = "./assets/bin.svg";
      deleteSvg.classList.add("delete");
      deleteSvg.alt = "delete svg";

      deleteSvg.addEventListener("click", () => {
        onDeleteTask(listItemTitle.textContent);
      });

      checkbox.addEventListener("click", () => {
        onCompleteTask(listItemTitle.textContent);
      });

      div.append(checkbox, listItemTitle, deleteSvg);

      listItem.append(div);
      list.append(listItem);
    });

    allTasksComponent.append(list);
    return allTasksComponent;
  }

  /**
   * Functional component for the list
   * @param completedTasks {Array}
   * @param onClick {function}
   * @returns {HTMLElement} - List element
   */

  function CompletedTasks({ completedTasks, onClick }) {
    const listContent = document.createElement("div");

    const title = document.createElement("div");
    title.classList.add("completed__header");
    title.textContent = "Completed Tasks";

    listContent.append(title);
    const list = document.createElement("ul");
    list.classList.add("completed__list");

    filteredCompletedTasks.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("completed__list__item");

      const div = document.createElement("div");
      div.style.display = "flex";

      const checkbox = document.createElement("input");
      checkbox.checked = true;
      checkbox.classList.add("checkbox", "checkbox--checked"); // Add CSS class to apply styles

      const listItemTitle = document.createElement("span");
      listItemTitle.textContent = item;

      checkbox.addEventListener("click", () => {
        onClick(listItemTitle.textContent);
      });

      div.append(checkbox, listItemTitle);

      listItem.appendChild(div);
      list.appendChild(listItem);
    });

    listContent.append(list);
    return listContent;
  }

  /**
   * Button component
   * @param text {string}
   * @param onClick {function}
   * @returns {HTMLButtonElement} - Button element
   */
  function Button({ text, onClick }) {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.onclick = onClick;
    button.style.cssText =
      "cursor: pointer; background-color: rgba(60, 134, 244, 0.15); padding: 16px 32px; border: none; font-size: 16px; font-weight: 800; color: #0053CF; height: 52px; white-space: nowrap; border-radius: 12px";
    return button;
  }

  function ModalForm({ text }) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal__content");

    const title = document.createElement("h3");
    title.classList.add("modal__content__header");

    title.innerHTML = text;

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.classList.add("modal__content__task-input");
    input.placeholder = "Task Title";

    const div = document.createElement("div");
    div.classList.add("flex");

    const cancelButton = document.createElement("button");
    // cancelButton.name = "cancel";
    cancelButton.classList.add("btn", "btn--cancel");

    cancelButton.textContent = "Cancel";

    // event listener to cancelButton
    cancelButton.addEventListener("click", () => {
      modal.style.display = "none";
    });

    const addButton = document.createElement("button");
    addButton.classList.add("btn", "btn--add-task");
    addButton.textContent = "Add task";

    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        input.style.color = "#000";
        addButton.style.backgroundColor = "#3C86F4";
      } else {
        addButton.style.backgroundColor = "#D3D3D3";
      }
    });
    // --------- ADD NEW TASK -----------
    addButton.addEventListener("click", (e) => {
      const task = input.value.trim();
      if (task !== "") {
        // onAddTask(task);
        allTasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        location.reload();
      }
      // saving in local storage
    });

    div.append(cancelButton, addButton);

    modalContent.append(title, input, div);

    modal.append(modalContent);
    return modal;
  }

  function InputTextEditor({ text, onChange }) {
    const input = document.createElement("input");
    input.classList.add("input");
    input.setAttribute("type", "text");
    input.placeholder = text;

    input.addEventListener("input", () => {
      const searchText = input.value.trim();

      if (searchText !== "") {
        filteredAllTasks = allTasks.filter((taskTitle) =>
          taskTitle.toLowerCase().includes(searchText.toLowerCase())
        );
        filteredCompletedTasks = completedTasks.filter((taskTitle) =>
          taskTitle.toLowerCase().includes(searchText.toLowerCase())
        );
      } else {
        filteredAllTasks = allTasks;
        filteredCompletedTasks = completedTasks;
      }
      renderTasks();
      renderCompletedTasks();
    });

    return input;
  }

  /**
   * App container
   * @returns {HTMLDivElement} - The app container
   */
  function App() {
    const container = document.createElement("div");
    container.classList.add("container");

    // --------------  TITLE --------------------
    const title = document.createElement("header");
    title.textContent = "To Do List";
    container.append(title);

    // --------------- SEARCH  --------------------
    const div = document.createElement("div");
    div.classList.add("flex");

    const searchInput = InputTextEditor({
      text: "Search Task",
    });
    // --------------- NEW TASK BUTTON --------------------

    const addNewTaskButton = Button({
      text: "+ New Task",
      onClick: () => {
        const modal = ModalForm({
          text: "Add New Task",
        });
        modal.style.display = "block";
        container.append(modal);
      },
    });

    div.append(searchInput, addNewTaskButton);
    container.append(div);

    container.append(renderTasks());
    container.append(renderCompletedTasks());

    return container;
  }

  // RENDER all tasks
  function renderTasks() {
    const allTasksContainer = document.getElementById("all-tasks");
    allTasksContainer.innerHTML = "";
    const allTasksComponent = AllTasks({
      allTasks,
      onCompleteTask: (taskTitle) => {
        const taskIndex = allTasks.findIndex((task) => task === taskTitle);
        if (taskIndex !== -1) {
          var newComplete = allTasks.splice(taskIndex, 1)[0];

          completedTasks.push(newComplete);
          localStorage.setItem("tasks", JSON.stringify(allTasks));
          localStorage.setItem(
            "completed-tasks",
            JSON.stringify(completedTasks)
          );
          location.reload();
        }
      },
      onDeleteTask: (taskTitle) => {
        const taskIndex = allTasks.findIndex((task) => task === taskTitle);
        if (taskIndex !== -1) {
          allTasks.splice(taskIndex, 1);
          localStorage.setItem("tasks", JSON.stringify(allTasks));
          location.reload();
        }
      },
    });
    allTasksContainer.append(allTasksComponent);
    return allTasksContainer;
  }

  // render completed tasks
  function renderCompletedTasks() {
    const completedTaskContainer = document.getElementById("completed-tasks");
    completedTaskContainer.innerHTML = "";

    const completedTaskComponent = CompletedTasks({
      completedTasks,
      onClick: (taskTitle) => {
        const taskIndex = completedTasks.findIndex(
          (task) => task === taskTitle
        );
        if (taskIndex !== -1) {
          var uncompletedTask = completedTasks.splice(taskIndex, 1)[0];

          allTasks.push(uncompletedTask);
          localStorage.setItem("tasks", JSON.stringify(allTasks));
          localStorage.setItem(
            "completed-tasks",
            JSON.stringify(completedTasks)
          );
          location.reload();
        }
      },
    });
    // return completedTaskComponent;
    completedTaskContainer.append(completedTaskComponent);
    return completedTaskContainer;
  }

  /**
   * Render the app.
   * On change whole app is re-rendered.
   */
  function renderApp() {
    const appContainer = document.getElementById("functional-example");
    appContainer.innerHTML = "";

    appContainer.append(App());
  }
  renderApp();
})();
