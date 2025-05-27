import React from "react";
import { useSetRecoilState } from "recoil";
import { taskAtom } from "../atoms/taskAtom";
import { toast } from "react-toastify";

export default function TaskItem({ task, setEditTask }) {
  const setTasks = useSetRecoilState(taskAtom);

  const handleDelete = () => {
    setTasks(prev => prev.filter(t => t.id !== task.id));
    toast.info("Task deleted");
  };

  const handleComplete = () => {
    setTasks(prev =>
      prev.map(t => (t.id === task.id ? { ...t, status: "completed" } : t))
    );
    toast.success("Task marked as completed");
  };

  const handleArchive = () => {
    setTasks(prev =>
      prev.map(t => (t.id === task.id ? { ...t, status: "archived" } : t))
    );
    toast.success("Task archived");
  };

  const handleEdit = () => {
    if (setEditTask) {
      setEditTask(task);
      toast.info("Task ready to edit");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-3">
      <h3 className="font-bold text-lg">{task.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: task.description }} />

      <div className="mt-3 space-x-4">
        {/* Conditionally render buttons based on task status */}
        {task.status === "pending" && (
          <>
            <button onClick={handleEdit} className="text-blue-500 hover:underline">
              ✏️ Edit
            </button>
            <button onClick={handleComplete} className="text-green-600 hover:underline">
              ✅ Complete
            </button>
            <button onClick={handleArchive} className="text-yellow-600 hover:underline">
              📦 Archive
            </button>
            <button onClick={handleDelete} className="text-red-500 hover:underline">
              ❌ Delete
            </button>
          </>
        )}

        {task.status === "completed" && (
          <>
            <button onClick={handleArchive} className="text-yellow-600 hover:underline">
              📦 Archive
            </button>
            <button onClick={handleDelete} className="text-red-500 hover:underline">
              ❌ Delete
            </button>
          </>
        )}

        {task.status === "archived" && (
          <>
            <button onClick={handleEdit} className="text-blue-500 hover:underline">
              ✏️ Edit
            </button>
            <button onClick={handleComplete} className="text-green-600 hover:underline">
              ✅ Complete
            </button>
            <button onClick={handleDelete} className="text-red-500 hover:underline">
              ❌ Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
