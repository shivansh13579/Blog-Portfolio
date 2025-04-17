import React, { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function LoginButton() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const userRef = doc(db, "profile", userId);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
          setUser(snapshot.data());
        }
      } catch (error) {
        console.error("Something went wrong:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("id");
    navigate("/login");
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log("user", user);

  if (user) {
    return (
      <section className="flex gap-1">
        {user.email === "shivansh0975@gmail.com" &&
          user.password === "shivam135" && (
            <p
              onClick={() => window.open("http://localhost:5174", "_blank")}
              className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-full cursor-pointer"
            >
              Admin
            </p>
          )}
        <p
          onClick={handleLogout}
          className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-full cursor-pointer"
        >
          Logout
        </p>
      </section>
    );
  }

  return (
    <section className="flex gap-1">
      <p
        onClick={() => navigate("/login")}
        className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-full cursor-pointer"
      >
        Login
      </p>
    </section>
  );
}
