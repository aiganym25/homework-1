import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import GoodMorningModal from "./components/Modals/GoodMorningModal/GoodMorningModal";
import NewTaskButtonComponent from "./components/NewTaskButton/NewTaskButton";
import SearchComponent from "./components/Search/SearchComponent";
import AllTasks from "./components/Tables/AllTasks/AllTasks";
import CompletedTasks from "./components/Tables/CompletedTasks/CompletedTasks";
import { Todo } from "./interfaces/Todo";
import {
  completeTask,
  deleteTask,
  fetchTodaysTasks,
  getCompletedTasks,
  getTasks,
  undoCompleteTask,
} from "./service/task";

function App() {
  const [searchText, setSearchText] = useState<string>("");
  const [allTaskList, setAllTaskList] = useState<Todo[]>([]);
  const [completedTaskList, setCompletedTaskList] = useState<Todo[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [todaysTasks, setTodaysTasks] = useState<Todo[]>([]);

  const onTextChangeHandler = (inputValue: string) => {
    setSearchText(inputValue);
  };
  const handleDeleteTask = async (task: Todo) => {
    await deleteTask(task);
    fetchTodoTasks();
    fetchCompletedTasks();
  };

  const handleCompleteTask = async (task: Todo) => {
    await completeTask(task);
    fetchTodoTasks();
    fetchCompletedTasks();
  };
  const handleUndoCompletedTask = async (task: Todo) => {
    await undoCompleteTask(task);
    fetchCompletedTasks();
    fetchTodoTasks();
  };

  const fetchTodoTasks = useCallback(() => {
    getTasks(searchText).then((data) => setAllTaskList(data));
  }, [searchText]);

  const fetchCompletedTasks = useCallback(() => {
    getCompletedTasks(searchText).then((data) => setCompletedTaskList(data));
  }, [searchText]);

  const [isShowedGM, setIsShowedGM] = useState(true);

  const showGMrModal = useCallback(() => {
    const currentDate: string = new Date().toLocaleDateString();
    const lastDateOfUsage: string | null =
      localStorage.getItem("lastDateOfUsage");
      console.log( localStorage.getItem("lastDateOfUsage"));
      console.log(currentDate);
    if (lastDateOfUsage !== currentDate) {
      localStorage.setItem("lastDateOfUsage", currentDate);
      setIsShowedGM(false);
    } else {
      setIsShowedGM(true);
    }
  }, []);

  const closeGMrModal = useCallback(() => {
    setIsShowedGM(!isShowedGM);
  }, []);

  const toggle = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const getTodaysTasks = useCallback(() => {
    fetchTodaysTasks().then((data) => setTodaysTasks(data));
  }, []);

  useEffect(() => {
    fetchTodoTasks();
    fetchCompletedTasks();
    showGMrModal();
    getTodaysTasks();
  }, [fetchTodoTasks, fetchCompletedTasks, showGMrModal, getTodaysTasks]);

  return (
    <div className="container">
      <GoodMorningModal
        isShowedGM={!isShowedGM}
        todaysTasks={todaysTasks}
        onCloseGM={closeGMrModal}
      />
      <Header />
      <div className="flex">
        <SearchComponent
          searchQuery={searchText}
          onChangeText={onTextChangeHandler}
        />
        <NewTaskButtonComponent isOpenModal={isOpenModal} closeModal={toggle} />
      </div>
      <AllTasks
        allTaskList={allTaskList}
        handleDeleteTask={handleDeleteTask}
        handleCompleteTask={handleCompleteTask}
      />
      <CompletedTasks
        completedTaskList={completedTaskList}
        handleUndoCompletedTask={handleUndoCompletedTask}
      />
    </div>
  );
}

export default App;
