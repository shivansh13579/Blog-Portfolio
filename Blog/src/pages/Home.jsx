import "react-multi-carousel/lib/styles.css";
import Header, { Liner } from "../components/Header";
import GetAllCategories from "../components/Home/GetAllCategories";
import PostListView from "../components/Home/PostListView";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="w-full h-fit mx-auto my-5 py-5 ">
      <div>
        <Header />
        <Link to={"/about"}>
          <div className="flex items-center justify-start px-4">
            <p className="bg-red-500 px-3 py-2 text-white rounded-md hover:bg-red-700 flex gap-1">
              View Details
            </p>
          </div>
        </Link>
        <Liner />
      </div>
      <div className="w-full h-fit  md:h-[350px] py-5">
        <GetAllCategories />
      </div>
      <div className="py-5 mt-4">
        <Liner />
        <PostListView />
      </div>
    </main>
  );
}
