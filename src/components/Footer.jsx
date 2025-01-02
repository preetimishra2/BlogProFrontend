const Footer = () => {
  return (
    <>
      <div className="footer mt-8 w-full bg-gradient-to-r from-gray-700 to-gray-800 px-8 md:px-[200px] flex md:flex-row flex-col space-y-6 md:space-y-0 items-start md:justify-between text-sm md:text-md py-8">
        {/* Column 1 */}
        <div className="flex flex-col text-white space-y-2">
          <p className="font-semibold text-gray-300">Featured Blogs</p>
          <p className="hover:text-gray-400 cursor-pointer">Most viewed</p>
          <p className="hover:text-gray-400 cursor-pointer">Readers Choice</p>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col text-white space-y-2">
          <p className="font-semibold text-gray-300">Forum</p>
          <p className="hover:text-gray-400 cursor-pointer">Support</p>
          <p className="hover:text-gray-400 cursor-pointer">Recent Posts</p>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col text-white space-y-2">
          <p className="font-semibold text-gray-300">Legal</p>
          <p className="hover:text-gray-400 cursor-pointer">Privacy Policy</p>
          <p className="hover:text-gray-400 cursor-pointer">About Us</p>
          <p className="hover:text-gray-400 cursor-pointer">Terms & Conditions</p>
          <p className="hover:text-gray-400 cursor-pointer">Terms of Service</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="py-2 pb-6 text-center text-white bg-gray-900 text-sm">
        {" "}
        © {new Date().getFullYear()} Preeti Mishra | Designed with ❤️ by Preeti
      </p>
    </>
  );
};

export default Footer;
