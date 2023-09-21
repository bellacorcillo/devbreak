import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StatsComponent() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user stats from the backend
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stats', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the user's token for authentication
          },
        });
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <h2>Stats</h2>
      {loading ? (
        <p>Loading...</p>
      ) : stats ? (
        <div>
          <p>Total Pomodoros: {stats.pomodoros}</p>
          <p>Total Breaks: {stats.breaks}</p>
          <p>Longest Streak: {stats.longestStreak}</p>
        </div>
      ) : (
        <p>No stats available.</p>
      )}
    </div>
  );
}

export default StatsComponent;
