import React, { useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";


const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#e61526",
  "#8815e6",
  "#b2e615",
  "#01426e",
];

const CustomizedLabel = (props) => {
  const { x, y, fill, value, totalAnswers } = props;
  const percent = ((value / totalAnswers) * 100).toFixed(0);

  return (
    <text x={x} y={y} dy={-4} fontSize="14" fill={fill} textAnchor="middle">
      {percent > 0 && `${percent}%`}
    </text>
  );
};

export default function CustomBarChart({ data, setTotalAnswers }) {
  const totalAnswers = data.reduce((prev, cur) => {
      return prev + cur.respostas;
  }, 0);

  setTotalAnswers(totalAnswers)
    
  return (
    <BarChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 30,
        bottom: 5,
      }}
      barSize={40}
    >
      <XAxis
        dataKey="name"
        scale="point"
        padding={{ left: 10, right: 10 }}
      />
      <YAxis hide />
      <Bar
        label={<CustomizedLabel totalAnswers={totalAnswers} />}
        dataKey="respostas"
        background={{ fill: "#fff" }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
      <Tooltip />
      <Legend 
        verticalAlign="bottom" 
        height={36}
        payload={
          data.map(
            (item, index) => ({
              id: item.name,
              type: "square",
              value: `${item.name}`,
              color: COLORS[index % COLORS.length]
            })
          )
        } 
      />
    </BarChart>
  );
}
