import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QFeRQBnUwl9B8JgQpqzdsi8TLwXJ1GvS8P3wzf1fXJUR3ty2gFSYfjmB4AlT3YtQN40gUr9ZelFTxGlLagktkvT005mFeEzLb');

const Payment = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:7000/bookingCollection/${id}`);
        const data = await response.json();
        setBooking(data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status"></div>
        <span className="ml-2 text-gray-700 text-lg">Loading...</span>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold">Error: Booking not found.</p>
      </div>
    );
  }

  return (
    <div className="payment-page max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Payment</h1>
      <div className="text-left mb-6">
        <p className="text-lg mb-2"><strong>Product Name:</strong> {booking.productName}</p>
        <p className="text-lg mb-2"><strong>Price:</strong> <span className="text-green-500">${booking.price}</span></p>
        <p className="text-lg mb-2"><strong>Phone:</strong> {booking.phone}</p>
        <p className="text-lg mb-2"><strong>Meeting Location:</strong> {booking.location}</p>
      </div>
      <div className="border-t pt-4 mt-4">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
