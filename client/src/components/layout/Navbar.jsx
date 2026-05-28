import {
  Menu,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

import { motion } from "framer-motion";
import { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { ThemeContext } from "../../context/ThemeContext";
import { UiContext } from "../../context/UiContext";
import Button from "../ui/Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { dark, setDark } = useContext(ThemeContext);
  const { setMobileNavOpen } = useContext(UiContext);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-gray-900/60 border-b border-gray-100 dark:border-gray-800"
    >

      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
              TF
            </div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              TaskFlow
            </h1>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm text-gray-500">Welcome</span>
            <span className="font-semibold">{user?.name}</span>
          </div>

          {/* DARK MODE */}
          <button
            onClick={() => setDark(!dark)}
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* LOGOUT */}
          <Button onClick={logout} className="hidden md:inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-red-100 text-red-600 bg-red-50 hover:bg-red-100">
            <LogOut size={16} />
            <span>Logout</span>
          </Button>

        </div>

      </div>

    </motion.nav>
  );
};

export default Navbar;