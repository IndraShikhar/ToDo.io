import { useAuth } from "../contexts/AuthContext";
import Button from "../ui/Button";

function Home() {
  const { tasks, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center mt-12 p-4">
        <p className="text-2xl font-semibold">It's time to take charge</p>
        <p className="text-lg text-center">
          Big things start with one small task. Sign up and start ticking them
          off!!
        </p>
        <Button to="/signup" type="secondary">
          Sign Up
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-12 p-4">
      <p className="text-2xl font-semibold">It's time to take charge</p>
      {tasks === 0 && (
        <p className="text-lg text-center wrap-break-word mt-4 mb-6">
          Start your journey toward discipline and productivity by creating your
          first task!
        </p>
      )}
      {tasks > 0 && (
        <p>
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
