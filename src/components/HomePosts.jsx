// HomePosts.js
import { IF } from "../url";

const HomePosts = ({ post }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg flex flex-col h-full">
      <div className="flex-shrink-0">
        <img
          className="object-cover w-full h-[200px] rounded-t-lg transition-transform hover:scale-110"
          src={`${IF}${post.photo}`}
          alt="Post Thumbnail"
        />
      </div>
      <div className="flex-1 p-3">
        <h5 className="text-xl font-bold text-gray-900">{post.title}</h5>
        <p className="text-blue-400 text-sm">By {post.username}</p>
        <p className="mt-2 text-gray-700 text-sm">{post.desc.slice(0, 75)} ...Read more</p>
        <p className="mt-auto pt-4 text-gray-400 text-xs">
          {new Date(post.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
