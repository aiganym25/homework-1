import NewTaskModal from "../Modals/NewTaskModal/NewTaskModal";
import "./NewTaskButton.css";
interface Props {
  isOpenModal: boolean;
  closeModal: (isOpen: boolean) => void;
}
export default function NewTaskButtonComponent({
  isOpenModal,
  closeModal,
}: Props) {
  return (
    <>
      <button
        onClick={() => closeModal(isOpenModal)}
        className="new-task-button"
      >
        + New Task
      </button>
      <NewTaskModal isOpen={isOpenModal} toggle={closeModal} />
    </>
  );
}
