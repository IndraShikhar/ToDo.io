import { useState } from "react";
import { updateTask } from "../services/apiTODOio";
import { useTask } from "../contexts/TaskContext";
import { LoadingIcon } from "./Loader";
import { useToDo } from "../contexts/ToDoContext";

function EditTask({ setEditTask, setError }) {
  const { status, dispatch: taskDispatch } = useTask();
  const { dispatch: todoDispatch, task } = useToDo();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      taskDispatch({ type: "loading" });
      const data = await updateTask({ _id: task._id, title, description });

      if (data.status === "success") {
        taskDispatch({ type: "updateTask", payload: data.data.task });
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setEditTask(false);
      setIsLoading(false);
    }
  }

  return (
    <>
      {status === "loading" && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
          <LoadingIcon />
        </div>
      )}

      {isLoading && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <LoadingIcon />
        </div>
      )}

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-white rounded-3xl shadow-xl p-8 w-[90%] max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-amber-900 text-center">
          Create New Task
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="title"
              className="block font-semibold text-amber-800 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
              className="w-full p-3 rounded-lg bg-amber-50 border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-900"
              placeholder="Task title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block font-semibold text-amber-800 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
              className="w-full p-3 rounded-lg bg-amber-50 border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-900"
              placeholder="Task description"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-4 mt-2">
            <button
              type="button"
              onClick={() => {
                todoDispatch({ type: "editCancel" });
                setEditTask(false);
              }}
              className="px-4 py-2 rounded-lg border-2 border-amber-900 text-amber-900 font-semibold hover:bg-amber-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-amber-900 text-white font-semibold hover:bg-amber-800 transition"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditTask;
