import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loading from '../../Loading/Loading';
import { Link } from 'react-router-dom';

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const [bookingDetails, setBookingDetails] = useState([]);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:7000/my-orders?userEmail=${user.email}`);
        const data = await response.json();
        setBookingDetails(data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [user.email]);

  return (
    <div className="my-10 px-6 min-h-screen "> {/* min-h-screen ensures the content takes up full viewport height */}
      <h1 className="text-2xl font-semibold text-center mb-6">My Orders</h1>
      <Loading/>
      {bookingDetails.length > 0 ? (
        <div className="overflow-x-auto max-w-full"> {/* Enables horizontal scrolling */}
          <div className="relative max-h-80 overflow-y-auto"> {/* Adds vertical scrolling if needed */}
            <table className="w-full bg-white rounded-lg shadow-md border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b border-gray-300 text-left">Product Name</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">Price</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">Phone</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">Meeting Location</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookingDetails.map((booking, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b border-gray-300">{booking.productName}</td>
                    <td className="py-2 px-4 border-b border-gray-300">${booking.price}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{booking.phone}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{booking.location}</td>
                    <td className="py-2 px-4 border-b border-gray-300">
                    {
                      booking.price && !booking.paid &&   <Link to={`/dashboard/payment/${booking._id}`}>
                      
                      <button className="py-1 px-3 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                      Pay
                    </button>
                      
                      </Link>  
                    }
                    {
                      booking.price && booking.paid && <span className='text-success'>Paid</span>
                    }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No bookings found.</p>
      )}
    </div>
  );
};

export default MyOrder;
