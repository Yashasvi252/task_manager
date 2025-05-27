import React from "react";
import TaskItem from "../components/TaskItem";
import { useRecoilValue } from "recoil";
import { taskAtom } from "../atoms/taskAtom";

export default function Completed() {
  const tasks = useRecoilValue(taskAtom).filter(task => task.status === "completed");

  return (
    <div>
      <h2 className="text-2xl mb-4">Completed Tasks</h2>
      <div className="mt-4">
        {tasks.map(task => <TaskItem key={task.id} task={task} />)}
      </div>
    </div>
  );
}
