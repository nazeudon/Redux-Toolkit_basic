import React from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { selectTasks } from "./taskSlice";

const TaskList = () => {
  const tasks = useSelector(selectTasks);
  return (
    <>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </>
  );
};

export default TaskList;
