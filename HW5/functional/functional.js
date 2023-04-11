(function () {
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
   * @param items {string[]}
   * @returns {HTMLElement} - List element
   */
  function AllTasks({ items }) {
    const listContent = document.createElement("div");
    listContent.style.width = "40%";
    listContent.style.marginBottom = "32px";
    // ---------- TITLE -----------------------
    const title = document.createElement("div");
    title.textContent = "All Tasks";
    title.style.cssText =
      "font-size: 24px; font-weight: 700; font-family: Nunito; line-height: 32px;padding-bottom: 16px";

    // ----------List ----------------------
    listContent.append(title);
    const listItems = items.map((item) => `<li>${item}</li>`).join("");
    const ul = document.createElement("ul");
    ul.innerHTML = listItems;
    ul.style.cssText =
      "list-style-type: none; font-weight: 400; font-family: Nunito";

    // ----------List tile ----------------------

    ul.innerHTML = items
      .map(
        (item, index) => `
      <li style = "margin-bottom: 12px">
        <div style="display: flex">
            <input type="checkbox" class = "checkbox" id="checkbox-${index}" style="margin-right: 20px; width: 21px; height: 21px">
            <span style = "font-size: 18px; font-weight: 400; font-family: Nunito; color: #1D1D1D">${item}</span>
            <img src = './assets/bin.svg' class = "delete" alt = 'svg' style="margin-left: auto"/>
        </div>
      </li>
    `
      )
      .join("");

    listContent.append(ul);

    return listContent;
  }

  function CompletedTasks({ items }) {
    const listContent = document.createElement("div");
    listContent.style.width = "40%";
    const title = document.createElement("div");
    title.textContent = "Completed Tasks";
    title.style.cssText =
      "font-size: 24px; font-weight: 700; font-family: Nunito; line-height: 32px;padding-bottom: 16px";

    listContent.append(title);
    const ul = document.createElement("ul");
    ul.style.listStyleType = "none";

    items.forEach((item, index) => {
      const li = document.createElement("li");
      li.style.marginBottom = "12px";
      const div = document.createElement("div");
      div.style.display = "flex";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;
      checkbox.id = `checkbox-${index}`;
      checkbox.classList.add("checkbox"); // Add CSS class to apply styles
      div.appendChild(checkbox);

      const completedTask = document.createElement("span");
      completedTask.textContent = item;

      completedTask.style.cssText =
        "font-size: 18px; font-weight: 400; font-family: Nunito";

      div.appendChild(completedTask);

      li.appendChild(div);
      ul.appendChild(li);
    });

    listContent.append(ul);
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
      "background-color: rgba(60, 134, 244, 0.15); padding: 16px 32px; border: none; font-size: 16px; font-weight: 800; color: #0053CF; height: 52px; white-space: nowrap; border-radius: 12px";
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
    cancelButton.classList.add("btn", "btn--cancel");

    cancelButton.textContent = "Cancel";

    const addButton = document.createElement("button");
    addButton.classList.add("btn", "btn--add-task");
    addButton.textContent = "Add task";
    div.append(cancelButton, addButton);

    modalContent.append(title, input, div);

    modal.append(modalContent);
    return modal;
  }

  function InputTextEditor({ text }) {
    const input = document.createElement("input");
    input.classList.add("input");
    input.setAttribute("type", "text");
    input.placeholder = text;
    return input;
  }

  /**
   * App container
   * @returns {HTMLDivElement} - The app container
   */
  function App() {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    function addItem() {
      setItems([...items, `Item ${items.length + 1}`]);
    }

    function showModal() {
      const modal = ModalForm({ text: "Add New Task" });
      modal.style.display = "block";
      container.append(modal);
      //   console.log(modal.classList);
    }


    function handleSearch(event) {
      //   const term = event.target.value;
      //   setSearchTerm(term);
      //   // Filter the items based on search term
      //   const results = items.filter((item) =>
      //     item.toLowerCase().includes(term.toLowerCase())
      //   );
      //   setSearchResults(results);
    }

    const container = document.createElement("div");
    container.classList.add("container");

    // --------------  TITLE --------------------
    const title = document.createElement("header");
    title.textContent = "To Do List";
    container.append(title);

    // --------------- SEARCH  AND NEW TASK --------------------
    const div = document.createElement("div");
    div.classList.add("flex");

    const addNewTaskButton = Button({ text: "+ New Task", onClick: showModal });

    const search = InputTextEditor({ text: "Search Task" });

    div.append(search, addNewTaskButton);
    container.append(div);

    // --------------- List --------------------
    const allTasks = AllTasks({ items: searchTerm ? searchResults : items });
    const completedList = CompletedTasks({
      items: searchTerm ? searchResults : items,
    });

    // new task
    // remove the task
    allTasks.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
      }
    });

    // change the checkbox
    allTasks.addEventListener("click", (e) => {
      if (e.target.classList.contains("checkbox")) {
      }
    });
    container.append(allTasks, completedList);
    return container;
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

  // initial render
  renderApp();
})();
