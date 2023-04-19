(function () {
  let state = undefined;
  let searchText = "";
  const apiKey = "1a6debdafdde4b7d952200620231804";

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
  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const oneDay = 24 * 60 * 60 * 1000;
    const diffInDays = Math.round((date - now) / oneDay);

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Tomorrow";
    } else if (diffInDays === -1) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
      });
    }
  }

  async function getTbilisiTemp() {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Tbilisi&aqi=yes`
      );
      const weatherInfo = await response.json();
      return weatherInfo;
    } catch (er) {
      console.log(er);
    }
  }

  /**
   * Functional component for the list
   * @param allTasks {Array}
   * @param onCompleteTask {function}
   * @param onDeleteTask {function}
   * @returns {HTMLElement} - List element
   */
  function AllTasks({ fetchTodoTasks, onCompleteTask, onDeleteTask }) {
    const allTasksComponent = document.createElement("div");

    // ---------- TITLE -----------------------
    const title = document.createElement("div");
    title.classList.add("tasks__header");
    title.textContent = "All Tasks";

    // ----------List ----------------------
    allTasksComponent.append(title);

    const list = document.createElement("ul");
    list.classList.add("task__list");

    fetchTodoTasks().then((tasks) =>
      tasks.forEach((task) => {
        // console.log(task);
        const listItem = document.createElement("li");
        listItem.classList.add("task__list__item");
        const div = document.createElement("div");
        div.style.display = "flex";

        const checkbox = document.createElement("div");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");

        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task__list__item-info");

        const listItemTitle = document.createElement("span");
        listItemTitle.classList.add("task__list__item-info__title");
        listItemTitle.id = "todo";
        listItemTitle.textContent = task.title;

        const tag = document.createElement("div");
        tag.classList.add("tag", `${task.tag}-tag`);
        tag.textContent = task.tag;

        const date = document.createElement("div");
        date.classList.add("task__list__item-info__date");
        date.textContent = formatDate(task.date);

        const tag_date = document.createElement("div");
        tag_date.style.display = "flex";
        tag_date.style.alignItems = "center";
        tag_date.append(tag, date);
        tag_date.style.marginTop = "10px";
        taskInfo.append(listItemTitle, tag_date);

        const deleteSvg = document.createElement("img");
        deleteSvg.src = "./assets/bin.svg";
        deleteSvg.classList.add("task__list__item__delete-svg");
        deleteSvg.alt = "delete svg";

        deleteSvg.addEventListener("click", () => {
          onDeleteTask(task);
          location.reload();
        });

        checkbox.addEventListener("click", () => {
          onCompleteTask(task);
          location.reload();
        });

        div.append(checkbox, taskInfo, deleteSvg);

        listItem.append(div);
        list.append(listItem);
      })
    );

    allTasksComponent.append(list);
    return allTasksComponent;
  }

  /**
   * Functional component for the list
   * @param completedTasks {Array}
   * @param onClick {function}
   * @returns {HTMLElement} - List element
   */

  function CompletedTasks({ fetchCompletedTasks, onClick }) {
    const listContent = document.createElement("div");

    const title = document.createElement("div");
    title.classList.add("completed__header");
    title.textContent = "Completed Tasks";

    listContent.append(title);
    const list = document.createElement("ul");
    list.classList.add("completed__list");

    fetchCompletedTasks().then((tasks) =>
      tasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.classList.add("completed__list__item");

        const div = document.createElement("div");
        div.style.display = "flex";

        const checkbox = document.createElement("input");
        checkbox.checked = true;
        checkbox.classList.add("checkbox", "checkbox--checked"); // Add CSS class to apply styles

        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task__list__item-info");

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
          onClick(task);
          location.reload();
          // renderTasks();
          // renderCompletedTasks();
        });

        div.append(checkbox, taskInfo);

        listItem.appendChild(div);
        list.appendChild(listItem);
      })
    );

    listContent.append(list);
    return listContent;
  }

  function GoogMorningModal() {
    const modal = document.createElement("div");
    modal.classList.add("gm-modal");
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal__content");

    const title = document.createElement("h3");
    title.classList.add("modal__content__header");

    title.innerHTML = "Good Morning";

    const fetchTodaysTasks = async () => {
      try {
        const response = await fetch("http://localhost:3004/tasks");
        const tasks = await response.json();
        const todayTasks = tasks.filter(
          (task) => formatDate(task.date) === "Today" && !task.isCompleted
        );
        return todayTasks;
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodaysTasks().then((tasks) => {
      if (tasks.length !== 0) {
        const intro = document.createElement("p");
        intro.textContent = "You have the next planned tasks for today:\n";
        modalContent.append(title, intro);
        tasks.forEach((task) => {
          {
            const firstTxt = document.createElement("div");
            firstTxt.textContent = `\t${task.title}`;

            modalContent.append(firstTxt);
          }
        });
        // setting time for showing the good morning modal
        const currentDate = new Date().toLocaleDateString();
        const lastDateOfUsage = localStorage.getItem("lastDateOfUsage");
        if (lastDateOfUsage !== currentDate) {
          console.log(localStorage.getItem("lastDateOfUsage"));
          localStorage.setItem("lastDateOfUsage", currentDate);
          modal.style.display = "flex";
        } else {
          modal.style.display = "none";
        }
      }
    });

    const okButton = document.createElement("gm-modal__button");
    okButton.classList.add("btn", "btn--ok");
    okButton.textContent = "Ok";

    okButton.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modalContent.append(okButton);

    modal.append(modalContent);

    return modal;
  }

  /**
   * Button component
   * @param text {string}
   * @param onClick {function}
   * @returns {HTMLButtonElement} - Button element
   */
  function Button({ text, onClick }) {
    const button = document.createElement("button");
    button.classList.add("container__new-task");
    button.innerHTML = text;
    button.onclick = onClick;
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

    // ----------------- TAGS -------------------------
    const tagContainer = document.createElement("div");
    tagContainer.classList.add("modal__content__tag-containers");

    const healthTag = document.createElement("div");
    healthTag.classList.add("tag", "health-tag");
    let selectedTag = null;

    healthTag.textContent = "health";
    healthTag.addEventListener("click", () => {
      healthTag.classList.toggle("health-selected");
      selectedTag = "health";
      workTag.classList.remove("work-selected");
      homeTag.classList.remove("home-selected");
      otherTag.classList.remove("other-selected");
    });

    const workTag = document.createElement("div");
    workTag.classList.add("tag", "work-tag");
    workTag.textContent = "work";
    workTag.addEventListener("click", () => {
      workTag.classList.toggle("work-selected");
      selectedTag = "work";
      healthTag.classList.remove("health-selected");
      homeTag.classList.remove("home-selected");
      otherTag.classList.remove("other-selected");
    });

    const homeTag = document.createElement("div");
    homeTag.classList.add("tag", "home-tag");
    homeTag.textContent = "home";
    homeTag.addEventListener("click", () => {
      homeTag.classList.toggle("home-selected");
      selectedTag = "home";
      healthTag.classList.remove("health-selected");
      workTag.classList.remove("work-selected");
      otherTag.classList.remove("other-selected");
    });

    const otherTag = document.createElement("div");
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

    const calendar = document.createElement("input");
    calendar.setAttribute("type", "date");
    calendar.classList.add("modal__content__calendar");

    const today = new Date().toISOString().substr(0, 10);
    calendar.defaultValue = today;

    calendar.addEventListener("change", (event) => {
      const selectedDate = event.target.value;
      // 2023-04-19
      console.log(selectedDate);
    });

    //-----------------  BUTTONS ------------------------------
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
      console.log(selectedTag);
      if (
        input.value.trim() !== "" &&
        calendar.value !== "" &&
        selectedTag !== null
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
      console.log(selectedTag);
      if (
        selectedTag !== null &&
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
      if (task !== "" && calendar.value !== "" && selectedTag !== "") {
        postTask(task, selectedTag, calendar.value);
        location.reload();
      }
    });

    const postTask = async (task, tag, date) => {
      try {
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

        const updatedTask = await response.json();
        console.log("Task updated:", updatedTask);
      } catch (error) {
        console.error(error);
      }
    };

    div.append(cancelButton, addButton);

    modalContent.append(title, input, tagContainer, calendar, div);

    modal.append(modalContent);
    return modal;
  }

  function InputTextEditor({ text, onChange }) {
    const input = document.createElement("input");
    input.classList.add("container__search");
    input.setAttribute("type", "text");
    input.placeholder = text;

    input.addEventListener("input", () => {
      searchText = input.value.trim();

      renderTasks(searchText);
      renderCompletedTasks(searchText);
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

    const gm_modal = new GoogMorningModal();
    container.append(gm_modal);

    // --------------  TITLE --------------------
    const header = document.createElement("div");
    header.classList.add("container__header");
    const title = document.createElement("span");
    title.textContent = "To Do List";
    title.classList.add("container__header--left");

    const weather = document.createElement("div");
    weather.classList.add("container__header--right");

    getTbilisiTemp().then(async (info) => {
      const img = document.createElement("img");
      img.classList.add("container__header--right__img");
      img.src = `http:${info.current.condition.icon}`;
      const temp = document.createElement("div");
      temp.classList.add("container__header--right__temp");
      temp.textContent = `${info.current.temp_c}\u00B0`;

      const city = document.createElement("div");
      city.classList.add("container__header--right__city");
      city.textContent = info.location.name;

      weather.append(img, temp, city);
    });

    header.append(title, weather);
    container.append(header);

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
    div.style.padding = "44px 0 42px 0";
    container.append(div);

    container.append(renderTasks(searchText));
    container.append(renderCompletedTasks(searchText));

    return container;
  }

  // RENDER all tasks
  function renderTasks(searchText) {
    const fetchTodoTasks = async () => {
      try {
        console.log(searchText);
        const response = await fetch("http://localhost:3004/tasks");
        const tasks = await response.json();
        const todoTasks = tasks.filter((task) => !task.isCompleted);
        const filteredTasks =
          searchText !== ""
            ? todoTasks.filter((task) =>
                task.title.toLowerCase().includes(searchText.toLowerCase())
              )
            : todoTasks;
        return filteredTasks;
      } catch (error) {
        console.error(error);
      }
    };

    const allTasksContainer = document.getElementById("all-tasks");
    allTasksContainer.innerHTML = "";
    const allTasksComponent = AllTasks({
      fetchTodoTasks,
      onCompleteTask: async (task) => {
        try {
          const response = await fetch(
            `http://localhost:3004/tasks/${task.id}`,
            {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: task.id,
                title: task.title,
                date: task.date,
                tag: task.tag,
                isCompleted: true,
              }),
            }
          );
          const updatedTask = await response.json();
          console.log("Task updated:", updatedTask);
        } catch (error) {
          console.error(error);
        }
        // renderApp();
      },
      onDeleteTask: async (task) => {
        try {
          const response = await fetch(
            `http://localhost:3004/tasks/${task.id}`,
            { method: "delete" }
          );
          const updatedTask = await response.json();
          console.log("Task updated:", updatedTask);
        } catch (error) {
          console.error(error);
        }
      },
    });
    allTasksContainer.append(allTasksComponent);
    return allTasksContainer;
  }

  // render completed tasks
  function renderCompletedTasks(searchText) {
    const fetchCompletedTasks = async () => {
      try {
        const response = await fetch("http://localhost:3004/tasks");
        const tasks = await response.json();
        const completedTasks = tasks.filter((task) => task.isCompleted);
        const filteredTasks =
          searchText !== ""
            ? completedTasks.filter((task) =>
                task.title.toLowerCase().includes(searchText.toLowerCase())
              )
            : completedTasks;
        return filteredTasks;
      } catch (error) {
        console.error(error);
      }
    };

    const completedTaskContainer = document.getElementById("completed-tasks");
    completedTaskContainer.innerHTML = "";

    const completedTaskComponent = CompletedTasks({
      fetchCompletedTasks,
      onClick: async (task) => {
        try {
          const response = await fetch(
            `http://localhost:3004/tasks/${task.id}`,
            {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: task.id,
                title: task.title,
                date: task.date,
                tag: task.tag,
                isCompleted: false,
              }),
            }
          );
          const updatedTask = await response.json();
          console.log("Task updated:", updatedTask);
        } catch (error) {
          console.error(error);
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
