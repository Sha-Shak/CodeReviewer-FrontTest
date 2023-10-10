import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Roman",
    marks: 85,
  },
  {
    name: "Imdad",
    marks: 92,
  },
  {
    name: "Asif",
    marks: 78,
  },
  {
    name: "Pial",
    marks: 88,
  },
  {
    name: "Rashid",
    marks: 76,
  },
  {
    name: "Rony",
    marks: 76,
  },
  {
    name: "Shakil",
    marks: 76,
  },
  {
    name: "Bappy",
    marks: 76,
  },
  {
    name: "Sabbir",
    marks: 36,
  },
  {
    name: "Shihab",
    marks: 70,
  },
  {
    name: "Zerin",
    marks: 66,
  },
];

const StudentMarksChart = () => {
  return (
    <div style={{ width: "33%", height: "250px" }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="marks" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentMarksChart;
