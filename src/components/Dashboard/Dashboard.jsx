import { Link, Route, Routes } from "react-router-dom";
import AddProducts from "./AddProduct/AddProduct";
import MyProducts from "./MyProduct/MyProduct";
import AllBuyers from "./AllBuyer/AllBuyer";
import MyOrders from "./MyOrder/MyOrder";
import AllSeller from "./AllSeller/AllSeller";
import useBuyer from "../../hooks/useBuyer";
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import Payment from "./Payment/Payment";
import Admin from "./Admin/Admin";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isBuyerLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-full md:w-1/4 lg:w-1/5 bg-gradient-to-r from-gray-800 to-gray-700 text-white fixed md:static h-full z-20 transition-transform`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white hover:text-gray-300"
          >
            ✕
          </button>
        </div>
        <ul className="space-y-2 px-4">
          <li>
            <Link to="/dashboard/admin" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Admin
            </Link>
          </li>
          <li>
            <Link to="/dashboard/all-buyers" className="block py-2 px-4 hover:bg-gray-700 rounded">
              All Buyers
            </Link>
          </li>
          <li>
            <Link to="/dashboard/my-orders" className="block py-2 px-4 hover:bg-gray-700 rounded">
              My Orders
            </Link>
          </li>
          <li>
            <Link to="/dashboard/all-sellers" className="block py-2 px-4 hover:bg-gray-700 rounded">
              All Sellers
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-product" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/dashboard/my-products" className="block py-2 px-4 hover:bg-gray-700 rounded">
              My Products
            </Link>
          </li>
        </ul>
      </aside>

      {/* Content Area */}
      <main className="flex-1 md:ml-[25%] lg:ml-[20%] bg-white shadow-lg overflow-y-auto">
        <div className="p-4 flex justify-between items-center shadow-md bg-gray-100 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-800 hover:text-gray-600"
          >
            ☰ Menu
          </button>
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <div className="p-6">
          <Routes>
            <Route path="admin" element={<Admin />} />
            <Route path="all-buyers" element={<AllBuyers />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="payment/:id" element={<Payment />} />
            <Route path="all-sellers" element={<AllSeller />} />
            <Route path="add-product" element={<AddProducts />} />
            <Route path="my-products" element={<MyProducts />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
