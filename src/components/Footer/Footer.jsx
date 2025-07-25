import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import Logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-300 py-16 px-6 transition duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Logo and Description */}
        <div>
          <Link to="/" className="text-3xl flex items-center gap-2 mb-6">
            <img src={Logo} alt="Logo" className="w-14" />
            <span className="font-extrabold text-yellow-500">Second Chance Store</span>
          </Link>
          <p className="text-sm leading-relaxed">
            Discover premium second-hand watches that combine timeless elegance and modern functionality. Perfect for any style and occasion.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-600 transition-all duration-200">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400 transition-all duration-200">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-pink-500 transition-all duration-200">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-700 transition-all duration-200">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
          <ul className="space-y-4">
            {["About Us", "Services", "Blog", "Contact"].map((item, index) => (
              <li key={index}>
                <Link
                  to="#"
                  className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all duration-200"
                >
                  <FiArrowRight className="text-lg text-yellow-500" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Newsletter</h2>
          <p className="text-sm mb-6">
            Stay updated with our latest arrivals and exclusive offers. Subscribe now!
          </p>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="px-4 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-12 pt-8 text-center text-sm">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold">Second Chance Store</span>. All rights reserved.
        </p>
        <div className="mt-4 space-x-6">
          <Link to="#" className="hover:text-yellow-500 transition-all duration-200">Privacy Policy</Link>
          <span>|</span>
          <Link to="#" className="hover:text-yellow-500 transition-all duration-200">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
