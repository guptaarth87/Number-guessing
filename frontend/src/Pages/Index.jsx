import React, { useEffect, useState } from 'react';
import NumberGuessingGame from '../Components/NumberGuessingGame/NumberGuessingGame';
import LeaderBoard from '../Components/LeaderBoard/LeaderBoard';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

export default function Index() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const gameremail = Cookies.get('gameremail');
    if (!gameremail) {
      // If gameremail cookie is not found, redirect to /auth
      navigate('/auth');
    } else {
      setUsername(gameremail);
    }
  }, [navigate]);

  return (
    <>
     <div className="min-h-screen bg-gray-800 flex flex-col">
      <Navbar />
      <div className="flex flex-col md:flex-row flex-1">
        <div className="flex-1 p-4">
          <NumberGuessingGame />
        </div>
        <div className="flex-1 p-4">
          <LeaderBoard />
        </div>
      </div>
      <Footer /> {/* Add the Footer component */}
    </div>
    </>
  );
}
