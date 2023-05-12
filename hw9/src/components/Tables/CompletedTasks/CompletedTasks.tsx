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
import CompletedCheckboxIcon from "./assets/CompletedCheckboxIcon";
import { undoCompletedTaskThunk } from "../../../redux/tasksThunks";

export default function CompletedTasks() {
  const notCompletedTasks = useSelector(selectCompletedTasks);
  const dispatch = useDispatch();

  async function handleUndoCompletedTask(task: Todo) {
    undoCompletedTaskThunk(task, dispatch);
  }

  return (
    <div id="completed-tasks">
      <div className="completed-tasks__header">Completed Tasks</div>
      <ul className="completed-task__list">
        {notCompletedTasks &&
          notCompletedTasks.map((task: Todo) => (
            <li className="completed-task__list__item" key={task.id}>
              <CompletedCheckboxIcon
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
