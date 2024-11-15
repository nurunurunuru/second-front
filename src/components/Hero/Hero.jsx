// Hero.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import blue from "../../assets/watch/Blue.png";
import Laptop from "../../assets/watch/laptop.png";
import Sony from "../../assets/watch/sony.png";

import { Link } from "react-router-dom";
import Newsletter from "../NewsLetter/NewsLetter";

const ImageList = [
  {
    id: 1,
    img: blue,
    price: "12.99",
    tag: "New",
    title: "Mobile Phones",
    description:
      "Mobile phones have become essential tools, combining communication, entertainment, and productivity into one device. Today’s smartphones come with advanced features, including high-resolution cameras, fast processors, ample storage, and extended battery life. They support apps for virtually every need, from social media and gaming to productivity and navigation. Available in a wide range of brands, styles, and price points, mobile phones often include customizable features like fingerprint sensors, facial recognition, and vibrant display options, making them a key part of everyday life.",
    location: "Dhaka",
    resalePrice: "2000",
    originalPrice: "35000",
    yearsOfUse: "3 Years",
    postedTime: "1 hour ago",
    sellerName: "NurSaad",
    verified: true,
  },
  {
    id: 2,
    img: Laptop,
    price: "13.99",
    tag: "Sale",
    title: "Laptops",
    description:
      "Discover powerful performance with this laptop designed to meet the needs of both professionals and students. Equipped with a [Processor Type, e.g., Intel Core i7/AMD Ryzen 5] processor, it ensures smooth multitasking and efficient processing speeds. This laptop boasts [RAM Size, e.g., 16GB] of RAM and a [Storage Type and Size, e.g., 512GB SSD], offering fast boot-up times and ample space for your files, software, and multimedia.",
    location: "Chittagong",
    resalePrice: "2500",
    originalPrice: "30000",
    yearsOfUse: "2 Years",
    postedTime: "2 days ago",
    sellerName: "Ahmed",
    verified: false,
  },
  {
    id: 3,
    img: Sony,
    price: "14.99",
    tag: "Hot",
    title: "LED TV",
    description:
      "This LED TV offers stunning picture quality with vibrant colors, deep contrasts, and sharp details, making it perfect for immersive viewing experiences. Available in various screen sizes, it features full HD or 4K Ultra HD resolution, enhancing clarity and precision for movies, sports, and gaming. The sleek, modern design, with thin bezels and a minimalist stand, blends effortlessly with any decor.",
    location: "Sylhet",
    resalePrice: "1800",
    originalPrice: "32000",
    yearsOfUse: "1 Year",
    postedTime: "5 hours ago",
    sellerName: "Sara",
    verified: true,
  },
];
//Product Card
const ProductCard = ({ product }) => (
  <Link to={`/product/${product.id}`} className="block">
    <div className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden mb-6">
      <img
        src={product.img}
        alt={product.title}
        className="w-full h-48 object-contain mb-4 transition duration-300 transform hover:scale-110"
      />
      <div className="text-center">
        <h2 className="text-xl font-semibold mt-4 text-gray-800 dark:text-white">
          {product.title}
        </h2>
       
      </div>
    </div>
  </Link>
);

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    resalePrice: PropTypes.string.isRequired,
    originalPrice: PropTypes.string.isRequired,
    yearsOfUse: PropTypes.string.isRequired,
    postedTime: PropTypes.string.isRequired,
    sellerName: PropTypes.string.isRequired,
    verified: PropTypes.bool,
  }).isRequired,
  handleOrderPopup: PropTypes.func.isRequired,
};


const Hero = ({ handleOrderPopup }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="min-h-[550px] sm:min-h-[700px] bg-gray-100 flex flex-col justify-center items-center dark:bg-gray-950 dark:text-white duration-200 relative hover:">
      <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-9"></div>

      <div className="container pb-8 sm:pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col justify-center gap-6 pt-12 lg:pr-10 sm:pt-0 text-center sm:text-left order-2 sm:order-1">
            <h1 className="text-4xl lg:text-6xl font-bold">
              {ImageList[currentIndex].title}
            </h1>
            <p className="text-sm">
              {ImageList[currentIndex].description}
            </p>

            <div className="flex justify-center lg:justify-start gap-4 mt-4">
              {ImageList.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full cursor-pointer ${
                    currentIndex === index ? "bg-primary" : "bg-gray-300"
                  }`}
                ></span>
              ))}
            </div>
          </div>
          <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2">
            <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
              <img
                src={ImageList[currentIndex].img}
                alt={ImageList[currentIndex].title}
                className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-125 object-contain mx-auto"
              />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mt-12">Our Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6">
          {ImageList.map((product) => (
            <ProductCard key={product.id} product={product} handleOrderPopup={handleOrderPopup} />
          ))}
        </div>
        <Newsletter/>
      </div>
    </div>
  );
};

Hero.propTypes = {
  handleOrderPopup: PropTypes.func.isRequired,
};

export default Hero;
