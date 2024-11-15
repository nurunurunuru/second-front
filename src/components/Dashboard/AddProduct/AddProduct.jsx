import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("excellent");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("Chittagong");
  const [categories, setCategories] = useState([]); // Store categories
  const [category, setCategory] = useState(""); // Selected category
  const [description, setDescription] = useState("");
  const [yearOfPurchase, setYearOfPurchase] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data); // Populate categories dynamically
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback to default categories in case of error
        setCategories([
          { id: 1, name: "Mobile Phones" },
          { id: 2, name: "Laptops" },
          { id: 3, name: "LED TV" },
        ]);
      }
    };

    fetchCategories();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!isVerified) {
      alert("Only verified sellers can add products.");
      return;
    }

    const productData = {
      productName,
      price,
      condition,
      mobile,
      location,
      category,
      description,
      yearOfPurchase,
    };

    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      alert("Product added successfully.");
      navigate("/dashboard/my-products");
    } else {
      alert("Failed to add product.");
    }
  };

  return (
    <div className="container mt-8">
      <h2 className="text-2xl font-semibold mb-4">Add a Product</h2>
      <form onSubmit={handleAddProduct} className="grid gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="Chittagong">Chittagong</option>
          <option value="Dhaka">Dhaka</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Year of Purchase"
          value={yearOfPurchase}
          onChange={(e) => setYearOfPurchase(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600 transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
