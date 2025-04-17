import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContex";

export default function UserDropdown() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const handleLogin = () => {
    navigate("/signin");
  };

  return (
    <div className="relative">
      {user ? (
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
        >
          <h3 className="block mr-1 font-medium text-theme-sm">Logout</h3>
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
        >
          <h3 className="block mr-1 font-medium text-theme-sm">Login</h3>
        </button>
      )}
    </div>
  );
}
