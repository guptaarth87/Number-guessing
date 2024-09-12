import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from '../../_helper';
import confetti from 'canvas-confetti'; // Import confetti
import { motion } from 'framer-motion';

const NumberGuessingGame = () => {
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(10);
  const [message, setMessage] = useState('');
  const [randomNumber, setRandomNumber] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [userMaxScore, setUserMaxScore] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const gamerEmail = Cookies.get('gameremail');
      if (gamerEmail) {
        try {
          const response = await axios.get(`${API_URL}/user/${gamerEmail}`);
          setUserMaxScore(response.data.user.maxScore);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const random = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(random);
  }, []);

  const resetGameForNextRound = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(random);
    setAttempts(10);
    setMessage('');
    setGuess('');
  };

  const handleGuess = async () => {
    if (gameOver) return;

    if (!guess) {
      setMessage('Please enter a number!');
      return;
    }

    const userGuess = parseInt(guess);

    if (userGuess === randomNumber) {
      setMessage('🎉Congratulations! You guessed it right! A new number has been generated.');
      alert('🎉Congratulations! You guessed it right! A new number has been generated.')
      setScore((prevScore) => prevScore + 1);
      resetGameForNextRound();
      return;
    } else if (userGuess < randomNumber) {
      setMessage('Too low! Try again.');
    } else if (userGuess > randomNumber) {
      setMessage('Too high! Try again.');
    }

    setAttempts((prevAttempts) => prevAttempts - 1);

    if (attempts - 1 === 0) {
      setMessage(`Game over! You ran out of attempts. Final score: ${score}`);
      setGameOver(true);

      if (score > userMaxScore) {
        try {
          // Trigger confetti when the user achieves a new high score
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });

          await axios.post(`${API_URL}/updateMaxScore`, {
            email: Cookies.get('gameremail'),
            newMaxScore: score,
          });
          alert('Congratulations! New high score!');
          window.location.reload();
        } catch (error) {
          console.error('Error updating max score:', error);
        }
      }
    }

    setGuess('');
  };

  const restartGame = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(random);
    setScore(0);
    setAttempts(10);
    setMessage('');
    setGameOver(false);
    setGuess('');
  };

  return (
    <div className="bg-white p-8 rounded-lg max-w-lg mx-auto shadow-lg">
      <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 my-8">
  MystryDigit<span className="ml-2">❓</span>
</h1>


      {!gameOver && (
        <>
          <p className="text-gray-600 text-center mb-4">Enter a number between 1 and 100</p>
          <div className="flex flex-col items-center mb-6">
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded mb-4"
              placeholder="Enter your guess"
            />
            <button
              onClick={handleGuess}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition transform hover:scale-105"
            >
              Submit Guess
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-xl">Attempts left: {attempts}</p>
            <p className="text-xl mt-2">Current Score: {score}</p>
            <p className="text-xl mt-2">Your Best Score: {userMaxScore}</p>
          </div>
        </>
      )}

      {message && (
        <div className="text-center mt-4">
          <p className="text-xl text-red-500">{message}</p>
        </div>
      )}

      {gameOver && (
        <div className="text-center mt-6">
          <p className="text-lg">Your total score: {score}</p>
          <button
            onClick={restartGame}
            className="bg-green-500 text-white py-2 px-4 mt-4 rounded hover:bg-green-600 transition"
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default NumberGuessingGame;
