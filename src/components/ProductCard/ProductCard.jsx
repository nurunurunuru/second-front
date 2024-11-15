import PropTypes from "prop-types";

const ProductCard = ({ product, handleOrderPopup }) => (
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
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        Location: {product.location}
      </p>
      <p className="font-bold text-lg mt-4 text-primary">
        Resale Price: ${product.resalePrice}{" "}
        <span className="text-gray-500">
          Original Price: {product.originalPrice} Tk
        </span>
      </p>
      <p className="text-sm text-gray-500">
        Years of Use: {product.yearsOfUse} | Posted: {product.postedTime}
      </p>
      <p className="mt-2">
        Seller: {product.sellerName} {product.verified && <span className="text-blue-500">✔</span>}
      </p>
      <button
        onClick={() => handleOrderPopup(product)}
        className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition duration-200 text-white py-2 px-4 rounded-lg mt-4"
      >
        Book Now
      </button>
    </div>
  </div>
);

ProductCard.propTypes = {
  product: PropTypes.shape({
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

export default ProductCard;
