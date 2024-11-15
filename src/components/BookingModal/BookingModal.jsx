import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";

const BookingModal = ({ isOpen, onClose, product }) => {
    const { user } = useContext(AuthContext);
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const bookingDetails = {
            userName: user.displayName || "Anonymous",
            userEmail: user.email,
            productName: product.name,
            price: product.resalePrice,
            phone,
            location,
        };
    
        try {
            const response = await fetch("http://localhost:7000/bookingCollection", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingDetails),
            });
    
            if (response.ok) {
                alert("Item booked successfully!");
                onClose();
            } else {
                alert("Failed to book the item. Please try again.");
            }
        } catch (error) {
            console.error("Error booking item:", error);
            alert("An error occurred. Please try again later.");
        }
    };
    

    

    if (!isOpen || !product || !user) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-2xl relative">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">Book Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name:</label>
                        <input
                            type="text"
                            value={user.displayName || "Anonymous"}
                            readOnly
                            className="w-full border border-gray-300 p-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email:</label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full border border-gray-300 p-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Name:</label>
                        <input
                            type="text"
                            value={product.name}
                            readOnly
                            className="w-full border border-gray-300 p-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price:</label>
                        <input
                            type="text"
                            value={`$${product.resalePrice}`}
                            readOnly
                            className="w-full border border-gray-300 p-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number:</label>
                        <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Meeting Location:</label>
                        <input
                            type="text"
                            required
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>
                    <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-md">Confirm Booking</button>
                </form>
                <button onClick={onClose} className="absolute pt-8 top-2 right-2 text-gray-500 dark:text-gray-300">X</button>
            </div>
        </div>
    );
};

BookingModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
};

export default BookingModal;
