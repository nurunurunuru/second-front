import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import Logo from "../../assets/logo.png";
import DarkMode from "./DarkMode";
import { FaCartShopping } from "react-icons/fa6";
import { MdHomeFilled } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FaLaptop, FaTv, FaBars } from "react-icons/fa";

const Menu = [
  { id: 1, name: "Home", link: "/home" },
  { id: 2, name: "Mobile", link: "/mobile" },
  { id: 3, name: "Blog", link: "/blog" },
  { id: 4, name: "Television", link: "/television" },
  { id: 5, name: "Dashboard", link: "/dashboard" },
];

const Navbar = ({ handleOrderPopup }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    logOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <nav className="shadow-lg bg-white dark:bg-gray-800 dark:text-white duration-200 relative z-40">
      <div className="container mx-auto py-4 px-4 md:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl sm:text-3xl flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-10 h-10 object-cover rounded-full" />
            <span className="font-bold text-yellow-500">Second Chance</span>Store
          </Link>
        </div>

        {/* Dark Mode and Cart */}
        <div className="flex items-center md:hidden gap-4">
          <DarkMode />
          <button
            onClick={handleOrderPopup}
            className="relative p-2 rounded-full hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:scale-105 transition duration-200"
          >
            <FaCartShopping className="text-2xl text-black dark:text-white drop-shadow-sm cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">3</span>
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
            <FaBars />
          </button>
        </div>

        {/* Menu */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center gap-6 absolute md:relative top-full left-0 md:top-0 md:left-auto w-full md:w-auto bg-white dark:bg-gray-800 md:bg-transparent dark:md:bg-transparent p-4 md:p-0`}
        >
          {Menu.map((menu) => (
            <li key={menu.id} className="text-center md:text-left">
              <Link
                to={menu.link}
                className={`flex items-center py-2 px-3 rounded-lg transition duration-200 ${
                  location.pathname === menu.link
                    ? "bg-gradient-to-r from-primary to-secondary text-white font-bold"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <span className="mr-2">
                  {menu.name === "Home" && <MdHomeFilled />}
                  {menu.name === "Mobile" && <HiOutlineDevicePhoneMobile />}
                  {menu.name === "Blog" && <FaLaptop />}
                  {menu.name === "Television" && <FaTv />}
                </span>
                {menu.name}
              </Link>
            </li>
          ))}
          {user ? (
            <li>
              <button
                onClick={handleSignOut}
                className="py-2 px-4 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold shadow-lg hover:from-red-600 hover:to-red-800 transform hover:scale-105 transition-all duration-200"
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="py-2 px-4 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-lg hover:from-green-600 hover:to-green-800 transform hover:scale-105 transition-all duration-200"
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Dark Mode and Cart for Larger Screens */}
        <div className="hidden md:flex items-center gap-4">
          <DarkMode />
          <button
            onClick={handleOrderPopup}
            className="relative p-2 rounded-full hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:scale-105 transition duration-200"
          >
            <FaCartShopping className="text-2xl text-black dark:text-white drop-shadow-sm cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">3</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
