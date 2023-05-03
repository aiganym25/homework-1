import { Todo } from "../../../interfaces/Todo";
import { formatDate } from "../../../service/date";
import Delete from "./assets/delete.svg";
import "./AllTasks.css";

interface Props {
  allTaskList: Todo[];
  handleDeleteTask: (task: Todo) => void;
  handleCompleteTask: (task: Todo) => void;
}

export default function AllTasks({
  allTaskList,
  handleDeleteTask,
  handleCompleteTask,
}: Props) {

  return (
    <div id="tasks">
      <div className="tasks__header">All Tasks</div>
      <ul className="task__list">
        {allTaskList &&
          allTaskList.map((task) => (
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
                  src={Delete}
                  alt="delete svg"
                  onClick={() => handleDeleteTask(task)}
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
