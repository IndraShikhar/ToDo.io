import { createContext, useContext, useReducer } from "react";

const TaskContext = createContext();

const initialState = {
  status: "idle",
  tasks: [],
};

const reducer = function (state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, status: "loading" };

    case "setTasks":
      return { ...state, tasks: action.payload, status: "idle" };

    case "addTask":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        status: "idle",
      };
    case "updateTask":
      action.payload.completed = !action.payload.completed;

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
        status: "idle",
      };
    case "deleteTask":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        status: "idle",
      };

    default:
      return new Error(`Unknown action ${action.type}`);
  }
};

function TaskProvider({ children }) {
  const [{ status, tasks }, dispatch] = useReducer(reducer, initialState);

  return (
    <TaskContext.Provider value={{ status, tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}

export { TaskProvider, useTask };
