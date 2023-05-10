import { Todo } from "../../../interfaces/Todo";
import { formatDate } from "../../../service/date";
import "./CompletedTasks.css";
// import CheckedCheckbox from "./assets/completedCheckbox.svg";
import React from "react";
import {
  selectCompletedTasks,
  undoCompleteTask,
} from "../../../redux/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CompletedTasks() {
  const notCompletedTasks = useSelector(selectCompletedTasks);
  const dispatch = useDispatch();

  async function handleUndoCompletedTask(task: Todo) {
    const undoCompletedItem: Todo = {
      id: task.id,
      title: task.title,
      date: task.date,
      tag: task.tag,
      isCompleted: false,
    };
    try {
      await fetch(`http://localhost:3004/tasks/${task.id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(undoCompletedItem),
      });
      dispatch(undoCompleteTask(task.id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="completed-tasks">
      <div className="completed-tasks__header">Completed Tasks</div>
      <ul className="completed-task__list">
        {notCompletedTasks &&
          notCompletedTasks.map((task: Todo) => (
            <li className="completed-task__list__item" key={task.id}>
              <img
                className="checkded-checkbox"
                src="/assets/completedCheckbox.svg"
                alt="delete svg"
                onClick={() => handleUndoCompletedTask(task)}
              />
              <div className="completed-task__list__item-info">
                <span className="completed-task__list__item-info__title">
                  {task.title}
                </span>
                <div className="completed-task__list__item-info__paddingTop">
                  <div className="completed-tag">{task.tag}</div>
                  <div className="completed-task__list__item-info__date">
                    {formatDate(task.date)}
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
