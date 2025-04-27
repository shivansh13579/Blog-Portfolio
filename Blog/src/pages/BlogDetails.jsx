import React, { useEffect, useState } from "react";
import { PostCard } from "../components/Home/PostListView";
import { ClipLoader } from "react-spinners";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../lib/firebase";

function BlogDetails() {
  const { categoryId } = useParams();

  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryRef = async () => {
      try {
        setLoading(true);
        const fetchCategoriesRef = doc(db, "categorytype", categoryId);

        const snapshot = await getDoc(fetchCategoriesRef);

        if (snapshot.exists()) {
          const fetchedCategory = snapshot.data();
          setCategory(fetchedCategory);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryRef();
  }, [categoryId]);

  useEffect(() => {
    const fetchCategoryRef = async () => {
      setLoading(true);
      try {
        const getAllPostsWithCategoryRef = collection(db, "createpost");

        const q = query(
          getAllPostsWithCategoryRef,
          where("category", "==", categoryId)
        );

        const snapshot = await getDocs(q);

        const fetchedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryRef();
  }, [categoryId]);

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
    <main className="w-full md:w-[80%] mx-auto py-8 mb-6">
      <div className="flex p-5 gap-3">
        <h1 className="font-bold font-serif md:text-xl">Categories /</h1>
        <CategoryCard category={category} />
      </div>
      <div className="w-full grid md:grid-cols-2 gap-5 px-3">
        {posts?.map((post, key) => {
          return <PostCard post={post} key={key} />;
        })}
      </div>
    </main>
  );
}

export default BlogDetails;

function CategoryCard({ category }) {
  return (
    <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded-full px-2 py-1 border">
      <img
        className="h-4 w-4 rounded-full object-cover"
        src={category?.image}
        alt=""
      />
      <h4 className="text-xs text-gray-500">{category?.categoryName}</h4>
    </div>
  );
}
