import { useContext } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { UiContext } from "../context/UiContext";

const DashboardLayout = ({ children }) => {
  const { mobileNavOpen } = useContext(UiContext);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <Sidebar />

      <div className="lg:pl-72">
        <Navbar />

        <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>

      {mobileNavOpen && <div className="lg:hidden" />}
    </div>
  );
};

export default DashboardLayout;
