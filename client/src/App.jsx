import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Home from "./pages/Dashboard/Home";
import ProtectedRoute from "./context/ProtectedRoute";
import GetAllAuthors from "./pages/Author/GetAllAuthors";
import CreateAuthor from "./pages/Author/CreateAuthor";
import UpdateAuthor from "./pages/Author/UpdateAuthor";
import GetAllCategory from "./pages/Category/GetAllCategory";
import CreateCategory from "./pages/Category/CreateCategory";
import UpdateCategory from "./pages/Category/UpdateCategory";
import GetAllPost from "./pages/Posts/GetAllPost";
import UpdatePost from "./pages/Posts/UpdatePost";
import CreatePost from "./pages/Posts/CreatePost";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index path="/" element={<Home />} />
            <Route path="/author" element={<GetAllAuthors />} />
            <Route path="/create-author" element={<CreateAuthor />} />
            <Route path="/update-author/:id" element={<UpdateAuthor />} />

            <Route path="/category" element={<GetAllCategory />} />
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/update-category/:id" element={<UpdateCategory />} />

            <Route path="/post" element={<GetAllPost />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<UpdatePost />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
