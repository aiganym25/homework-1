import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsOpenModal, setModalType } from "../../redux/modalSlice";
import NewTaskModal from "../Modals/NewTaskModal/NewTaskModal";
import "./NewTaskButton.css";

export default function NewTaskButtonComponent() {
  const dispatch = useDispatch();

  const openNewTaskModal = () => {
    dispatch(setIsOpenModal(true));
    dispatch(setModalType("newTask"));
  };

  return (
    <>
      <button onClick={openNewTaskModal} className="new-task-button">
        + New Task
      </button>
      <NewTaskModal />
    </>
  );
}
