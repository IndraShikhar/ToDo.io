import { createContext, useContext, useState } from "react";

const ToDoContext = createContext();

// eslint-disable-next-line react/prop-types
function ToDoProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  let API;

  if (import.meta.env.VITE_ENV === "DEVELOPMENT") {
    API = import.meta.env.VITE_SERVER_DEV;
  } else {
    API = import.meta.env.VITE_SERVER_PROD;
  }

  const value = {
    loggedIn,
    setLoggedIn,
    tasks,
    setTasks,
    user,
    setUser,
    API,
  };

  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
}

const useToDo = function () {
  const context = useContext(ToDoContext);
  if (context === undefined)
    throw new Error("ToDoContext was used outside of the ToDoProvider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ToDoProvider, useToDo };
