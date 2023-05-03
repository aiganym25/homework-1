import { Todo } from "../../../interfaces/Todo";
import { formatDate } from "../../../service/date";
import "./CompletedTasks.css";
import CheckedCheckbox from "./assets/completedCheckbox.svg";

interface Props {
  completedTaskList: Todo[];
  handleUndoCompletedTask: (task: Todo) => void;
}
export default function CompletedTasks({
  completedTaskList,
  handleUndoCompletedTask,
}: Props) {
  return (
    <div id="completed-tasks">
      <div className="completed-tasks__header">Completed Tasks</div>
      <ul className="completed-task__list">
        {completedTaskList &&
          completedTaskList.map((task: Todo) => (
            <li className="completed-task__list__item" key={task.id}>
              <img
                className="checkded-checkbox"
                src={CheckedCheckbox}
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
