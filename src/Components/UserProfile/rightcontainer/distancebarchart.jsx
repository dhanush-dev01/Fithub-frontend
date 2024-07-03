import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

// Function to convert time string to total seconds
const timeStringToSeconds = (timeString) => {
  const timeParts = timeString.split(' ');
  let totalSeconds = 0;
  
  timeParts.forEach(part => {
    if (part.endsWith('h')) {
      totalSeconds += parseInt(part) * 3600;
    } else if (part.endsWith('m')) {
      totalSeconds += parseInt(part) * 60;
    } else if (part.endsWith('s')) {
      totalSeconds += parseInt(part);
    }
  });

  return totalSeconds;
};

const DistanceBarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/customer/getRecords', {
          params: { customerid: localStorage.getItem('customerId') }
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

        // Transform activities into chart data format
        const chartData = activities.map(activity => ({
          day: activity.date.split(',')[0].trim(), // Assuming date format is consistent
          timeInSeconds: timeStringToSeconds(activity.time)
        }));

        setChartData(chartData);
      } catch (error) {
        console.error('Error loading activities:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="timeInSeconds" name="Time (seconds)" fill="#8884d8" />
      </BarChart>
      <p>Time spent on activities </p>
    </div>
  );
};

export default DistanceBarChart;
