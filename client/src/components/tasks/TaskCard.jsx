import {
  CheckCircle,
  Circle,
  Pencil,
  Trash2,
  Calendar,
} from "lucide-react";

import { motion } from "framer-motion";

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onToggle,
}) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition p-6 border border-gray-200 dark:border-gray-800"
    >

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
            {task.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
            {task.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-4">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {task.priority || "medium"}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                task.status === "completed"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300"
              }`}
            >
              {task.status === "completed" ? "Completed" : "Pending"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar size={16} />
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 sm:flex-col sm:justify-start">
          <button
            onClick={() => onToggle(task._id, task.status)}
            aria-label={
              task.status === "completed"
                ? "Mark as pending"
                : "Mark as completed"
            }
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-emerald-600 transition hover:bg-emerald-100 dark:bg-gray-800 dark:text-emerald-300 dark:hover:bg-emerald-900/60"
          >
            {task.status === "completed" ? <CheckCircle /> : <Circle />}
          </button>

          <button
            onClick={() => onEdit(task)}
            aria-label="Edit task"
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-blue-600 transition hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-blue-900/60"
          >
            <Pencil />
          </button>

          <button
            onClick={() => onDelete(task._id)}
            aria-label="Delete task"
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-red-600 transition hover:bg-red-100 dark:bg-gray-800 dark:text-red-300 dark:hover:bg-red-900/60"
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;