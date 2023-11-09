import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import CustomTooltip from "./PositionToolTip";

function PositionChart({ data }: any) {
   const updatedData = data.map((item: any) => ({
     softSkillMarks: item.softSkillAverage,
     hardSkillMarks: item.hardSkillAverage,
     name: item.name,
   }));
  return (

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="softSkillAverage"
            name="Soft Skills"
            domain={[-10, 10]}
          />
          <YAxis
            type="number"
            dataKey="hardSkillAverage"
            name="Hard Skills"
            domain={[-10, 10]}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={<CustomTooltip />}
          />
          <Scatter name="Prospects" data={data} fill="#8884d8" />
          <ReferenceLine
            x={0}
            stroke="gray"
            label={{ value: "hard", position: "top", offset: 2 }}
          />
          <ReferenceLine
            y={0}
            label={{ value: "soft", position: "right", offset: 2 }}
            stroke="gray"
          />
        </ScatterChart>
      </ResponsiveContainer>

  );
}

export default PositionChart;