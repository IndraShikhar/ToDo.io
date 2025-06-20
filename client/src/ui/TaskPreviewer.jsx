// import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToDo } from "../contexts/ToDoContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTask from "./EditTask";
import { useState } from "react";
import { deleteTask } from "../services/apiTODOio";
import { useTask } from "../contexts/TaskContext";

export default function TaskPreview({ setPreview }) {
  const { task, status: todoStatus, dispatch: todoDispatch } = useToDo();
  const { dispatch: taskDispatch } = useTask();
  const [editTask, setEditTask] = useState(false);
  const [error, setError] = useState("");

  function handleEdit() {
    todoDispatch({ type: "editTask" });
    setEditTask("edit");
  }

  async function handleDelete() {
    const data = await deleteTask(task._id);
    taskDispatch({ type: "deleteTask", payload: task._id });
    setPreview(false);
  }

  return (
    <>
      {editTask === "edit" && (
        <EditTask setEditTask={setEditTask} setError={setError} />
      )}

      <AnimatePresence>
        {
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-[90%] md:w-[500px] shadow-lg relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-4 text-amber-800 font-bold text-lg"
                onClick={() => setPreview(false)}
              >
                ×
              </button>
              {error && (
                <p className="text-red-50 bg-red-400 px-2 py-1 mt-4 mb-6 rounded wrap-break-word w-auto">
                  {error}
                </p>
              )}
              <h3 className="text-2xl font-bold text-amber-900 mb-2">
                {task.title}
              </h3>
              <p className="text-gray-700 mb-4">{task.description}</p>
              <p className="text-sm text-amber-700">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="flex items-center gap-1 bg-white text-amber-900 px-3 py-1 outline-2 rounded-lg"
                  onClick={handleEdit}
                >
                  <EditIcon />
                  <span>Edit</span>
                </button>
                <button
                  className=" flex items-center gap-1 bg-amber-900 text-white px-4 py-2 rounded-lg"
                  onClick={handleDelete}
                >
                  <DeleteIcon />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </>
  );
}
