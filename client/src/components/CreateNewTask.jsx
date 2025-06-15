import OverLay from "./ui/OverLay";
import { useState } from "react";
import Cookie from "js-cookie";
import { useToDo } from "../contexts/ToDoContext";

function CreateNewTask({ handleCreateNewTaskCancle }) {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const { setTasks } = useToDo();
  const { API } = useToDo();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Task:", formData);
    // Add your task creation logic here

    async function createTask() {
      const token = Cookie.get("jwt");
      const result = await fetch(`${API}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await result.json();
      setTasks((prev) => [...prev, data.data.task]);

      console.log(data);
    }

    createTask();
    handleCreateNewTaskCancle();
  };

  return (
    <>
      <OverLay onClick={handleCreateNewTaskCancle} />
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
              value={formData.title}
              onChange={handleChange}
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
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-amber-50 border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-900"
              placeholder="Task description"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-4 mt-2">
            <button
              type="button"
              onClick={handleCreateNewTaskCancle}
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
