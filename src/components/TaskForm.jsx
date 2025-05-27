import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRecoilState } from "recoil";
import { taskAtom } from "../atoms/taskAtom";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

export default function TaskForm({ editTask, setEditTask }) {
  const [tasks, setTasks] = useRecoilState(taskAtom);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (editTask) {
        // Edit existing task
        setTasks((prev) =>
          prev.map((task) =>
            task.id === editTask.id ? { ...task, ...values } : task
          )
        );
        toast.success("Task updated!");
        setEditTask(null);
      } else {
        // Create new task
        setTasks((prev) => [
          ...prev,
          { ...values, status: "pending", id: Date.now() },
        ]);
        toast.success("Task added!");
      }
      resetForm();
    },
  });

  // Populate form if editing
  useEffect(() => {
    if (editTask) {
      formik.setValues({
        title: editTask.title,
        description: editTask.description,
      });
    }
  }, [editTask]);

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <input
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />
      {formik.touched.title && formik.errors.title && (
        <p className="text-red-500">{formik.errors.title}</p>
      )}

      <JoditEditor
        value={formik.values.description}
        onBlur={(val) => formik.setFieldValue("description", val)}
      />
      {formik.touched.description && formik.errors.description && (
        <p className="text-red-500">{formik.errors.description}</p>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {editTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
