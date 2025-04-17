import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, "createpost", postId);
        const snapshot = await getDoc(postRef);
        if (snapshot.exists()) {
          const post = snapshot.data();
          setPost(post);
        }
      } catch (error) {
        console.log(error.message, "Server error");
      }
    };
    fetchPost();
  }, [postId]);

  console.log("post", post);

  return (
    <main className="w-full md:[70%] mx-auto flex justify-center">
      <section className="flex flex-col gap-5 px-16 py-10 max-w-[800px]">
        {post && (
          <>
            <CategoryCard categoryId={post.category} />
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <img className="w-full object-cover" src={post.image} alt="" />
            <div className="flex justify-between items-center">
              <AuthorCard authorId={post.author} />
              <h5 className="text-xs text-gray-500">
                {post.createdAt?.toDate()?.toLocaleDateString()}
              </h5>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </>
        )}
      </section>
    </main>
  );
}

function AuthorCard({ authorId }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const snapshot = await getDoc(doc(db, "auditor", authorId));
        if (snapshot.exists()) {
          const author = snapshot.data();
          setAuthor(author);
        }
      } catch (error) {
        console.log(error.message, "Some things went wrong");
      }
    };
    fetchAuthor();
  }, [authorId]);

  return (
    author && (
      <div className="flex gap-2 items-center">
        <img
          className="h-6 w-6 rounded-full object-cover"
          src={author.image}
          alt=""
        />
        <h4 className="text-sm text-gray-500">{author.authorName}</h4>
      </div>
    )
  );
}

function CategoryCard({ categoryId }) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const snapshot = await getDoc(doc(db, "categorytype", categoryId));
        if (snapshot.exists()) {
          const category = snapshot.data();
          setCategory(category);
        }
      } catch (error) {
        console.log(error.message, "Some things went wrong");
      }
    };
    fetchCategory();
  }, [categoryId]);

  return (
    category && (
      <div className="flex">
        <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded-full px-2 py-1 border">
          <img
            className="h-4 w-4 rounded-full object-cover"
            src={category.image}
            alt=""
          />
          <h4 className="text-xs text-gray-500">{category.categoryName}</h4>
        </div>
      </div>
    )
  );
}

export default Post;
