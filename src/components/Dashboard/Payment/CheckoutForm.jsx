import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ booking }) => {
  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { price, _id } = booking;

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("http://localhost:7000/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    if (price) {
      createPaymentIntent();
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error.message);
      setIsProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      setCardError(confirmError.message);
    } else {
      setSuccess("Payment successful!");
      const transactionId = paymentIntent.id;

      // Update booking status in the database
      await fetch(`http://localhost:7000/bookingCollection/${_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'paid', transactionId }),
      });
    }

    setIsProcessing(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: { color: '#9e2146' },
            },
          }}
        />
        {cardError && <p className="text-red-500 text-sm mt-2">{cardError}</p>}
        <button
          className="btn btn-sm btn-primary mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Pay'}
        </button>
      </form>
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
};

export default CheckoutForm;
