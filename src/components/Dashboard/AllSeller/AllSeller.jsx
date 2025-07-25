import React, { useEffect, useState } from 'react';

const AllSeller = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        
        // Filter only sellers
        const sellersData = data.filter(user => user.role === 'seller');
        setSellers(sellersData);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const handleVerifySeller = async (email, isVerified) => {
    try {
      const response = await fetch(`/api/users/verify/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isVerified: !isVerified }), // Toggle verification status
      });

      if (response.ok) {
        const updatedSellers = sellers.map(seller => 
          seller.email === email ? { ...seller, isVerified: !isVerified } : seller
        );
        setSellers(updatedSellers);
      } else {
        alert('Failed to update verification status.');
      }
    } catch (error) {
      console.error('Error verifying seller:', error);
    }
  };

  return (
    <div className="container mt-8">
      <h2 className="text-2xl font-semibold mb-4">All Sellers</h2>
      {loading ? (
        <div>Loading sellers...</div>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">Name</th>
              <th className="border-b px-4 py-2">Email</th>
              <th className="border-b px-4 py-2">Verification Status</th>
              <th className="border-b px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller._id}>
                <td className="border-b px-4 py-2">{seller.name}</td>
                <td className="border-b px-4 py-2">{seller.email}</td>
                <td className="border-b px-4 py-2">
                  {seller.isVerified ? 'Verified' : 'Not Verified'}
                </td>
                <td className="border-b px-4 py-2">
                  <button
                    onClick={() => handleVerifySeller(seller.email, seller.isVerified)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    {seller.isVerified ? 'Unverify' : 'Verify'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllSeller;
