import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import styled from 'styled-components';

const data = [
  { name: 'Completed', value: 13 },
  { name: 'Remaining', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F'];

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenteredText = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
`;

const HollowPieChart = () => {
  const totalActivities = data.reduce((acc, item) => acc + item.value, 0);
  const completedActivities = data[0].value;

  return (
    <Container>
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
      <CenteredText>
        {completedActivities}/{totalActivities}
      </CenteredText>
      <p>Target completed Past 7 days</p>
    </Container>
  );
};

export default HollowPieChart;
