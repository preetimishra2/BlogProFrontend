// Home.js
import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { URL } from "../url";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";
import HomePosts from "../components/HomePosts";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Category Button Component
  const CategoryButton = ({ category, onClick }) => (
    <button
      className="p-3 m-5 h-[90px] w-[150px] border text-lg font-semibold bg-white hover:shadow-blue-200 shadow shadow-black"
      onClick={() => onClick(category)}
    >
      {category}
    </button>
  );

  // Fetch Posts and Categories
  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/${search}`);
      setPosts(res.data);
      setFilteredPosts(res.data);

      // Extract unique categories
      const uniqueCategories = new Set();
      res.data.forEach((post) => {
        post.categories?.forEach((cat) => uniqueCategories.add(cat));
      });
      setCategories(Array.from(uniqueCategories));

      setNoResults(res.data.length === 0);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setNoResults(true);
    } finally {
      setLoader(false);
    }
  };

  // Handle Category Filtering
  const handleCategoryFilter = (category) => {
    const filtered = posts.filter((post) => post.categories?.includes(category));
    setFilteredPosts(filtered);
  };

  // Fetch posts on component mount or when search query changes
  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <Navbar />

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center p-3 m-5">
        {categories.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            onClick={handleCategoryFilter}
          />
        ))}
      </div>

      {/* Posts Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {loader ? (
          <div className="h-screen flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          filteredPosts.map((post) => (
            <div
              key={post._id}
              className="flex justify-center"
            >
              <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePosts post={post} />
              </Link>
            </div>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;
