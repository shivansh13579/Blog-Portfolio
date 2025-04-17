import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContex";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { data, useNavigate, useParams } from "react-router";
import BeatLoader from "react-spinners/BeatLoader";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { uploadImageToCloudinary } from "../../components/Cloudnairy";
import TinyEditor from "../../components/TinyEditor";

function UpdatePost() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState({
    title: "",
    content: "",
    image: null,
    author: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [category, setCategory] = useState([]);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const postRef = doc(db, "createpost", id);
        console.log("postRef", postRef);

        const snapshot = await getDoc(postRef);
        console.log("snapshot", snapshot);

        if (snapshot.exists()) {
          const result = snapshot.data();
          console.log("result", result);
          setPost({
            title: result.title,
            content: result.content,
            image: result.image || null,
            author: result.author,
            category: result.category,
          });
          setPreview(result.image || null);
        }
      } catch (error) {}
    };
    getPost();
  }, [id]);

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      try {
        const authorRef = collection(db, "auditor");
        const authorSnapshot = await getDocs(authorRef);

        const result = authorSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        setAuthors(result);
      } catch (error) {
        setLoading(false);
        toast.error(error.message || "Server error");
      }
    };
    fetchAuthors();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const categoryRef = collection(db, "categorytype");
        const snapshot = await getDocs(categoryRef);
        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        setCategory(result);
      } catch (error) {
        setLoading(false);
        toast.error(error.message || "error in category");
      }
    };
    fetchCategory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setPost((prev) => ({ ...prev, content: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPost((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!post.title || !post.content || !post.author || !post.category) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const postRef = doc(db, "createpost", id);
      const updateData = {
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
        updatedAt: new Date(),
        updatedBy: user?.uid || null,
      };

      if (post.image && typeof post.image !== "string") {
        const imageRef = await uploadImageToCloudinary(post.image, "postImage");
        updateData.image = imageRef;
      }

      await updateDoc(postRef, updateData);

      setLoading(false);
      toast.success("Post Updated successfully!");
      navigate("/post");
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Unexpected error occurred");
      console.log("err", error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 px-4 py-6">
        <div className="md:w-[35%] w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
            Update Post
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Author
              </label>
              <select
                type="select"
                name="author"
                value={post.author}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Select an option</option>
                {authors.map((author) => (
                  <option value={author.id} key={author.id}>
                    {author.authorName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Category
              </label>
              <select
                type="select"
                name="category"
                value={post.category}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Select an option</option>
                {category.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-25 h-25 max-w-xs rounded-lg shadow-md border border-gray-300 dark:border-gray-600"
                  />
                </div>
              )}
            </div>
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={loading}
              >
                {loading ? (
                  <BeatLoader size={10} color="#ffffff" />
                ) : (
                  "Update Post"
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="md:w-[65%] w-full">
          <TinyEditor value={post.content} onChange={handleContentChange} />
        </div>
      </div>
    </>
  );
}

export default UpdatePost;
