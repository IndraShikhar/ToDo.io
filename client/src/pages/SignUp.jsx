import { useEffect, useState } from "react";
import { attemptSignup } from "../services/apiTODOio";
import Button from "../ui/Button";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isAttempting, setIsAttempting] = useState(false);

  const navigator = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(
    function () {
      if (isLoggedIn) {
        navigator("/app");
      }
    },
    [isLoggedIn, navigator]
  );

  async function handleSignup(e) {
    e.preventDefault();
    setIsAttempting(true);
    setError(null);

    try {
      // Call your backend API
      const data = await attemptSignup({ username, email, password });

      if (data.status === "success") {
        navigator("/app"); // Redirect or show success
      }

      // Redirect or show success
    } catch (err) {
      setError(err.message || "Signup failed.");
    } finally {
      setIsAttempting(false);
    }
  }

  return (
    <div className="flex mt-12 items-center justify-center px-4">
      <div className="bg-white/80 border border-white/40 shadow-xl rounded-3xl p-10 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-amber-900 text-center mb-6">
          Create Account 🚀
        </h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-6">
          {/* Username */}
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

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              className={`peer w-full rounded-lg border border-amber-400 bg-white/60 px-4 ${
                email === "" ? "pt-4" : "pt-6"
              } pb-2 text-amber-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-600 focus:pt-6 transition-all duration-300`}
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-amber-700 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-amber-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-amber-700"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              className={`peer w-full rounded-lg border border-amber-400 bg-white/60 px-4 ${
                password === "" ? "pt-4" : "pt-6"
              } pb-2 text-amber-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-600 focus:pt-6 transition-all duration-300`}
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-amber-700 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-amber-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-amber-700"
            >
              Password
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-center text-sm text-amber-800">{error}</p>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={isAttempting}>
            {isAttempting ? "Creating Account..." : "Sign Up"}
          </Button>

          {/* Link to Login */}
          <p className="text-center text-sm text-amber-800">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-amber-900 font-medium underline cursor-pointer hover:text-amber-600"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
