import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { day: 'Mon', distance: 5 },
  { day: 'Tue', distance: 7 },
  { day: 'Wed', distance: 3 },
  { day: 'Thu', distance: 4 },
  { day: 'Fri', distance: 6 },
  { day: 'Sat', distance: 5 },
  { day: 'Sun', distance: 8 },
];

const DistanceBarChart = () => {
  return (
    <div>
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="distance" fill="#8884d8" />
    </BarChart>
    <p>Distance covered in Past  7 days</p>
    </div>
  );
};

export default DistanceBarChart;
