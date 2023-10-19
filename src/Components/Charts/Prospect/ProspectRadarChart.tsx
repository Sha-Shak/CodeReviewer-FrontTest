import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Spin } from "antd";
import conf from "../../../config";
import CustomRadarTooltip from "../Tooltips/CustomRadarTooltip";
import { serverFetch } from "../../../utils/handleRequest";

function RadarChartComponent() {
  const { type, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any[]>([]);

  useEffect(() => {
    async function fetchReport() {
      const url = `${conf.API_BASE_URL}/prospect/assignment/interview/${id}/coding-assignment`;

      try {
        setLoading(true);
        const response = await serverFetch("get", url);
        const reportData = response.marks;
        const transformedReportData = reportData.map((item: any) => ({
          skillName: item.skills.name, 
          averageMarks: item.skills.marks, 
        }));

        setReport(transformedReportData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchReport();
  }, [type, id]);

  return (
    <div className="chart-container">
      <h2 className="chart-title">{type}</h2>
      <Spin spinning={loading} tip="Fetching data" size="large">
        <div style={{ width: "100%", height: "200px" }}>
          {report && report.length ? (
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={report}>
                <PolarGrid />
                <PolarAngleAxis
                  dataKey="skillName"
                  tick={{ fontSize: "small" }}
                />
                <PolarRadiusAxis domain={[0, 10]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={<CustomRadarTooltip />}
                />
                <Radar
                  name="Marks"
                  dataKey="averageMarks"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <p>No marks for coding-assignment, yet.</p>
          )}
        </div>
      </Spin>
    </div>
  );
}

export default RadarChartComponent;
