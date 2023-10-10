import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
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

const StudentRadarChart = () => {
  return (
    <div style={{ width: "33%", height: "250px" }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis />
          <Radar
            name="Marks"
            dataKey="marks"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentRadarChart;
