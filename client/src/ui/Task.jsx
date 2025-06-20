import Checkbox from "./CheckBox";
// import OptionIcon from "./ui/OptionIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";

function Task({ task }) {
  const [option, setOption] = useState(false);
  const [completed, setCompleted] = useState(task.completed);

  useEffect(
    function () {
      console.log(
        `Task ${task._id} with title '${task.title}' is ${completed}`
      );
    },
    [completed, task._id, task.title]
  );

  return (
    <div className="relative group rounded-2xl shadow-lg bg-amber-100 p-6 flex items-center justify-center gap-4 hover:shadow-xl transition-all duration-300">
      {/* Options Icon */}
      <div className="absolute top-3 right-3">
        <button
          onClick={() => setOption(!option)}
          className="text-amber-900 hover:text-amber-700"
        >
          <MoreVertIcon />
        </button>
        {option && (
          <>
            <div className="absolute right-0 mt-2 w-28 bg-white border border-amber-200 rounded-lg shadow-md z-20">
              <button className="w-full text-left px-4 py-2 hover:bg-amber-100 flex items-center gap-2">
                <EditIcon fontSize="small" /> Edit
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-amber-100 flex items-center gap-2 text-red-600">
                <DeleteIcon fontSize="small" /> Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Checkbox */}
      <div className="mt-1">
        <Checkbox setCompleted={setCompleted} value={completed} />
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
  );
}

export default Task;
