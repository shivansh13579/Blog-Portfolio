import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

function GetAllCategories() {
  const [categoriesPost, setCategoriesPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const categoriesRef = collection(db, "categorytype");
        const snapshot = await getDocs(categoriesRef);
        const categories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategoriesPost(categories);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
      setLoading(false);
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
    <section className="px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex items-center justify-center">
        <h1 className="uppercase py-4 my-4 tracking-widest">
          Top // <span className="text-blue-800 font-medium ">Categories</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {categoriesPost.map((post, index) => (
          <Link to={`/categories/${post?.id}`} key={index + 1}>
            <CategoryDesign post={post} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default GetAllCategories;

export const CategoryDesign = ({ post }) => {
  return (
    <div className=" py-4 ">
      <div className="flex flex-col items-center justify-center gap-2 hover:bg-slate-100 rounded-xl p-6">
        <img
          className="w-full h-full hover:opacity-30 rounded-sm"
          src={post?.image}
          alt=""
        />
        <h1 className="font-bold">{post?.categoryName}</h1>
      </div>
    </div>
  );
};
