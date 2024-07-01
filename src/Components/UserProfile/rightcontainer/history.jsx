import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const History = () => {
  const [data, setData] = useState([]);
  const [fileExists, setFileExists] = useState(false);
  const customerId = localStorage.getItem('customerId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/customer/getRecords', {
          params: { customerid: customerId }
        });
        console.log('API Response:', response.data); 

        const activities = response.data.map((item) => {
          try {
            const record = item.split(' --> ')[1];
            if (record.startsWith('{') && record.endsWith('}')) {
              return JSON.parse(record);
            } else {
              console.warn('Invalid record format:', item);
              return null;
            }
          } catch (parseError) {
            console.error('Error parsing record:', parseError, 'Record:', item);
            return null;
          }
        }).filter(activity => activity !== null); 
        setData(activities);
        setFileExists(true);
      } catch (error) {
        console.error('Error loading activities:', error);
        setFileExists(false);
      }
    };

    fetchData();
  }, [customerId]);

  // Group activities by date
  const groupedData = data.reduce((acc, activity) => {
    const date = activity.date.split(',')[0]; 
    (acc[date] = acc[date] || []).push(activity);
    return acc;
  }, {});

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Activity History</h2>
      {fileExists ? (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Activities</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedData).map((date, index) => (
              <tr key={index}>
                <td>{date}</td>
                <td>
                  <table className="table">
                    <thead>
                      <tr className={'table-primary'}>
                        <th>Time</th>
                        <th>Distance</th>
                        <th>Goal</th>
                        <th>Completion Time</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedData[date].map((activity, subIndex) => (
                        <tr 
                          key={subIndex} 
                          className={activity.goalAchieved ? 'table-success' : 'table-danger'}
                        >
                          <td>{activity.date.split(',')[1].trim()}</td> 
                          <td>{activity.distance}</td>
                          <td>{activity.goal}</td>
                          <td>{activity.time}</td>
                          <td>{activity.goalAchieved ? 'Great!' : 'Oops, start journey again'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
