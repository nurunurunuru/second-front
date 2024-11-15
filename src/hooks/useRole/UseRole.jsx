// import { useEffect, useState } from "react";

// const useRole = (email) => {
//   const [role, setRole] = useState(null);
//   const [roleLoading, setRoleLoading] = useState(true);

//   useEffect(() => {
//     if (email) {
//       fetch(`http://localhost:7000/users/role/${email}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setRole(data.role); // Ensure your backend returns a 'role' field
//           setRoleLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching user role:", error);
//           setRoleLoading(false);
//         });
//     } else {
//       setRoleLoading(false);
//     }
//   }, [email]);

//   return [role, roleLoading];
// };

// export default useRole;
