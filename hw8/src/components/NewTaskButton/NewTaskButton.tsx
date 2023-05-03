import NewTaskModal from "../Modals/NewTaskModal/NewTaskModal";
import "./NewTaskButton.css";
interface Props {
  isNewTaskModalOpen: boolean;
  closeNewTaskModal: () => void;
  openNewTaskModal: () => void;
}
export default function NewTaskButtonComponent({ isNewTaskModalOpen, closeNewTaskModal, openNewTaskModal }: Props) {
  return (
    <>
      <button onClick={() => openNewTaskModal()} className="new-task-button">
        + New Task
      </button>
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        closeNewTaskModal={closeNewTaskModal}
      />
    </>
  );
}
