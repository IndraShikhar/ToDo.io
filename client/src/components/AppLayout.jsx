import { Outlet } from "react-router";
import Header from "./Header";
import { useEffect } from "react";
import { fetchCurrentUser, fetchCurrentUserTasks } from "../services/apiTODOio";
import { useAuth } from "../contexts/AuthContext";
import { useTask } from "../contexts/TaskContext";
import Loader from "../ui/Loader";
import { dividerClasses } from "@mui/material/Divider";
import { useToDo } from "../contexts/ToDoContext";
import EditTask from "../ui/EditTask";

function AppLayout() {
  //   const pathname = window.location.pathname;

  const { dispatch, status } = useAuth();
  const { dispatch: taskDispatch } = useTask();
  const { dispatch: todoDispatch, status: todoStatus } = useToDo();

  useEffect(
    function () {
      async function fetchData() {
        dispatch({ type: "loading" });
        const data = await fetchCurrentUser();

        if (data.status === "fail") {
          dispatch({ type: "logout" });
        }

        if (data.status === "success") {
          const taskData = await fetchCurrentUserTasks();

          if (taskData.status === "success") {
            taskDispatch({ type: "setTasks", payload: taskData.data.tasks });
          }

          dispatch({ type: "login", payload: data.data.user });
        }
      }

      fetchData();
    },
    [dispatch, taskDispatch]
  );

  return (
    <>
      {/* {taskStatus === "loading" && <Loader />} */}
      <div className="flex h-screen md:p-4 lg:p-8 xl:p-12 transition-all duration-300">
        {status === "loading" && <Loader />}
        <div className="flex flex-col bg-amber-50 flex-1 shadow-md md:rounded-2xl overflow-y-auto">
          {<Header />}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AppLayout;
