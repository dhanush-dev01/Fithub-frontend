import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Styles/history.module.css';
const History = () => {
  const [data, setData] = useState([]);
  const [fileExists, setFileExists] = useState(false);

  useEffect(() => {
    const checkAndLoadData = async () => {
      try {
        const activities = await import('');
        setData(activities.default);
        setFileExists(true);
      } catch (error) {
        console.error('Error loading activities.json:', error);
        setFileExists(false);
      }
    };

    checkAndLoadData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Activity History</h2>
      {fileExists ? (
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Distance</th>
              <th>Time</th>
              <th>Goal</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((activity, index) => (
              <tr key={index}>
                <td>{activity.distance}</td>
                <td>{activity.time}</td>
                <td>{activity.goal}</td>
                <td>{activity.date}</td>
                <td className={activity.goalAchieved ? styles.achieved : styles.notAchieved}>
                  {activity.goalAchieved ? 'Great!' : 'Oops, start journey again'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No history. Start your fitness journey soon!</p>
      )}
    </div>
  );
};

export default History;
