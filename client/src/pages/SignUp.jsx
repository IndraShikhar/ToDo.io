import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToDo } from "../contexts/ToDoContext";
import Cookie from "js-cookie";
import AlertBar from "../components/ui/AlertBar";

function Signup() {
  const { API, setUser, setTasks } = useToDo();
  const navigate = useNavigate();
  const [error, setError] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    sameAsUsername: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(type === "checkbox" && checked ? { displayName: prev.username } : {}),
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Signup Data:", formData);

    async function attemptSignUp() {
      try {
        const result = await fetch(`${API}/user/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await result.json();

        console.log("Data:", data);
        if (data.status === "success") {
          Cookie.set("jwt", data.data.token, { expires: 1 });
          setUser(data.data.user);
          setTasks([]);
          navigate("/app");
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }

    attemptSignUp();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-amber-50 overflow-hidden">
      <div className="w-[95%] max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-300">
        <h2 className="text-4xl font-bold text-white text-center bg-amber-900 p-6 mb-4">
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-4 px-8 pb-8">
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
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a unique username"
              className="p-2 rounded-lg bg-amber-100 focus:outline-amber-900"
              required
            />
          </div>

          {/* Display Name */}
          <div className="flex flex-col">
            <label
              htmlFor="displayName"
              className="text-sm font-semibold mb-1 text-amber-800"
            >
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Enter display name"
              className="p-2 rounded-lg bg-amber-100 focus:outline-amber-900"
              disabled={formData.sameAsUsername}
              required
            />
            <label className="text-sm text-amber-900 mt-1 flex items-center gap-2">
              <input
                type="checkbox"
                name="sameAsUsername"
                checked={formData.sameAsUsername}
                onChange={handleChange}
              />
              Same as username
            </label>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold mb-1 text-amber-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="p-2 rounded-lg bg-amber-100 focus:outline-amber-900"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-semibold mb-1 text-amber-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className="p-2 rounded-lg bg-amber-100 focus:outline-amber-900"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label
              htmlFor="passwordConfirm"
              className="text-sm font-semibold mb-1 text-amber-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="p-2 rounded-lg bg-amber-100 focus:outline-amber-900"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="p-3 mt-2 rounded-lg bg-amber-900 text-white font-bold hover:bg-amber-800 transition-all duration-300"
          >
            Create Account
          </button>

          {/* Navigation to Login */}
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <span
              className="text-amber-900 font-semibold cursor-pointer underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
      {error && <AlertBar message={error} onClose={() => setError("")} />}
    </div>
  );
}

export default Signup;
