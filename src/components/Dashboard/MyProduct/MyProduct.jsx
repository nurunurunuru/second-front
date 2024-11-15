import { useEffect, useState } from "react";

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMyProducts = async () => {
      const response = await fetch("/api/products/my-products");
      const data = await response.json();
      setProducts(data);
    };

    fetchMyProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter(product => product.id !== productId));
        alert("Product deleted successfully.");
      } else {
        alert("Failed to delete the product.");
      }
    }
  };

  return (
    <div className="container mt-8">
      <h2 className="text-2xl font-semibold">My Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded-lg bg-white shadow">
            <h3 className="font-bold">{product.productName}</h3>
            <p>Price: ${product.price}</p>
            <p>Condition: {product.condition}</p>
            <p>Status: {product.isSold ? "Sold" : "Available"}</p>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 text-white py-1 px-2 rounded mt-2 hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;

