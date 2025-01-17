import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import Logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 dark:text-white duration-200 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo and Description */}
        <div>
          <Link to="/" className="text-2xl sm:text-3xl flex items-center gap-2 mb-4">
            <img src={Logo} alt="Logo" className="w-12" />
            <span className="font-bold text-yellow-500">Second Chance</span>Store
          </Link>
          <p className="bg-gray-100 dark:bg-gray-950 dark:text-white duration-200 text-sm">
            Explore our curated collection of watches, blending elegance with functionality. Perfect for every style and occasion.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-xl text-gray-400 hover:text-blue-500 transition duration-200">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-xl text-gray-400 hover:text-blue-400 transition duration-200">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-xl text-gray-400 hover:text-pink-500 transition duration-200">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-xl text-gray-400 hover:text-blue-700 transition duration-200">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold bg-gray-100 dark:bg-gray-950 dark:text-white duration-200 mb-4">Quick Links</h2>
          <ul className="space-y-3 bg-gray-100 dark:bg-gray-950 dark:text-white duration-200">
            {["About Us", "Services", "Blog", "Contact"].map((item, index) => (
              <li key={index}>
                <Link to="#" className="flex items-center gap-2 hover:text-white transition duration-200">
                  <FiArrowRight className="text-sm" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h2 className="text-xl font-bold bg-gray-100 dark:bg-gray-950 dark:text-white duration-200 mb-4">Newsletter</h2>
          <p className="bg-gray-100 dark:bg-gray-950 dark:text-white duration-200 text-sm mb-4">
            Subscribe to get the latest news and updates.
          </p>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-blue-900 transition duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        <p className="bg-gray-100 dark:bg-gray-950 dark:text-white duration-200">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="mt-3 space-x-4">
          <Link to="#" className="bg-gray-100 dark:bg-gray-950 dark:text-white  hover:text-white transition duration-200">Privacy Policy</Link>
          <span className="bg-gray-100 dark:bg-gray-950 dark:text-white duration-200">|</span>
          <Link to="#" className="bg-gray-100 dark:bg-gray-950 dark:text-white hover:text-white transition duration-200">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
