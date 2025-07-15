import { useAuth } from "../contexts/AuthContext";
import Button from "../ui/Button";

function Home() {
  const { tasks, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center px-4 py-16 text-center">
        <p className="text-3xl font-bold text-amber-900">
          It's time to take charge
        </p>
        <p className="text-lg text-gray-700 max-w-xl">
          Big things start with one small task. Sign up and start ticking them
          off!
        </p>
        <Button to="/signup" type="primary" className="mt-4 sm:scale-105">
          Sign Up
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-3xl font-bold text-amber-900 mb-4">
        It's time to take charge
      </p>

      {tasks === 0 && (
        <p className="text-lg text-gray-700 max-w-xl mt-2 mb-6">
          Start your journey toward discipline and productivity by creating your
          first task!
        </p>
      )}

      {tasks > 0 && (
        <p className="text-lg text-gray-700 max-w-xl mt-2 mb-6">
          🎯 Stay focused, tick off those checkboxes, and watch your to-do list
          turn into a done list. ✅
        </p>
      )}

      <Button
        to="/app"
        type="primary"
        disabled={tasks.length === 0}
        className="sm:scale-110"
      >
        Get Started
      </Button>
    </div>
  );
}

export default Home;
