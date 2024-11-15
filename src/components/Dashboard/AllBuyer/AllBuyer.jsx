import React, { useContext, useEffect, useState, } from 'react';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../../../Contexts/AuthProvider';

const AllBuyer = () => {
  const { user } = useContext(AuthContext); // Get user info from context
  const [buyers, setBuyers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buyerToDelete, setBuyerToDelete] = useState(null);

  useEffect(() => {
    fetch('http://localhost:7000/users?userType=buyer')
      .then((response) => response.json())
      .then(setBuyers)
      .catch((error) => console.error("Error fetching buyers:", error));
  }, []);

  const handleDelete = (buyerEmail) => {
    setBuyerToDelete(buyerEmail);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:7000/users/${buyerToDelete}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => {
        setBuyers((prev) => prev.filter((buyer) => buyer.email !== buyerToDelete));
        setIsModalOpen(false);
        toast.success("Buyer and associated bookings deleted successfully");
      })
      .catch((error) => console.error("Error deleting buyer:", error));
      toast.error("Failed to delete buyer");
  };

  const handleToggleBuyerRole = (email, currentRole) => {
    const newRole = currentRole === 'buyer' ? 'not_buyer' : 'buyer';

    fetch(`http://localhost:7000/users/buyer/${email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole })
    })
      .then((res) => res.json())
      .then(() => {
        setBuyers((prev) =>
          prev.map((buyer) =>
            buyer.email === email ? { ...buyer, role: newRole } : buyer
          )
        );
      })
      .catch((error) => console.error("Error updating buyer role:", error));
  };

  return (
    <div className="my-10 px-6 min-h-screen ">
      <Toaster />
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Buyers</h2>
      
      {/* Show logged-in user info */}
      {user && (
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold">Logged In User:</h3>
          <p className="text-gray-600">{user.displayName || user.email}</p>
        </div>
      )}

      {buyers.length > 0 ? (
        <div className="overflow-y-auto h-[500px] border rounded-lg shadow-lg relative max-h-80 ">
          <table className="min-w-full bg-white ">
            <thead className="sticky top-0 bg-teal-600 text-white">
              <tr>
                <th className="p-3 border-b-2 text-left">Serial</th>
                <th className="p-3 border-b-2 text-left">Name</th>
                <th className="p-3 border-b-2 text-left">Email</th>
                <th className="p-3 border-b-2">Role</th>
                <th className="p-3 border-b-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer, index) => (
                <tr key={buyer.email} className="odd:bg-gray-100 hover:bg-gray-200">
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{buyer.name}</td>
                  <td className="p-3 border-b">{buyer.email}</td>
                  <td className="p-3 border-b text-center">
                    <button
                      onClick={() => handleToggleBuyerRole(buyer.email, buyer.role)}
                      className="bg-green-500 text-white py-1 px-2 rounded"
                    >
                      {buyer.role === 'buyer' ? 'Buyer' : 'Make Buyer'}
                    </button>
                  </td>
                  <td className="p-3 border-b text-center">
                    <button onClick={() => handleDelete(buyer.email)} className="bg-red-500 text-white py-1 px-2 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No buyers found.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this buyer?</h3>
            <div className="flex justify-end space-x-4">
              <button onClick={confirmDelete} className="bg-red-600 text-white py-1 px-4 rounded">
                Confirm
              </button>
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 py-1 px-4 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBuyer;
