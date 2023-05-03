import { useCallback, useEffect, useState } from "react";
import { Todo } from "../../../interfaces/Todo";
import "./GoodMorningModal.css";

interface Props {
  todaysTasks: Todo[];
}
export default function GoodMorningModal({ todaysTasks }: Props) {
  const [isShowedGM, setIsShowedGM] = useState(true);

  const showGMrModal = useCallback(() => {
    const currentDate: string = new Date().toLocaleDateString();
    const lastDateOfUsage: string | null =
      localStorage.getItem("lastDateOfUsage");
    if (lastDateOfUsage !== currentDate) {
      localStorage.setItem("lastDateOfUsage", currentDate);
      setIsShowedGM(false);
    } else {
      setIsShowedGM(true);
    }
  }, []);

  const closeGMrModal = useCallback(() => {
    setIsShowedGM(true);
  }, []);

  useEffect(() => {
    showGMrModal();
  }, [showGMrModal]);

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
            <div onClick={() => closeGMrModal()} className="gm-modal__button">
              Ok
            </div>
          </div>
        </div>
      )}
    </>
  );
}
