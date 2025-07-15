import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import ToDo from "./pages/ToDo";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AppLayout from "./components/AppLayout";
import { AuthProvider } from "./contexts/AuthContext";
import Protected from "./ui/Protected";
import { TaskProvider } from "./contexts/TaskContext";
import { ToDoProvider } from "./contexts/ToDoContext";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/app",
          element: (
            <Protected>
              <ToDo />
            </Protected>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <TaskProvider>
        <ToDoProvider>
          <RouterProvider router={router} />
        </ToDoProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
