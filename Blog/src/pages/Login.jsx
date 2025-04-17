import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const userRef = doc(collection(db, "profile"));
      const id = userRef.id;
      await setDoc(userRef, { ...data, id: id });
      localStorage.setItem("id", id);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="mb-5 sm:mb-8 flex justify-center items-center">
          <h1 className="mb-2 font-semibold text-gray-800 text-2xl dark:text-white">
            Login
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-white">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                placeholder="info@gmail.com"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-white">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2/4 -translate-y-1/2 cursor-pointer text-gray-500"
                  title="Toggle Password"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                {loading ? <BeatLoader size={10} color="#ffffff" /> : "Sign in"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
