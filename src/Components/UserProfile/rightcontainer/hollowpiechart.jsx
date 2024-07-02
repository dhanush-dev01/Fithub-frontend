import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import axios from 'axios';
import styles from '../rightcontainer/Styles/piechart.module.css'

const COLORS = ['#0088FE', '#00C49F'];

const HollowPieChart = () => {
  const [data, setData] = useState([]);
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
        }).filter(activity => activity !== null); // Filter out any null values from parsing errors

        const achievedCount = activities.filter(activity => activity.goalAchieved).length;
        const notAchievedCount = activities.length - achievedCount;

        setData([
          { name: 'Completed', value: achievedCount },
          { name: 'Not Completed', value: notAchievedCount }
        ]);
      } catch (error) {
        console.error('Error loading activities:', error);
      }
    };

    fetchData();
  }, [customerId]);

  const totalActivities = data.reduce((acc, item) => acc + item.value, 0);
  const completedActivities = data.find(item => item.name === 'Completed')?.value || 0;

  return (
    <div className={styles.container}>
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
      <div className={styles.centeredText}>
        {completedActivities}/{totalActivities}
      </div>
      <p>Target completed Past 7 days</p>
    </div>
  );
};

export default HollowPieChart;
