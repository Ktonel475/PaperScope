// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function AuthControl({ children }) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AuthControl;