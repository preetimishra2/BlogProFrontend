import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Ensure cookies are sent with the request
        body: JSON.stringify({ email, password }),
      });
  
      if (res.ok) {
        const data = await res.json(); // Parse response
        console.log("API Response Data:", data);
  
        if (data._id) {
          setError(""); // Clear previous errors
          setUser(data); // Update global user context
          console.log("User Context Updated:", data);
          navigate("/"); // Redirect to homepage
        } else {
          console.error("Invalid user data:", data);
          setError("Invalid response from server.");
        }
      } else {
        const errorMsg = res.status === 401 
          ? "Invalid email or password." 
          : "Failed to log in. Please try again.";
        console.error("Login failed:", errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };  

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">BlogPro To Rescue</Link>
        </h1>
        <h3>
          <Link to="/register">Register</Link>
        </h3>
      </div>

      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Log in to your account</h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
          >
            Log in
          </button>
          {error && <h3 className="text-red-500 text-sm">{error}</h3>}
          <div className="flex justify-center items-center space-x-3">
            <p>New here?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
