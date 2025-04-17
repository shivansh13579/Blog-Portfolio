import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostListView from "../components/Home/PostListView";
import { ClipLoader } from "react-spinners";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

function Blog() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesRef = collection(db, "categorytype");
        const snapshot = await getDocs(categoriesRef);
        const categories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("categories", categories);
        setCategories(categories);
        setLoading(false);
      } catch (error) {
        console.log(error.message, "Server error");
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <h1>
          <ClipLoader color="blue" />
        </h1>
      </div>
    );
  }

  return (
    <main className="w-full md:w-[90%] h-fit mx-auto my-5 py-5 ">
      <div className="w-full flex items-center justify-center">
        <h1 className="tracking-widest py-4 mb-5 uppercase">
          All // <span className="text-blue-400 font-semibold">Categories</span>{" "}
        </h1>
      </div>
      <section className="w-full grid md:grid-cols-4">
        {categories.map((category, key) => {
          return <CategoryCard category={category} key={key} />;
        })}
      </section>

      <div className="my-5">
        <PostListView />
      </div>
    </main>
  );
}

export default Blog;

function CategoryCard({ category }) {
  return (
    <Link to={`/categories/${category?.id}`}>
      <div className="flex flex-col items-center justify-center gap-2 hover:bg-slate-100 rounded-xl p-6">
        <img className="w-full " src={category?.image} alt="" />
        <h1 className="font-bold">{category?.categoryName}</h1>
      </div>
    </Link>
  );
}
