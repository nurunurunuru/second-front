import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import Logo from "../../assets/logo.png";
import DarkMode from "./DarkMode";
import { FaCartShopping } from "react-icons/fa6";
import { MdHomeFilled } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FaLaptop, FaBars } from "react-icons/fa";

const Menu = [
  { id: 1, name: "Home", link: "/home" },
  { id: 2, name: "Mobile", link: "/mobile" },
  { id: 3, name: "Blog", link: "/blog" },
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
    <nav className="shadow-lg bg-gradient-to-r from-white via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-black dark:text-white duration-200 relative z-40">
      <div className="container mx-auto py-4 px-4 md:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl sm:text-3xl flex items-center gap-2 font-bold">
            <img src={Logo} alt="Logo" className="w-12 h-12 object-cover rounded-full shadow-md" />
            <span className="text-yellow-500">Second Chance</span>
            <span className="text-gray-800 dark:text-gray-300">Store</span>
          </Link>
        </div>

        {/* Dark Mode and Cart */}
        <div className="flex items-center md:hidden gap-4">
          <DarkMode />
          <button
            onClick={handleOrderPopup}
            className="relative p-2 rounded-full hover:scale-105 bg-gradient-to-r from-primary to-secondary shadow-md transition-transform duration-200"
          >
            <FaCartShopping className="text-2xl text-black dark:text-white" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1 shadow-sm">3</span>
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
            <FaBars />
          </button>
        </div>

        {/* Menu */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center gap-6 absolute md:relative top-full left-0 md:top-0 md:left-auto w-full md:w-auto bg-gray-100 dark:bg-gray-900 p-4 md:p-0`}
        >
          {Menu.map((menu) => (
            <li key={menu.id} className="text-center md:text-left">
              <Link
                to={menu.link}
                className={`flex items-center py-2 px-3 rounded-lg transition-transform duration-200 ${
                  location.pathname === menu.link
                    ? "bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-md transform scale-105"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <span className="mr-2">
                  {menu.name === "Home" && <MdHomeFilled />}
                  {menu.name === "Mobile" && <HiOutlineDevicePhoneMobile />}
                  {menu.name === "Blog" && <FaLaptop />}
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
            className="relative p-2 rounded-full hover:scale-105 bg-gradient-to-r from-primary to-secondary shadow-md transition-transform duration-200"
          >
            <FaCartShopping className="text-2xl text-black dark:text-white" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1 shadow-sm">3</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
