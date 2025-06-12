import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToDo } from "../contexts/ToDoContext";
import Cookie from "js-cookie";
import Redirect from "./Redirect";
import AlertBar from "../components/ui/AlertBar";

function Login() {
  const navigate = useNavigate();

  const { loggedIn, setLoggedIn, API } = useToDo();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt:", credentials);
    // Add authentication logic here

    async function attemptLogin() {
      const result = await fetch(`${API}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await result.json();
      if (data.status === "success") {
        Cookie.set("jwt", data.data.token, { expires: 1 });
        setLoggedIn(true);
      } else {
        setError(data.message);
      }
    }

    attemptLogin();
  };

  useEffect(() => {
    async function checkLogin() {
      const token = Cookie.get("jwt");
      if (token) {
        try {
          const result = await fetch(`${API}/user/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log(result);

          const data = await result.json();
          if (data.status === "success") {
            setLoggedIn(true);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    checkLogin();
  }, [setLoggedIn, API]);

  useEffect(() => {
    if (loggedIn) navigate("/app");
  }, [navigate, loggedIn]);

  if (loggedIn) return <Redirect page={"app"} />;

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-amber-50">
      <div className="w-[95%] max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-300">
        <h2 className="text-4xl font-bold text-white text-center bg-amber-900 p-6 mb-4">
          Login
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 px-8 pb-8">
          {/* Username */}
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-sm font-semibold mb-1 text-amber-800"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="p-2 rounded-lg bg-amber-100 focus:outline-amber-900"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="flex justify-between text-sm font-semibold mb-1 text-amber-800"
            >
              <span>Password</span>
              <span className="text-amber-900 text-xs cursor-pointer hover:underline">
                Forgot?
              </span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="p-2 rounded-lg bg-amber-100 focus:outline-amber-900"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="p-3 mt-2 rounded-lg bg-amber-900 text-white font-bold hover:bg-amber-800 transition-all duration-300"
          >
            Login
          </button>

          {/* Navigation to Signup */}
          <p className="text-sm text-center mt-4">
            Don{"'"}t have an account?{" "}
            <span
              className="text-amber-900 font-semibold cursor-pointer underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
      {error && <AlertBar message={error} onClose={() => setError("")} />}
    </div>
  );
}

export default Login;
