
import { Link, Routes, Route, Outlet } from "react-router-dom";
import AddProduct from "./AddProduct/AddProduct";
import MyProducts from "./MyProduct/MyProduct";

const Dashboard = () => {
  return (
    <div className="flex h-full min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 p-4 shadow-lg">
        <nav className="flex flex-col gap-4">
          <Link 
            to="add-product" 
            className="text-blue-500 hover:underline"
          >
            Add Product
          </Link>
          <Link 
            to="my-products" 
            className="text-blue-500 hover:underline"
          >
            My Products
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6">
        <Routes>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="my-products" element={<MyProducts />} />
        </Routes>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
