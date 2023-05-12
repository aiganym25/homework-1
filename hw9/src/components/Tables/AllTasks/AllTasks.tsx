import { Todo } from "../../../interfaces/Todo";
import { formatDate } from "../../../service/date";
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
import { DeleteIcon } from "./assets/Delete";
import { BiEdit } from "react-icons/bi";
import {
  setIsOpenModal,
  setModalType,
  setTaskId,
} from "../../../redux/modalSlice";
import {
  completeTaskThunk,
  deleteTaskThunk,
  loadTasksThunks,
} from "../../../redux/tasksThunks";

export default function AllTasks() {
  const dispatch = useDispatch();

  const searchText = useSelector((state: RootState) => state.search);
  const tagSelected = useSelector((state: RootState) => state.tag);
  const notCompletedTasks = useSelector((state: RootState) =>
    selectNotCompletedTasks(state)
  );

  async function loadTasks() {
    loadTasksThunks(searchText.query, tagSelected.tag, dispatch);
  }

  function handleDeleteTask(id: number) {
    deleteTaskThunk(id, dispatch);
  }

  async function handleCompleteTask(task: Todo) {
    completeTaskThunk(task, dispatch);
  }

  const openEditTaskModal = (taskId: number) => {
    dispatch(setTaskId(taskId));
    dispatch(setIsOpenModal(true));
    dispatch(setModalType("editTask"));
  };



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
              <div className="inline">
                <div className="space-between">
                  <div className="inline">
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
                  </div>
                  <div className="icons">
                    <BiEdit
                      className="icon-left"
                      onClick={() => openEditTaskModal(task.id)}
                    />
                    <DeleteIcon onClick={() => handleDeleteTask(task.id)} />
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
