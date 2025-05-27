import React from "react";
import TaskItem from "../components/TaskItem";
import { useRecoilValue } from "recoil";
import { taskAtom } from "../atoms/taskAtom";

export default function Completed() {
  const tasks = useRecoilValue(taskAtom).filter(task => task.status === "completed");

  <div className="mt-2 space-x-4">
              <button onClick={() => handleEdit(task)} className="text-blue-500 hover:underline">
                ✏️ Edit
              </button>
              <button onClick={() => handleComplete(task.id)} className="text-green-600 hover:underline">
                ✅ Complete
              </button>
              <button onClick={() => handleArchive(task.id)} className="text-yellow-600 hover:underline">
                📦 Archive
              </button>
              <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:underline">
                ❌ Delete
              </button>
            </div>

  return (
    <div>
      <h2 className="text-2xl mb-4">Completed Tasks</h2>
      <div className="mt-4">
        {tasks.map(task => <TaskItem key={task.id} task={task} />)}
      </div>
    </div>
  );
}
