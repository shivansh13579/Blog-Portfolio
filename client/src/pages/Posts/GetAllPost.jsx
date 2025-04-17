import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { useAuth } from "../../context/AuthContex";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function GetAllPost() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetAllPost();
  }, []);

  const GetAllPost = async () => {
    setLoading(true);
    try {
      const postRef = collection(db, "createpost");
      const snapshot = await getDocs(postRef);
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("result", result);
      setLoading(false);
      setAllPosts(result);
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Server error");
    }
  };

  const handleEdit = (id) => {
    navigate(`/update-post/${id}`);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const postDataRef = doc(db, "createpost", id);
      await deleteDoc(postDataRef);
      setLoading(false);
      GetAllPost();
      toast.success("Post deleted successfully");
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-3xl flex items-center justify-center py-5 pb-6 dark:text-gray-300">
          loading...
        </div>
      ) : allPosts.length > 0 ? (
        <>
          <div className="flex items-center justify-end py-5 pb-6">
            <p
              onClick={() => navigate("/create-post")}
              className="px-3 py-2 rounded-sm bg-blue-700 text-white flex items-center gap-1 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <FaPlus /> Create Post
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md dark:border-white/10 dark:bg-white/5">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50 dark:bg-gray-800">
                  <TableRow>
                    {["SNo.", "Title", "Image", "CreatedAt", "Actions"].map(
                      (head, i) => (
                        <TableCell
                          key={i}
                          isHeader
                          className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300"
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {allPosts.map((post, index) => (
                    <TableRow
                      key={post.id}
                      className="hover:bg-gray-50 dark:hover:bg-white/10 transition"
                    >
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <p className="font-medium text-gray-800 dark:text-white">
                            {index + 1}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {post.title}
                      </TableCell>

                      <TableCell className="px-6 py-4">
                        <div className="flex -space-x-2 text-gray-800 dark:text-white">
                          <img className="w-10 h-10" src={post.image} alt="" />
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {moment(post.createdAt?.toDate()).format("MMM Do YY")}
                      </TableCell>

                      <TableCell className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-3">
                          <FaEdit
                            onClick={() => handleEdit(post.id)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                          />
                          <FaTrash
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-end py-5 pb-6">
            <p
              onClick={() => navigate("/create-post")}
              className="px-3 py-2 rounded-sm bg-blue-700 text-white flex items-center gap-1 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <FaPlus /> Create Post
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md dark:border-white/10 dark:bg-white/5">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50 dark:bg-gray-800">
                  <TableRow>
                    {["SNo.", "Title", "Image", "CreatedAt", "Actions"].map(
                      (head, i) => (
                        <TableCell
                          key={i}
                          isHeader
                          className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300"
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default GetAllPost;
