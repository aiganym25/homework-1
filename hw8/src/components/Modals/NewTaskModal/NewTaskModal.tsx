import { useState, useCallback } from "react";
import { addTask } from "../../../service/task";
import { Tag } from "../../Tag/Tag";
import "./NewTaskModal.css";

interface Props {
  isOpen: boolean;
  closeNewTaskModal: () => void;
}

export default function NewTaskModal(props: Props) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const today = new Date().toISOString().substr(0, 10);
  const [date, setDate] = useState<string>(today);

  const handleTagClick = useCallback((tag: string) => {
    setSelectedTag(tag);
    if (newTaskTitle !== "") {
      const buttonAdd = document.querySelector(".btn--add-task")!;
      buttonAdd.classList.add("btn--add-task--accepted");
    }
  }, [newTaskTitle]);

  const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
    if (event.target.value !== "" && selectedTag !== "") {
      const buttonAdd = document.querySelector(".btn--add-task")!;
      buttonAdd.classList.add("btn--add-task--accepted");
    }
  }, [selectedTag]);

  const handleAddButtonClick = useCallback(() => {
    if (newTaskTitle !== "" && selectedTag !== "") {
      addTask(newTaskTitle, selectedTag, date);
      setNewTaskTitle("");
      setSelectedTag("");
      props.closeNewTaskModal();
    }
  }, [date, newTaskTitle, props, selectedTag]);

  const handleCancelButtonClick = useCallback(() => {
    props.closeNewTaskModal();
    setNewTaskTitle("");
    setSelectedTag("");
  }, [props]);

  return (
    <>
      {props.isOpen && (
        <div className="modal">
          <div className="modal__content">
            <h3 className="modal__content__header">Add New Task</h3>
            <input
              className="modal__content__task-input"
              type="text"
              value={newTaskTitle}
              onChange={handleTitleChange}
              placeholder="Task Title"
            />
            <div className="modal__content__tag-containers">
              <Tag
                text="health"
                selected={selectedTag === "health"}
                onClick={() => {
                  handleTagClick("health");
                }}
              />
              <Tag
                text="work"
                selected={selectedTag === "work"}
                onClick={() => {
                  handleTagClick("work");
                }}
              />
              <Tag
                text="home"
                selected={selectedTag === "home"}
                onClick={() => {
                  handleTagClick("home");
                }}
              />
              <Tag
                text="other"
                selected={selectedTag === "other"}
                onClick={() => {
                  handleTagClick("other");
                }}
              />
            </div>

            <input
              defaultValue={date}
              type="date"
              className="modal__content__calendar"
              onChange={(e) => setDate(e.target.value)}
            ></input>

            <div className="flex">
              <button
                onClick={handleCancelButtonClick}
                className="btn btn--cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleAddButtonClick}
                className="btn btn--add-task"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
