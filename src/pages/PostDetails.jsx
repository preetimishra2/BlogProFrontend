import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import { FcManager } from "react-icons/fc";

const PostDetails = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch post details
  const fetchPost = async () => {
    if (!postId) {
      console.error("Invalid postId. Cannot fetch post details.");
      return;
    }
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  // Fetch comments for the post
  const fetchComments = async () => {
    if (!postId) {
      console.error("Invalid postId. Cannot fetch comments.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/api/comments/post/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle post deletion
  const handleDeletePost = async () => {
    try {
      await axios.delete(`${URL}/api/posts/${postId}`, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  // Add a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return; // Prevent empty comments
    try {
      await axios.post(
        `${URL}/api/comments/create`,
        { comment, author: user.username, postId, userId: user._id },
        { withCredentials: true }
      );
      setComment("");
      fetchComments(); // Refresh comments
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [postId]);

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="border p-3 shadow">
            {/* Post Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-black md:text-3xl">{post.title}</h1>
              {user?._id === post?.userId && (
                <div className="flex items-center space-x-2">
                  <p className="cursor-pointer" onClick={() => navigate(`/edit/${postId}`)}>
                    <BiEdit />
                  </p>
                  <p className="cursor-pointer" onClick={handleDeletePost}>
                    <MdDelete />
                  </p>
                </div>
              )}
            </div>

            {/* Post Info */}
            <div className="flex items-center justify-between mt-2 md:mt-4">
              <div className="flex">
                <FcManager className="text-2xl mr-2" />
                By {post.username}
              </div>
              <p>{new Date(post.updatedAt).toString().slice(3, 15)}</p>
            </div>

            {/* Post Content */}
            <div className="w-[100%] flex flex-col justify-center">
              <img
                src={`${IF}${post.photo}`}
                alt="Post"
                className="object-cover h-[45vh] mx-auto mt-8"
              />
              <p className="mx-auto mt-8 w-[80vh] border p-5 shadow-xl">{post.desc}</p>

              {/* Categories */}
              {post.categories?.length > 0 && (
                <div className="flex justify-center items-center mt-8 space-x-4 font-semibold">
                  <p>Categories:</p>
                  <div className="flex space-x-2">
                    {post.categories.map((c, i) => (
                      <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div className="mt-6">
                <h3 className="font-semibold">Comments:</h3>
                <div className="flex flex-col space-y-4 mt-4">
                  {comments.map((c) => (
                    <Comment key={c._id} c={c} post={post} />
                  ))}
                </div>
              </div>

              {/* Add Comment */}
              {user && (
                <div className="w-[90vh] border flex flex-col md:flex-row mt-4">
                  <input
                    type="text"
                    placeholder="Write a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="md:w-[80%] outline-none py-2 px-4"
                  />
                  <button
                    onClick={handleAddComment}
                    className="bg-black text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
                  >
                    Add Comment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
