import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenModal } from "../../redux/modalSlice";
import { RootState } from "../../redux/reducers";
import NewTaskModal from "../Modals/NewTaskModal/NewTaskModal";
import "./NewTaskButton.css";

export default function NewTaskButtonComponent() {
  const dispatch = useDispatch();
  return (
    <>
      <button
        onClick={() => dispatch(setIsOpenModal(true))}
        className="new-task-button"
      >
        + New Task
      </button>
      <NewTaskModal />
    </>
  );
}
