import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { taskAtom } from "../atoms/taskAtom";
import TaskForm from "../components/TaskForm";

export default function Home() {
  const [tasks, setTasks] = useRecoilState(taskAtom);
  const [editTask, setEditTask] = useState(null);

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleArchive = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: "archived" } : task
      )
    );
  };

  return (
    <div>
      <TaskForm editTask={editTask} setEditTask={setEditTask} />

      <h2 className="text-xl mt-6 mb-2 font-bold">Tasks:</h2>
      <ul className="space-y-3">
        {tasks
          .filter((task) => task.status === "pending")
          .map((task) => (
            <li key={task.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{task.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: task.description }} />
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleArchive(task.id)}
                  className="text-yellow-500 hover:underline"
                >
                  Archive
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
