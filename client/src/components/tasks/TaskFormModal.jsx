import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const TaskFormModal = ({ isOpen, onClose, onSubmit, editingTask }) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        priority: editingTask.priority || "medium",
      });
    } else if (isOpen) {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
      });
    }
  }, [editingTask, isOpen]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="max-w-lg">
      <div className="relative">
        <h2 className="text-2xl font-bold mb-2">{editingTask ? "Edit Task" : "Create Task"}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Add a title, description, and priority to keep your task list organized.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Task title" id="title" name="title" value={formData.title} onChange={handleChange} required />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Describe the task"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange} className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" onClick={onClose} className="bg-gray-200">Cancel</Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Save</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TaskFormModal;