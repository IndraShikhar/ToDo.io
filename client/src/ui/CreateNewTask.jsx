import { useState } from "react";
import { createTask } from "../services/apiTODOio";
import { useTask } from "../contexts/TaskContext";
import { LoadingIcon } from "./Loader";

function CreateNewTask({ setCreateNewTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { status, dispatch: taskDispatch } = useTask();

  async function handleSubmit(e) {
    e.preventDefault();
    taskDispatch({ type: "loading" });
    const data = await createTask(title, description);

    if (data.status === "success") {
      taskDispatch({ type: "addTask", payload: data.data.task });

      setCreateNewTask(false);
    } else {
      alert(data.data.message);
    }
  }

  return (
    <>
      {status === "loading" && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
          <LoadingIcon />
        </div>
      )}

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white rounded-3xl shadow-xl p-8 w-[90%] max-w-md flex flex-col gap-6">
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
              onClick={() => setCreateNewTask(false)}
              className="px-4 py-2 rounded-lg border-2 border-amber-900 text-amber-900 font-semibold hover:bg-amber-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-amber-900 text-white font-semibold hover:bg-amber-800 transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateNewTask;
