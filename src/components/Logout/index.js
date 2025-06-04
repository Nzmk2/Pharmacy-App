import React from 'react';
import Swal from 'sweetalert2';
import { getAuth, signOut } from "firebase/auth";

const Logout = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    Swal.fire({
      icon: 'question',
      title: 'Logging Out',
      text: 'Are you sure you want to log out?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        const auth = getAuth();
        signOut(auth).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Logged out successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          setIsAuthenticated(false);
        }).catch((error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Logout Failed',
            text: 'An error occurred during logout. Please try again.',
            showConfirmButton: true,
          });
        });
      }
    });
  };

  return (
    <button
      style={{ marginLeft: '12px' }}
      className="muted-button"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
