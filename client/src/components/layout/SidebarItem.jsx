import { NavLink, useLocation } from "react-router-dom";

const SidebarItem = ({ to, icon: Icon, label, onClick }) => {
  const location = useLocation();
  const currentPath = `${location.pathname}${location.search}`;
  const active = currentPath === to || (to === "/dashboard" && location.pathname === "/dashboard" && location.search === "");

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 dark:bg-slate-700 dark:text-white"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
        <Icon size={18} />
      </span>
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarItem;
