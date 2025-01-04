import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL as API_URL } from "../url"; // Rename import to avoid conflict
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const EditPost = () => {
    const postId = useParams().id;
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [photo, setPhoto] = useState(""); // To track the existing photo URL
    const [cats, setCats] = useState([]);

    // Image preview logic
    const previewImage = photo
        ? `${API_URL}/images/${photo}` // Existing photo
        : null;

    // Fetch the post details
    const fetchPost = async () => {
        try {
            const res = await axios.get(`/api/posts/${postId}`);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setPhoto(res.data.photo); // Store the existing photo URL separately
            setCats(res.data.categories);
        } catch (err) {
            console.error("Failed to fetch post:", err);
        }
    };

    // Handle the post update (only title and description)
    const handleUpdate = async (e) => {
        e.preventDefault();

        const post = {
            title,
            desc,
            username: user.username,
            userId: user._id,
            categories: cats, // Keep existing categories
            photo, // Keep existing photo
        };

        // Update the post in the database
        try {
            const res = await axios.put(`/api/posts/${postId}`, post, { withCredentials: true });
            navigate(`/posts/post/${res.data._id}`); // Redirect to the updated post page
        } catch (err) {
            console.error("Post update failed:", err);
        }
    };

    // Fetch the post data on mount
    useEffect(() => {
        fetchPost();
    }, [postId]);

    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <div className="p-4 border w-[70%] flex flex-col justify-center px-6 md:px-[200px] mt-8">
                    <h1 className="font-bold flex justify-center md:text-2xl text-xl">Update a post</h1>
                    <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="text"
                            placeholder="Enter post title"
                            className="px-4 py-2 outline-none"
                        />
                        {/* Show existing image */}
                        {previewImage && (
                            <div className="flex flex-col items-center">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-[200px] h-[200px] object-cover rounded-md mb-4"
                                />
                                <p className="text-sm text-gray-500">Preview</p>
                            </div>
                        )}
                        {/* Hide file input and category inputs */}
                        <div className="flex flex-col">
                            <div className="flex px-4 mt-3">
                                {cats?.map((c, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                                    >
                                        <p>{c}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <textarea
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                            rows={9}
                            cols={30}
                            className="px-4 py-2 outline-none"
                            placeholder="Enter post description"
                        />
                        <button
                            onClick={handleUpdate}
                            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditPost;
