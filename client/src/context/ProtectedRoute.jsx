import { Navigate } from "react-router";
import { useAuth } from "./AuthContex";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to={"/signin"} />;
};

export default ProtectedRoute;
