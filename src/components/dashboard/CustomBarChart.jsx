import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const exampleData = [
  {
    name: 'Opção A',  total: 24
  },
  {
    name: 'Opção B',  total: 12
  },
  {
    name: 'Opção C',  total: 0
  },
  {
    name: 'Opção D',  total: 3
  },
  {
    name: 'Opção E',  total: 4
  }
];

export default function CustomBarChart({ data }) {

    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis /> 
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="2 2" />
        <Bar dataKey="total" fill="#1A1C4A" background={{ fill: '#eee' }} />
      </BarChart>
    );

}