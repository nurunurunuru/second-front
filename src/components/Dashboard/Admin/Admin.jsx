import React, { useContext, useEffect, useState,  } from 'react';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';

const Admin = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      // Fetch admin data from the backend
      fetch(`http://localhost:7000/users/admin/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.isAdmin) {
            setAdminData(data); // Store the admin data
          }
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/login"); // Redirect to login page if not an admin
    }
  }, [isAdmin, user, navigate]);

  if (!adminData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>Admin Information</h2>
      <p>Name: {adminData.name}</p>
      <p>Email: {adminData.email}</p>
      {/* Display more admin-specific information here */}
    </div>
  );
};

export default Admin;
