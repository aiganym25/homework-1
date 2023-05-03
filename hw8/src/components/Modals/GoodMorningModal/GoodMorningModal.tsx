import { Todo } from "../../../interfaces/Todo";
import "./GoodMorningModal.css";

interface Props {
  isShowedGM: boolean;
  todaysTasks: Todo[];
  onCloseGM: (isShowedGM: boolean) => void;
}
export default function GoodMorningModal({
  todaysTasks,
  isShowedGM,
  onCloseGM,
}: Props) {
  return (
    <>
      {!isShowedGM && todaysTasks.length !== 0 && (
        <div className="gm-modal">
          <div className="gm-modal__content">
            <h3 className="gm-modal__content__header">Good Morning</h3>
            <p>You have the next planned tasks for today:</p>
            <div className="task-container">
              {todaysTasks.map((task: Todo) => (
                <div key={task.id}>{task.title}</div>
              ))}
            </div>
            <div
              onClick={() => onCloseGM(isShowedGM)}
              className="gm-modal__button"
            >
              Ok
            </div>
          </div>
        </div>
      )}
    </>
  );
}
