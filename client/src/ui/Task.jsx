import Checkbox from "./CheckBox";
// import OptionIcon from "./ui/OptionIcon";

import { useEffect, useState } from "react";
import TaskPreview from "./TaskPreviewer";
import { useToDo } from "../contexts/ToDoContext";
import Loader from "./Loader";
import { updateTask } from "../services/apiTODOio";
import { useTask } from "../contexts/TaskContext";

function Task({ task }) {
  const [preview, setPreview] = useState(false);
  const [completed, setCompleted] = useState(task.completed);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { dispatch: taskDispatch } = useTask();
  const { dispatch: todoDispatch } = useToDo();

  const handlePreview = function () {
    todoDispatch({ type: "setTask", payload: task });
    setPreview(true);
  };

  async function handleCompleted() {
    setIsLoading(true);
    try {
      const data = await updateTask({ ...task, completed: !completed });
      // const data = { ...task, completed: !completed };
      console.log(data);

      if (data.status === "success") {
        taskDispatch({ type: "updateTask", payload: data.data.task });
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      onClick={handlePreview}
      className="relative group rounded-2xl  bg-amber-200 p-6 flex items-center justify-center gap-4 hover:shadow-xl transition-all duration-300"
    >
      {preview && <TaskPreview task={task} setPreview={setPreview} />}
      {isLoading && <Loader />}

      <div className="flex items-center justify-center w-full gap-4">
        {/* Checkbox */}
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="mt-1"
        >
          <Checkbox
            setCompleted={setCompleted}
            value={completed}
            handleCompleted={handleCompleted}
          />
        </div>

        {/* Task Info */}
        <div className="flex-grow min-w-0">
          <h3 className="font-bold text-xl truncate">{task.title}</h3>
          <p className="italic text-md text-gray-700 truncate">
            {task.description}
          </p>
        </div>

        {/* Created Date */}
        <div className="flex flex-col justify-center items-center ml-auto text-xs md:text-sm  text-amber-800 text-right whitespace-nowrap">
          <p>Created</p>
          <p className="font-semibold">{task.createdAt.slice(0, 10)}</p>
        </div>
      </div>
    </div>
  );
}

export default Task;
