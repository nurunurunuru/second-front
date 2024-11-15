import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import blue from "/src/assets/watch/Blue.png";
import Black from "../../../assets/watch/black.png";
import White from "../../../assets/watch/white.png";
import { AuthContext } from '../../../Contexts/AuthProvider';
import BookingModal from '../../BookingModal/BookingModal';

const ProductDetail1 = ({ handleOrderPopup}) => {
   const { user } = useContext(AuthContext)
  const [mainImage, setMainImage] = useState(blue); // Set initial image to blue

  const product = {
    name: "Samsung Galaxy M51",
    location: "Dhaka",
    resalePrice: "2000 Tk",
    originalPrice: "35000 Tk",
    yearsOfUse: "3 Years",
    postedTime: "1 hour ago",
    seller: "NurSaad",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
  };
  

  const handleImageClick = (image) => {
    setMainImage(image); // Update main image on thumbnail click
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-950 dark:text-white duration-200 py-8">
      {/* Card container */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Gallery */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
              <img
                src={blue}
                alt="Samsung Galaxy M51 Blue"
                className="w-20 h-20 object-contain cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => handleImageClick(blue)} // Update main image on click
              />
              <img
                src={Black}
                alt="Samsung Galaxy M51 Black"
                className="w-20 h-20 object-contain cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => handleImageClick(Black)} // Update main image on click
              />
              <img
                src={White}
                alt="Samsung Galaxy M51 White"
                className="w-20 h-20 object-contain cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => handleImageClick(White)} // Update main image on click
              />
            </div>
            <img
              src={mainImage} // Dynamically display the selected image
              alt="Samsung Galaxy M51"
              className="w-80 h-80 object-contain border-2 border-gray-300 rounded-lg shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4 text-gray-700 dark:text-gray-200">
            <p className="text-xl font-semibold">Location: {product.location}</p>
            <p className="text-lg font-semibold">Resale Price: <span className="text-green-500">{product.resalePrice}</span></p>
            <p className="text-lg line-through">Original Price: {product.originalPrice}</p>
            <p className="text-lg">Years of Use: {product.yearsOfUse}</p>
            <p className="text-sm text-gray-500">Posted: {product.postedTime}</p>
            <div className="flex items-center">
              <p className="text-lg">Seller: {product.seller}</p>
              <span className="text-blue-500 ml-2">✔</span>
            </div>
            <p className="text-sm">{product.description}</p>
          </div>
        </div>

        {/* Book Now Button */}
        <div className="mt-8">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleOrderPopup(product,user); // Pass product when opening the modal
            }}
            className=" bg-primary text-white py-2 px-4 rounded-lg"
          >
            Book Now
          </button>
        </div>
      </div>
       {/* bookingmodal */}

       <BookingModal/>

    </div>
  );
};

// Adding PropTypes validation
ProductDetail1.propTypes = {
  handleOrderPopup: PropTypes.func.isRequired,
};

export default ProductDetail1;
