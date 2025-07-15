import { useEffect, useState } from "react";
import { attemptLogin, fetchCurrentUserTasks } from "../services/apiTODOio";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router";

import Button from "../ui/Button";
import { useTask } from "../contexts/TaskContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAttempting, setIsAttempting] = useState(false);
  const [error, setError] = useState("");

  const { dispatch, isLoggedIn } = useAuth();
  const { dispatch: taskDispatch } = useTask();
  const navigator = useNavigate();

  useEffect(
    function () {
      if (isLoggedIn) {
        navigator("/app");
      }
    },
    [isLoggedIn, navigator]
  );

  async function handleSubmit(e) {
    setIsAttempting(true);
    dispatch({ type: "loading" });
    e.preventDefault();
    try {
      const data = await attemptLogin(username, password);
      if (data.status === "success") {
        const taskData = await fetchCurrentUserTasks();

        if (taskData.status === "success") {
          taskDispatch({ type: "setTasks", payload: taskData.data.tasks });
        }

        dispatch({ type: "login", payload: data.data.user });
        navigator("/app");
      } else {
        dispatch({ type: "logout" });
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsAttempting(false);
    }
  }

  return (
    <div className="flex mt-12 items-center justify-center px-4">
      <div className=" bg-white/80 border border-white/40 shadow-xl rounded-3xl p-10 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-amber-900 text-center mb-6">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder=" "
              onChange={(e) => setUsername(e.target.value)}
              className={`peer w-full rounded-lg border border-amber-400 bg-white/60 px-4 ${
                username === "" ? "pt-4" : "pt-6"
              } pb-2 text-amber-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-600 focus:pt-6 transition-all duration-300`}
            />
            <label
              htmlFor="username"
              className="absolute left-4 top-2 text-amber-700 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-amber-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-amber-700"
            >
              Username
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              className={`peer w-full rounded-lg border border-amber-400 bg-white/60 px-4 ${
                username === "" ? "pt-4" : "pt-6"
              } pb-2 text-amber-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-600 focus:pt-6 transition-all duration-300`}
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-amber-700 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-amber-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-amber-700"
            >
              Password
            </label>
          </div>

          {error && (
            <p className="text-center text-sm text-amber-800">{error}</p>
          )}

          <Button type="submit" disabled={isAttempting}>
            {isAttempting ? "Logging in..." : "Login"}
          </Button>

          <p className="text-center text-sm text-amber-800">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-amber-900 font-medium underline cursor-pointer hover:text-amber-600"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
