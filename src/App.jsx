import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import CategoryPage from "./components/ProductCard/CategoryPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import BookingModal from "./components/BookingModal/BookingModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductDetail1 from "./components/ProductDetail/ProductDetail1/ProductDetail1";
import ProductDetail2 from "./components/ProductDetail/ProductDetail2/ProductDetail2";
import ProductDetail3 from "./components/ProductDetail/ProductDetail3/ProductDetail3";
import Blog from "./components/Blog/Blog";
import Mobile from "./components/Mobile/Mobile";


// import MyOrders from "./components/Dashboard/MyOrder/MyOrder";


const App = () => {
  //const { user, logOut } = useContext(AuthContext);
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const handleOrderPopup = (product) => {
    setSelectedProduct(product);
    setOrderPopup(true);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <Navbar handleOrderPopup={handleOrderPopup}/>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Hero handleOrderPopup={handleOrderPopup} />} />
        <Route path="/home" element={<Hero handleOrderPopup={handleOrderPopup} />}/>
        <Route path="/product/1" element={<ProductDetail1 handleOrderPopup={handleOrderPopup} />} />
        {/* <Route path="/product/:productId" component={ProductDetail1} /> */}

        <Route path="/product/2" element={<ProductDetail2 handleOrderPopup={handleOrderPopup}/>} />
        <Route path="/product/3" element={<ProductDetail3 handleOrderPopup={handleOrderPopup}/>}/>
        <Route path="/category/:id" element={<CategoryPage handleOrderPopup={handleOrderPopup} />}/>
        <Route path="/dashboard/*" element={<Dashboard />}/>
        
        {/* <Route path="/dashboard/my-orders" element={<MyOrders/>} /> */}
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/blog" element={<Blog />}/>
        <Route path="/mobile" element={<Mobile />}/>
        
        
        
        
        
      </Routes>

      <Footer />
      
{selectedProduct && (
  <BookingModal
    isOpen={orderPopup}
    onClose={() => setOrderPopup(false)}
    product={selectedProduct}
    
  />
)}

    </Router>
  );
};

export default App;
