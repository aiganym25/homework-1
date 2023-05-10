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
  fetchTasks,
  selectNotCompletedTasks,
} from "../../../redux/tasksSlice";

const deleteSVG = require("./assets/delete.svg") as string;
console.log(deleteSVG);

export default function AllTasks() {
  const dispatch = useDispatch();

  const tasks = useSelector((state: RootState) => state.tasks);
  const searchText = useSelector((state: RootState) => state.search);

  const notCompletedTasks = useSelector(selectNotCompletedTasks);

  async function loadTasks() {
    try {
      const response: Response = await fetch("http://localhost:3004/tasks");
      const tasksResponse: Todo[] = await response.json();
      // const filteredTasks =
      //   searchText !== ""
      //     ? tasksResponse.filter((task: Todo) =>
      //         task.title.toLowerCase().includes(searchText.toLowerCase())
      //       )
      //     : tasksResponse;
      dispatch(fetchTasks(tasksResponse));
    } catch (er) {
      console.log(er);
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
      console.log("fdkf");
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
      console.log(response.status);
      dispatch(completeTask(task.id));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [dispatch]);

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
