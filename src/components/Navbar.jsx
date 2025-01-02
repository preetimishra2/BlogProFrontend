import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  }

  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-md">
      <h1 className="text-lg md:text-xl font-extrabold text-gray-200 hover:text-gray-300 transition-colors">
        <Link to="/">BlogPro</Link>
      </h1>
      
      {path === "/" && (
        <div className="flex items-center space-x-2 bg-white overflow-hidden">
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none px-4 py-2 text-black w-[250px] sm:w-[350px]"
            placeholder="Search a post"
            type="text"
          />
          <button
            onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))}
            className="p-3 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            <BsSearch />
          </button>
        </div>
      )}

      <div className="hidden md:flex items-center space-x-4 relative">
        {user ? (
          <h3>
            <Link to="/write" className="hover:text-gray-300 transition-colors">
              Write
            </Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login" className="hover:text-gray-300 transition-colors">
              Login
            </Link>
          </h3>
        )}

        {user ? (
          <div className="cursor-pointer relative">
            <p className="text-xl hover:text-gray-300 transition-colors" onClick={showMenu}>
              <FaBars />
            </p>
            {menu && (
              <div className="fixed right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
                <Menu />
              </div>
            )}
          </div>
        ) : (
          <h3>
            <Link to="/register" className="hover:text-gray-300 transition-colors">
              Register
            </Link>
          </h3>
        )}
      </div>

      <div onClick={showMenu} className="md:hidden text-xl relative">
        <p className="cursor-pointer relative hover:text-gray-300 transition-colors">
          <FaBars />
        </p>
        {menu && (
          <div className="fixed right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
            <Menu />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
