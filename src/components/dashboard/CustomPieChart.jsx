import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  ResponsiveContainer,
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

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {percent > 0 && `${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function CustomPieChart({ data }) {
  return (
    <ResponsiveContainer minHeight={450}>
      <PieChart width={450} height={450}>
        <Pie
          data={data}
          cx={'50%'}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="respostas"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36} />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
