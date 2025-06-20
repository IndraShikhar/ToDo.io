import { Outlet } from "react-router";
import Header from "./Header";
import { useEffect } from "react";
import { fetchCurrentUser, fetchCurrentUserTasks } from "../services/apiTODOio";
import { useAuth } from "../contexts/AuthContext";
import { useTask } from "../contexts/TaskContext";
import Loader from "../ui/Loader";
import { dividerClasses } from "@mui/material/Divider";

function AppLayout() {
  //   const pathname = window.location.pathname;

  const { dispatch } = useAuth();
  const { dispatch: taskDispatch } = useTask();
  const { status } = useAuth();

  useEffect(
    function () {
      async function fetchData() {
        dispatch({ type: "loading" });
        const data = await fetchCurrentUser();

        if (data.status === "fail") {
          console.log(data);
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

  //   return (
  //     <div className="flex h-screen md:p-4 lg:p-8 xl:p-12 transition-all duration-300">
  //       <div className="flex flex-col flex-1 w-full rounded-2xl overflow-hidden">
  //         <Header />
  //         <Outlet />
  //       </div>
  //     </div>
  //   );

  return (
    <div className="flex h-screen md:p-4 lg:p-8 xl:p-12 transition-all duration-300">
      {status === "loading" && <Loader />}
      <div className="flex flex-col bg-amber-50 flex-1 shadow-md md:rounded-2xl overflow-y-auto">
        {<Header />}
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
