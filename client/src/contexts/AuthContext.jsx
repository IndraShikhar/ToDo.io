import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  status: "idle",
  username: "",
  email: "",
  profilePic: "",
  id: "",
  tasks: 0,
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, status: "loading" };

    case "login":
      localStorage.setItem("isLoggedIn", true);
      return {
        ...state,
        status: "idle",
        username: action.payload.username,
        email: action.payload.email,
        profilePic: action.payload.profilePic,
        id: action.payload._id,
        tasks: action.payload.tasks,
        isLoggedIn: true,
      };

    case "logout":
      localStorage.setItem("isLoggedIn", false);
      return {
        ...state,
        status: "idle",
        username: "",
        email: "",
        profilePic: "",
        id: "",
        tasks: 0,
        isLoggedIn: false,
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function AuthProvider({ children }) {
  const [
    { status, username, email, profilePic, id, tasks, isLoggedIn },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        status,
        username,
        email,
        profilePic,
        id,
        tasks,
        isLoggedIn,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
