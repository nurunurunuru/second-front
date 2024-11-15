import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/products/category/${id}`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="container mt-8">
      <h2 className="text-3xl font-bold mb-4">Products in {id} Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <ProductCard product={product} />
            </Link>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
