import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const navigate = useNavigate();
  const gamerEmail = Cookies.get('gameremail');
  const username = gamerEmail ? gamerEmail.split('@')[0] : 'Guest';

  const handleLogout = () => {
    // Remove the cookie
    Cookies.remove('gameremail');
    // Redirect to /auth
    navigate('/auth');
  };

  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between items-center ">
      <div className="text-lg font-bold">
        {username}
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
