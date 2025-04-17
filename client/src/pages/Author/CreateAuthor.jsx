import React, { useState } from "react";
import { useAuth } from "../../context/AuthContex";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import BeatLoader from "react-spinners/BeatLoader";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { uploadImageToCloudinary } from "../../components/Cloudnairy";

function CreateAuthor() {
  const { user } = useAuth();
  const [author, setAuthor] = useState({
    authorName: "",
    authorEmail: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAuthor((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!author.authorEmail || !author.authorName || !author.image) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const imageRef = await uploadImageToCloudinary(author.image, "image");
      console.log("imageRef", imageRef);

      const authorRef = doc(collection(db, "auditor"));
      console.log("authorRef", authorRef);
      const authorId = authorRef.id;
      await setDoc(authorRef, {
        ...author,
        id: authorId,
        image: imageRef,
        createdBy: user?.uid || null,
        createdAt: new Date(),
      });

      setLoading(false);
      toast.success("Author created successfully!");
      navigate("/author");
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Unexpected error occurred");
      console.log("err", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
        Create Author
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Author Name
          </label>
          <input
            type="text"
            name="authorName"
            value={author.authorName}
            onChange={handleChange}
            placeholder="Enter batch name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Author Email
          </label>
          <input
            type="email"
            name="authorEmail"
            value={author.authorEmail}
            onChange={handleChange}
            placeholder="Enter student limit"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
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
            required
          />
          {author.image && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(author.image)}
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
              "Create Author"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAuthor;
