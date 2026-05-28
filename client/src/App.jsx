import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {

  return (
    <BrowserRouter>

      <Toaster position="top-right" />

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/dashboard" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;