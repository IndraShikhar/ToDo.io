import { useEffect, useState } from "react";
import Button from "./../components/ui/Button";
import UserCard from "./../components/UserCard";
import FilterListIcon from "@mui/icons-material/FilterList";
import ConfirmLogout from "./../components/ConfirmLogout";
import CreateNewTask from "./../components/CreateNewTask";
import Tasks from "./../components/Tasks";
import Cookie from "js-cookie";
import { useToDo } from "../contexts/ToDoContext";
import UpdateProfile from "../components/UpdateProfile";

function ToDo() {
  const [overlay, setOverlay] = useState(false);
  const [createNewTask, setCreateNewTask] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  const { setTasks, setUser, API } = useToDo();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const token = Cookie.get("jwt");
        const res = await fetch(`${API}/user/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        const { _id, username, displayname, email, photo } = data.data.user;
        setUser({
          _id,
          username,
          displayname,
          email,
          photo,
        });
        setTasks(data.data.user.tasks);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchTasks();
  }, [API, setTasks, setUser]);

  function handleLogoutButton() {
    setOverlay((overlay) => !overlay);
  }

  function handleLogoutCancle() {
    setOverlay((overlay) => !overlay);
  }

  function handleCreateNewTask() {
    setCreateNewTask((createNewTask) => !createNewTask);
  }

  function handleCreateNewTaskCancle() {
    setCreateNewTask((createNewTask) => !createNewTask);
  }

  return (
    <div
      className={`no-scrollbar transition-all duration-300 ${
        overlay || createNewTask
          ? "fixed inset-0 z-20 bg-amber-50"
          : "relative z-0 overflow-y-auto max-h-screen bg-amber-50"
      }`}
    >
      {overlay && <ConfirmLogout handleLogoutCancle={handleLogoutCancle} />}
      {createNewTask && (
        <CreateNewTask handleCreateNewTaskCancle={handleCreateNewTaskCancle} />
      )}
      {editProfile && (
        <UpdateProfile onClose={setEditProfile} onSave={() => {}} />
      )}

      <div
        className={`m-6 md:m-8 pb-10 transition-all ${
          overlay || createNewTask ? "blur-sm pointer-events-none" : ""
        } bg-white rounded-3xl shadow-xl flex flex-col gap-6`}
      >
        <UserCard
          handleLogout={handleLogoutButton}
          setEditProfile={setEditProfile}
        />

        <div className="flex justify-between items-center px-6 md:px-12">
          <Button content="Filter" icon={<FilterListIcon />} />
          <Button content="+ New Task" onClick={handleCreateNewTask} />
        </div>

        <Tasks />
      </div>
    </div>
  );
}

export default ToDo;
