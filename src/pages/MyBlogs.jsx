import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import HomePosts from "../components/HomePosts";
import Loader from "../components/Loader";

const MyBlogs = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="px-8 md:px-[200px] py-8">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          <div className="flex flex-col gap-8"> {/* Changed to vertical stack */}
            {posts.map((post) => (
              <Link
                key={post._id}
                to={user ? `/posts/post/${post._id}` : "/login"}
                className="w-full p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <HomePosts post={post} />
              </Link>
            ))}
          </div>
        ) : (
          <h3 className="text-center font-bold text-xl text-gray-600 mt-16">
            No posts available
          </h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;
