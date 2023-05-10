import { Todo } from "../../../interfaces/Todo";
import { formatDate } from "../../../service/date";
// import Delete from "./assets/delete.svg";
import "./AllTasks.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import {
  completeTask,
  deleteTask,
  getTasks,
  selectNotCompletedTasks,
} from "../../../redux/tasksSlice";

const deleteSVG = require("./assets/delete.svg") as string;

export default function AllTasks() {
  const dispatch = useDispatch();

  const searchText = useSelector((state: RootState) => state.search);
  const tagSelected = useSelector((state: RootState) => state.tag);

  const notCompletedTasks = useSelector(selectNotCompletedTasks);

  async function loadTasks() {
    try {
      const response: Response = await fetch("http://localhost:3004/tasks");
      const tasksResponse: Todo[] = await response.json();

      let filteredTasks = tasksResponse;

      if (searchText.query !== "" && tagSelected.tag !== "All") {
        // Filter by both searchText and tagSelected
        filteredTasks = filteredTasks.filter(
          (task: Todo) =>
            task.title
              .toLowerCase()
              .includes(searchText.query?.toLowerCase() ?? "") &&
            task.tag === tagSelected.tag.toLowerCase()
        );
      } else if (searchText.query !== "") {
        // Filter by searchText only
        filteredTasks = filteredTasks.filter((task: Todo) =>
          task.title
            .toLowerCase()
            .includes(searchText.query?.toLowerCase() ?? "")
        );
      } else if (tagSelected.tag !== "All") {
        // Filter by tagSelected only
        filteredTasks = filteredTasks.filter(
          (task) => task.tag === tagSelected.tag.toLowerCase()
        );
      }

      dispatch(getTasks(filteredTasks));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteTask(id: number) {
    try {
      await fetch(`http://localhost:3004/tasks/${id}`, {
        method: "delete",
      });
      dispatch(deleteTask(id));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCompleteTask(task: Todo) {
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
      dispatch(completeTask(task.id));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [dispatch, searchText, tagSelected]);

  return (
    <div id="tasks">
      <div className="tasks__header">All Tasks</div>
      <ul className="task__list">
        {notCompletedTasks &&
          notCompletedTasks.map((task) => (
            <li className="task__list__item" key={task.id}>
              <div className="flex">
                <div
                  className="checkbox"
                  onClick={() => handleCompleteTask(task)}
                />
                <div className="task__list__item-info">
                  <span className="task__list__item-info__title" id="todo">
                    {task.title}
                  </span>
                  <div className="task__list__item-info__paddingTop">
                    <div className={`tag ${task.tag}-tag`}>{task.tag}</div>
                    <div className="task__list__item-info__date">
                      {formatDate(task.date)}
                    </div>
                  </div>
                </div>
                <img
                  className="task__list__item__delete-svg"
                  src={deleteSVG}
                  alt="delete svg"
                  onClick={() => handleDeleteTask(task.id)}
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
