const TaskFilters = ({ status, setStatus }) => {

  return (
    <div className="flex gap-3 flex-nowrap overflow-x-auto pb-1" role="tablist" aria-label="Task filters">

      {["all", "pending", "completed"].map((item) => (

        <button
          key={item}
          type="button"
          role="tab"
          aria-selected={status === item}
          aria-current={status === item ? "page" : undefined}
          onClick={() => setStatus(item)}
          className={`whitespace-nowrap px-5 py-3 rounded-full text-sm font-semibold capitalize transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
            status === item
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl ring-2 ring-blue-500/30"
              : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {item}
        </button>

      ))}

    </div>
  );
};

export default TaskFilters;