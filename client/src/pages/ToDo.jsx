import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../ui/Button";
import Tasks from "../ui/Tasks";
import CreateNewTask from "../ui/CreateNewTask";

function ToDo() {
  const [createNewTask, setCreateNewTask] = useState(false);
  const { username, tasks: taskCount } = useAuth();

  return (
    <div className="flex flex-1 flex-col items-center justify-center mt-4 p-2 overflow-y-auto">
      {createNewTask && <CreateNewTask setCreateNewTask={setCreateNewTask} />}
      <div className="flex items-center justify-between w-full mb-2 lg:mb-4 px-4 lg:px-8 xl:px-12">
        <h1 className="mr-auto font-bold text-2xl text-amber-900 flex flex-col lg:text-3xl">
          Welcome Back, <span className="capitalize">{username}</span>
        </h1>
        <Button
          type={"primary"}
          onClick={() => {
            setCreateNewTask(true);
          }}
        >
          + Add Task
        </Button>
      </div>

      {taskCount > 0 && (
        <div className=" flex items-center gap-2 font-semibold bg-red-100 text-amber-900 p-4 rounded-2xl mb-6">
          <span className="text-amber-900 font-bold text-2xl">&#x2022;</span>
          <p>Once a task is marked done it can not be undone !!</p>
        </div>
      )}

      <div className="w-full flex-1 overflow-y-auto">
        {/* <TaskPreview tasks={tasks} /> */}
        <Tasks />
      </div>
    </div>
  );
}

export default ToDo;
