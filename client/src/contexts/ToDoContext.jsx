import { createContext, useContext, useReducer } from "react";

const ToDoContext = createContext();

const initialState = { status: "idle", task: {} };
const reducer = (state, action) => {
  switch (action.type) {
    case "setTask":
      return { ...state, task: action.payload };
    case "editTask":
      return { ...state, status: "edit" };
    case "editDone":
      return { ...state, status: "idle", task: action.payload };
    case "editCancel":
      return { ...state, status: "idle" };
    default:
      return new Error(`Unknown action ${action.type}`);
  }
};

function ToDoProvider({ children }) {
  const [{ task }, dispatch] = useReducer(reducer, initialState);

  return (
    <ToDoContext.Provider value={{ task, dispatch }}>
      {children}
    </ToDoContext.Provider>
  );
}

const useToDo = function () {
  const context = useContext(ToDoContext);
  if (context === undefined) {
    throw new Error("useToDo must be used within a ToDoProvider");
  }
  return context;
};

export { ToDoProvider, useToDo };
