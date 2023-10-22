import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { serverFetch } from "../../../utils/handleRequest";
import CustomRadarTooltip from "../Tooltips/CustomRadarTooltip";

function RadarChartComponent({ url, title }: { url: string; title: string }) {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState([]);

  useEffect(() => {
    async function fetchReport() {
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
  }, [url]);

  return (
    <div className="chart-container text-center mb-1">
      <h2 className="chart-title">{title}</h2>

      <div style={{ width: "100%", height: "200px" }}>
        {loading ? (
          <Skeleton.Avatar size={164} active/>
        ) : (
          <>
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
              <p>No marks for {title}, yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default RadarChartComponent;
