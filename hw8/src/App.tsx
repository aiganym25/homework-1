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
  const [todaysTasks, setTodaysTasks] = useState<Todo[]>([]);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const openNewTaskModal = () => {
    setIsNewTaskModalOpen(true);
  };

  const closeNewTaskModal = () => {
    setIsNewTaskModalOpen(false);
  };

  const onTextChangeHandler = (inputValue: string) => {
    setSearchText(inputValue);
  };

  const handleDeleteTask = useCallback(async (task: Todo) => {
    await deleteTask(task);
    fetchTodoTasks();
    fetchCompletedTasks();
  }, []);

  const handleCompleteTask = useCallback(async (task: Todo) => {
    await completeTask(task);
    fetchTodoTasks();
    fetchCompletedTasks();
  }, []);

  const handleUndoCompletedTask = useCallback(async (task: Todo) => {
    await undoCompleteTask(task);
    fetchCompletedTasks();
    fetchTodoTasks();
  }, []);

  const fetchTodoTasks = useCallback(() => {
    getTasks(searchText).then((data) => setAllTaskList(data));
  }, [searchText]);

  const fetchCompletedTasks = useCallback(() => {
    getCompletedTasks(searchText).then((data) => setCompletedTaskList(data));
  }, [searchText]);

  const getTodaysTasks = useCallback(() => {
    fetchTodaysTasks().then((data) => setTodaysTasks(data));
  }, []);

  useEffect(() => {
    fetchTodoTasks();
    fetchCompletedTasks();
    getTodaysTasks();
  }, [fetchTodoTasks, fetchCompletedTasks, getTodaysTasks, isNewTaskModalOpen]);

  return (
    <div className="container">
      <GoodMorningModal todaysTasks={todaysTasks} />
      <Header />
      <div className="flex">
        <SearchComponent
          searchQuery={searchText}
          onChangeText={onTextChangeHandler}
        />
        <NewTaskButtonComponent
          openNewTaskModal={openNewTaskModal}
          closeNewTaskModal={closeNewTaskModal}
          isNewTaskModalOpen={isNewTaskModalOpen}
        />
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
