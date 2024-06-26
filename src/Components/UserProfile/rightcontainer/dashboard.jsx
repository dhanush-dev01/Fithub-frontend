import React, { useState, useEffect } from 'react';
import styles from './Styles/dashboard.module.css';
import DistanceBarChart from './distancebarchart';
import HollowPieChart from './hollowpiechart';


const quotes = [
  "The miracle isn't that I finished. The miracle is that I had the courage to start. - John Bingham",
  "Run when you can, walk if you have to, crawl if you must; just never give up. - Dean Karnazes",
  "Jogging is the greatest metaphor for life because you get out of it what you put into it. - Oprah Winfrey",
  "It’s not about being the best. It’s about being better than you were yesterday. - Anonymous",
  "Your body can stand almost anything. It’s your mind that you have to convince. - Anonymous",
  "The pain you feel today will be the strength you feel tomorrow. - Anonymous",
  "You don’t have to be fast, you just have to go. - Anonymous",
  "A good run cleanses your mind, body, and soul. - Anonymous",
  "Don’t limit your challenges. Challenge your limits. - Jerry Dunn",
  "Jogging is not about being better than someone else. It’s about being better than you used to be. - Anonymous"
];

const Dashboard = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const colors = [
    '#f44336', // Red
    '#e91e63', // Pink
    '#9c27b0', // Purple
    '#673ab7', // Deep Purple
    '#3f51b5', // Indigo
    '#2196f3', // Blue
    '#03a9f4', // Light Blue
    '#00bcd4', // Cyan
    '#009688', // Teal
    '#4caf50', // Green
  ];

  const currentColor = colors[currentQuoteIndex % colors.length];

  const quoteStyle = {
    padding: '20px',
    margin: '20px 0',
    borderRadius: '10px',
    transition: 'all 0.5s ease-in-out',
    backgroundColor: currentColor,
    color: 'white',
    fontSize: '1.2em',
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.Quotes} style={quoteStyle}>
        {quotes[currentQuoteIndex]}
      </div>
      <div className={styles.dashboard_main}>
      <div className={styles.widget}>
        <HollowPieChart />
      </div>
      <div className={styles.widget}>
        <DistanceBarChart />
      </div>
      </div>

    </div>
  );
};

export default Dashboard;
