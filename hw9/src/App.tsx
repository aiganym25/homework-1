import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import GoodMorningModal from "./components/Modals/GoodMorningModal/GoodMorningModal";
import NewTaskButtonComponent from "./components/NewTaskButton/NewTaskButton";
import AllTasks from "./components/Tables/AllTasks/AllTasks";
import CompletedTasks from "./components/Tables/CompletedTasks/CompletedTasks";
import { Todo } from "./interfaces/Todo";
import SearchComponent from "./Search/SearchComponent";
import Header from "./components/Header/Header";

import {
  completeTask,
  deleteTask,
  fetchTodaysTasks,
  getCompletedTasks,
  getTasks,
  undoCompleteTask,
} from "./service/task";
import { useParams } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  const [searchText, setSearchText] = useState<string>("");
  const [allTaskList, setAllTaskList] = useState<Todo[]>([]);
  const [completedTaskList, setCompletedTaskList] = useState<Todo[]>([]);
  const [todaysTasks, setTodaysTasks] = useState<Todo[]>([]);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const param = useParams();
  // console.log(param.taskTitle);

  const tag = param.tag ?? "";
  // console.log(tag);

  const openNewTaskModal = () => {
    setIsNewTaskModalOpen(true);
  };

  const closeNewTaskModal = () => {
    setIsNewTaskModalOpen(false);
  };

  const onTextChangeHandler = (inputValue: string) => {
    setSearchText(inputValue);
  };

  const getTodaysTasks = useCallback(() => {
    fetchTodaysTasks().then((data) => setTodaysTasks(data));
  }, []);

  useEffect(() => {
    getTodaysTasks();
  }, [getTodaysTasks, isNewTaskModalOpen]);

  return (
    <Provider store={store}>
      <div className="container">
        <GoodMorningModal todaysTasks={todaysTasks} />
        <Header />
        <div className="flex">
          <SearchComponent onChangeText={onTextChangeHandler} />
          <NewTaskButtonComponent
            openNewTaskModal={openNewTaskModal}
            closeNewTaskModal={closeNewTaskModal}
            isNewTaskModalOpen={isNewTaskModalOpen}
          />
        </div>
        <AllTasks />
        <CompletedTasks />
      </div>
    </Provider>
  );
}
