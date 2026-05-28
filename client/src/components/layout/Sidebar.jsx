import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UiContext } from "../../context/UiContext";
import SidebarItem from "./SidebarItem";
import {
  LayoutDashboard,
  ListChecks,
  CheckCircle2,
  Clock3,
  Settings,
  X,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "All Tasks", to: "/dashboard", icon: ListChecks },
  { label: "Completed Tasks", to: "/dashboard?status=completed", icon: CheckCircle2 },
  { label: "Pending Tasks", to: "/dashboard?status=pending", icon: Clock3 },
  { label: "Settings", to: "/dashboard", icon: Settings },
];

const Sidebar = () => {
  const { mobileNavOpen, setMobileNavOpen } = useContext(UiContext);

  return (
    <>
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileNavOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r border-slate-200/80 bg-white/95 px-6 py-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  TaskFlow
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                  Workspace
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <SidebarItem
                  key={item.label}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  onClick={() => setMobileNavOpen(false)}
                />
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:z-40 lg:border-r lg:border-slate-200/80 lg:bg-white/95 lg:backdrop-blur-xl lg:px-6 lg:py-8 dark:lg:border-slate-800 dark:lg:bg-slate-950/95">
        <div className="mb-8 flex items-center gap-3 rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 p-4 text-white shadow-lg shadow-blue-500/10">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 font-semibold">
            TF
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/80">Premium SaaS</p>
            <h1 className="text-xl font-semibold">TaskFlow</h1>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem key={item.label} to={item.to} icon={item.icon} label={item.label} />
          ))}
        </nav>

        <div className="mt-auto rounded-3xl border border-slate-200/80 bg-slate-50 p-5 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <p className="font-semibold">Pro dashboard</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Navigate tasks faster, keep focus, and switch views with ease.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
