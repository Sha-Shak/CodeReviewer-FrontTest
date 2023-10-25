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

function RadarChartComponent({
  skillurl,
  avgMarksUrl,
  title,
}: {
  skillurl: string;
  avgMarksUrl: string;
  title: string;
}) {
  const [loading, setLoading] = useState(false);
  const [skillData, setSkillData] = useState<any[]>([]);


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch soft skill data
        const softSkillResponse = await serverFetch("get", skillurl);
        const skillData: any[] = softSkillResponse;

        // Fetch average marks data
        const avgMarksResponse = await serverFetch("get", avgMarksUrl);
        const avgMarksData: any[] = avgMarksResponse;

        //Combine the two datasets
        const combinedData: any[] = skillData.map((skill, index) => {
          return {
            ...skill,
            averageMarks: avgMarksData[index].marks,
          };
        });
        setSkillData(combinedData);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchData();
  }, [skillurl, avgMarksUrl]);

  return (
    <div className="chart-container text-center mb-1">
      <h2 className="chart-title">{title}</h2>

      <div style={{ width: "100%", height: "200px" }}>
        {loading ? (
          <Skeleton.Avatar size={164} active />
        ) : (
          <>
            {skillData.length > 0 ? (
              <ResponsiveContainer>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={skillData}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: "small" }} />
                  <PolarRadiusAxis domain={[0, 10]} />
                  {/* 
                    //! TODO: Need to fix the tooltip!
                  */}
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={<CustomRadarTooltip />}
                  />

                  <Radar
                    name="Soft Skills"
                    dataKey="marks"
                    stroke="#0088FF"
                    fill="#0088FF"
                    fillOpacity={0.6}
                  />

                  <Radar
                    name="Average Marks"
                    dataKey="averageMarks"
                    stroke="#FF0000"
                    fill="#FF0000"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <p>No data available for {title}.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default RadarChartComponent;
