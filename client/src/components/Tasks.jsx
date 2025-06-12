import { useToDo } from "../contexts/ToDoContext";
import Task from "./Task";

function Tasks({}) {
  const { tasks } = useToDo();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-6 md:px-12 pb-8">
      {tasks.map((el) => (
        <Task key={el._id} task={el} />
      ))}
    </div>
  );
}

export default Tasks;
