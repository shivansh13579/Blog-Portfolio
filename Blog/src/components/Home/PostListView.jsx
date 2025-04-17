import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function PostListView() {
  const [posts, setPosts] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postRef = collection(db, "createpost");
        const snapshot = await getDocs(postRef);
        const postData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postData || []);
        setLoading(false);
      } catch (error) {
        console.log(error.message, "Server error");
      }
    };
    fetchData();

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleMediaChange = (event) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    cssEase: "linear",
  };

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
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex items-center justify-center">
        <h1 className="uppercase py-4 my-4 tracking-widest">
          Latest // <span className="text-blue-800 font-medium ">The Blog</span>
        </h1>
      </div>
      {isDesktop ? (
        <Slider {...settings}>
          {posts.map((post, index) => (
            <PostCard post={post} key={index} />
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <PostCard post={post} key={index} />
          ))}
        </div>
      )}
    </section>
  );
}

export function PostCard({ post }) {
  return (
    <Link to={`/posts/${post?.id}`} className="w-full">
      <div className="my-4 w-full h-[450px] flex flex-col items-start border rounded-lg shadow-md transition hover:shadow-lg">
        {/* Image Section */}
        <div className="relative group w-full">
          <img
            className="w-full h-[260px] object-cover rounded-t-lg group-hover:brightness-75 transition duration-300"
            src={post?.image}
            alt=""
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-20">
            <MoveRight className="text-white text-xl" />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full bg-white px-4 py-4 text-start flex flex-col justify-start h-full">
          {/* Date */}
          <div className="flex justify-between items-center">
            <p className="text-xs text-black">
              {post?.createdAt?.toDate()?.toLocaleDateString("en-us", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <span className="px-3 py-1 rounded-full text-xs">
              <CategoryCard categoryId={post?.category} />
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[17px] font-medium hover:text-blue-600 mt-2 line-clamp-2">
            {post?.title}
          </h1>
        </div>
        {/* Category & Button */}
        <div className="flex items-start justify-start px-4 mb-5">
          <button className="bg-red-500 text-white text-[16px] px-2 py-1 rounded-md hover:bg-red-800 transition">
            + Full Info
          </button>
        </div>
      </div>
    </Link>
  );
}

export function CategoryCard({ categoryId }) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryRef = doc(db, "categorytype", categoryId);
        console.log("categoryRef", categoryRef);

        const snapshot = await getDoc(categoryRef);
        console.log("snapshot", snapshot);
        if (snapshot.exists()) {
          const categoryData = snapshot.data();
          setCategory(categoryData);
        }
      } catch (error) {
        console.log(error.message, "Server error");
      }
    };
    fetchCategory();
  }, []);

  if (!category) return null;

  return (
    <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded-full px-3 py-1">
      <img
        className="h-4 w-4 rounded-full object-cover"
        src={category?.image}
        alt=""
      />
      <h4 className="text-xs text-gray-500">{category?.categoryName}</h4>
    </div>
  );
}
