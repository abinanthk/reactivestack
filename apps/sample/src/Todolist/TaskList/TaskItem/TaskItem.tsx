import { TTask } from "../../store";

export type TaskItemProps = {
  task: TTask;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <div style={{ border: "1px solid #444", padding: 5, margin: 5 }}>
      <div>
        <span style={{ fontWeight: "bold" }}>ID : </span>
        <span>{task.id}</span>
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>Title : </span>
        <span>{task.title}</span>
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>Description : </span>
        <span>{task.description}</span>
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>Priority : </span>
        <span>{task.priority}</span>
      </div>
    </div>
  );
};
