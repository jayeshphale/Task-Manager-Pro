import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import API from "../api/axios";

import TaskCard from "../components/tasks/TaskCard";

import TaskFormModal from "../components/tasks/TaskFormModal";

import SearchBar from "../components/tasks/SearchBar";

import TaskFilters from "../components/tasks/TaskFilters";

import Pagination from "../components/common/Pagination";

import Loader from "../components/common/Loader";

import toast from "react-hot-toast";

import EmptyState from "../components/common/EmptyState";

import { motion } from "framer-motion";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const statusQuery = searchParams.get("status") || "all";
    if (statusQuery !== status) {
      setStatus(statusQuery);
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const completedTasks = tasks.filter((task) => task.status === "completed").length;

  const pendingTasks = tasks.filter((task) => task.status !== "completed").length;

  const fetchTasks = async () => {
    try {
      setLoading(true);

      let url = `/api/tasks?page=${currentPage}&search=${search}`;
      if (status !== "all") {
        url += `&status=${status}`;
      }

      const { data } = await API.get(url);
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status, currentPage]);

  const handleTaskSubmit = async (formData) => {
    try {
      if (editingTask) {
        await API.put(`/api/tasks/${editingTask._id}`, formData);
        toast.success("Task updated");
      } else {
        await API.post("/api/tasks", formData);
        toast.success("Task created");
      }
      setModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch {
      toast.error("Task action failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      const updatedStatus = currentStatus === "pending" ? "completed" : "pending";

      await API.patch(`/api/tasks/${id}`, {
        status: updatedStatus,
      });

      fetchTasks();
    } catch {
      toast.error("Status update failed");
    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    if (newStatus === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ status: newStatus });
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <div className="mb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-sm font-semibold dark:bg-blue-900/40 dark:text-blue-200">
                Productive workspace
              </div>
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Manage your tasks with clarity
                </h1>
                <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
                  Organize your priority work, monitor progress, and keep your task list clean with an elegant dashboard layout.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingTask(null);
                setModalOpen(true);
              }}
              className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
            >
              + Create Task
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-gray-200/80 bg-white dark:bg-gray-900 dark:border-gray-800 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                Total tasks
              </p>
              <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">
                {tasks.length}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Tasks currently visible in your workspace.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200/80 bg-white dark:bg-gray-900 dark:border-gray-800 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                Completed
              </p>
              <p className="mt-4 text-3xl font-semibold text-emerald-600 dark:text-emerald-400">
                {completedTasks}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Tasks marked as complete.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200/80 bg-white dark:bg-gray-900 dark:border-gray-800 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                Pending
              </p>
              <p className="mt-4 text-3xl font-semibold text-amber-600 dark:text-amber-400">
                {pendingTasks}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Tasks still in progress.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between mb-8">
          <SearchBar search={search} setSearch={setSearch} />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
            <TaskFilters status={status} setStatus={handleStatusChange} />
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={(task) => {
                  setEditingTask(task);
                  setModalOpen(true);
                }}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

        <TaskFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleTaskSubmit}
          editingTask={editingTask}
        />
      </motion.div>
    </div>
  );
};

export default Dashboard;
