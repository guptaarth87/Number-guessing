import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../_helper';

const LeaderBoard = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/top10users`);
        setTopUsers(response.data.topUsers);
      } catch (error) {
        console.error('Error fetching top users:', error);
      }
    };

    fetchTopUsers();
  }, []);

  const formatEmail = (email) => {
    return email.split('@')[0];
  };

  return (
    <div className="p-4 w-full md:w-1/3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-white rounded-lg shadow-lg animate-gradient-xy">
      <h2 className="text-xl font-semibold mb-4 text-center">🏆 Leaderboard</h2>
      <table className="table-auto w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-2 px-4">#️⃣</th>
            <th className="py-2 px-4">👤 Username</th>
            <th className="py-2 px-4">🔝 Max Score</th>
          </tr>
        </thead>
        <tbody>
          {topUsers.length > 0 ? (
            topUsers.map((user, index) => (
              <tr key={user._id} className="border-b border-gray-300">
                <td className="py-2 px-4">{index + 1}</td> {/* Serial Number */}
                <td className="py-2 px-4">{formatEmail(user.email)}</td>
                <td className="py-2 px-4">{user.maxScore}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-2">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
