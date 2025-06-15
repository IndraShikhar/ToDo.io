import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDo from "./pages/ToDo";
// import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Redirect from "./pages/Redirect";
import { ToDoProvider } from "./contexts/ToDoContext";
// import dotenv from "dotenv";
// dotenv.config({ path: "./config.env" });

function App() {
  return (
    <BrowserRouter>
      <ToDoProvider>
        <Routes>
          <Route path="/*" element={<Redirect page={"login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/app" element={<ToDo />} />
        </Routes>
      </ToDoProvider>
    </BrowserRouter>
  );
}

export default App;
