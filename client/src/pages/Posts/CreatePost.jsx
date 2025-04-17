import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContex";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import BeatLoader from "react-spinners/BeatLoader";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { uploadImageToCloudinary } from "../../components/Cloudnairy";
import TinyEditor from "../../components/TinyEditor";

function CreatePost() {
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
  const navigate = useNavigate();

  // Fetch authors
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
        setAuthors(result);
      } catch (error) {
        toast.error(error.message || "Server error");
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  // Fetch categories
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
        setCategory(result);
      } catch (error) {
        toast.error(error.message || "Error fetching category");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  // Handle content change from TinyEditor
  const handleContentChange = (value) => {
    setPost((prev) => ({ ...prev, content: value }));
  };

  // Handle image change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPost((prev) => ({ ...prev, image: file }));
  };

  // Submit post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !post.title ||
      !post.content ||
      !post.author ||
      !post.category ||
      !post.image
    ) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const imageRef = await uploadImageToCloudinary(post.image, "postImage");

      const postRef = doc(collection(db, "createpost"));
      const postId = postRef.id;

      await setDoc(postRef, {
        ...post,
        id: postId,
        image: imageRef,
        createdBy: user?.uid || null,
        createdAt: new Date(),
      });

      toast.success("Post created successfully!");
      navigate("/post");
    } catch (error) {
      toast.error(error.message || "Unexpected error occurred");
      console.error("Create post error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 px-4 py-6">
      <div className="md:w-[35%] w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
          Create Post
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
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
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Author
            </label>
            <select
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
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <select
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

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
            {post.image && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(post.image)}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-md border border-gray-300"
                />
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              {loading ? <BeatLoader size={10} color="#fff" /> : "Create Post"}
            </button>
          </div>
        </form>
      </div>

      <div className="md:w-[65%] w-full">
        <TinyEditor value={post.content} onChange={handleContentChange} />
      </div>
    </div>
  );
}

export default CreatePost;
