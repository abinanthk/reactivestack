import { useTaskList } from "../store";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const list = useTaskList();
  return (
    <div>
      {list.state.tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
