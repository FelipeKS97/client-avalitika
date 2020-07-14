import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('Jan', 0),
  createData('Fev', 0),
  createData('Mar', 0),
  createData('Abr', 40),
  createData('Mai', 50),
  createData('Jun', 150),
  createData('Jul', 200),
  createData('Ago', 0),
  createData('Set', 0),
  createData('Out', 30),
  createData('Nov', 250),
  createData('Dez', 100),
];

export default function Chart() {
  const { palette } = useTheme();

  return (
    <>
      <Title>Respostas</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={palette.text.secondary} />
          <YAxis stroke={palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: palette.text.primary }}
            >
              Quantidade
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}