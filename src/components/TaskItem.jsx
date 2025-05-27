import React from "react";
import { useRecoilState } from "recoil";
import { taskAtom } from "../atoms/taskAtom";
import { Trash2, Archive, Check } from "lucide-react";
import { toast } from "react-toastify";

export default function TaskItem({ task }) {
  const [tasks, setTasks] = useRecoilState(taskAtom);

  const updateStatus = (status) => {
    setTasks(tasks.map(t => t.id === task.id ? { ...t, status } : t));
    toast.info(`Task marked as ${status}`);
  };

  const deleteTask = () => {
    setTasks(tasks.filter(t => t.id !== task.id));
    toast.error("Task deleted");
  };

  return (
    <div className="border p-4 rounded shadow-sm mb-2">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: task.description }} />
      <div className="flex gap-2 mt-2">
        {task.status !== "completed" && (
          <button onClick={() => updateStatus("completed")} className="text-green-600">
            <Check size={18} />
          </button>
        )}
        {task.status !== "archived" && (
          <button onClick={() => updateStatus("archived")} className="text-yellow-600">
            <Archive size={18} />
          </button>
        )}
        <button onClick={deleteTask} className="text-red-600">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
