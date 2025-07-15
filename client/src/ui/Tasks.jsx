// import { useToDo } from "../contexts/ToDoContext";
import { useTask } from "../contexts/TaskContext";
import Task from "./Task";

function Tasks() {
  const { tasks } = useTask();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4 ">
      {tasks.map((el) => (
        <Task key={el._id} task={el} />
      ))}
    </div>
  );
}

export default Tasks;
