import React from "react";
import TaskItem from "../components/TaskItem";
import { useRecoilValue } from "recoil";
import { taskAtom } from "../atoms/taskAtom";

export default function Archived() {
  const tasks = useRecoilValue(taskAtom).filter(task => task.status === "archived");

  return (
    <div>
      <h2 className="text-2xl mb-4">Archived Tasks</h2>
      <div className="mt-4">
        {tasks.map(task => <TaskItem key={task.id} task={task} />)}
      </div>
    </div>
  );
}
