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
import TagsSelector from "./components/Tags/TagsSelector";

export default function App() {
  const [todaysTasks, setTodaysTasks] = useState<Todo[]>([]);

  const param = useParams();
  // console.log(param.taskTitle);

  const tag = param.tag ?? "";
  // console.log(tag);

  const getTodaysTasks = useCallback(() => {
    fetchTodaysTasks().then((data) => setTodaysTasks(data));
  }, []);

  useEffect(() => {
    getTodaysTasks();
  }, [getTodaysTasks]);

  return (
    <Provider store={store}>
      <div className="container">
        <GoodMorningModal todaysTasks={todaysTasks} />
        <Header />
        <div className="flex">
          <SearchComponent />
          <NewTaskButtonComponent />
        </div>
        <TagsSelector/>
        <AllTasks />
        <CompletedTasks />
      </div>
    </Provider>
  );
}
