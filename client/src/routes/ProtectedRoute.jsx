import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {

  const { user, loading } = useAuth();

  // Loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;