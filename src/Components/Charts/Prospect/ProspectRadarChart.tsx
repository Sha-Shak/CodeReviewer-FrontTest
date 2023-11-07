import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { serverFetch } from "../../../utils/handleRequest";
type SkillDataType = {
  _id: string;
  skillId: string;
  marks: 9;
  name: string;
};
function RadarChartComponent({
  skillUrl,
  avgMarksUrl,
  title,
}: {
  skillUrl: string;
  avgMarksUrl: string;
  title: string;
}) {
  const [loader, setLoader] = useState(false);
  const [skillData, setSkillData] = useState<SkillDataType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);

        // Fetch soft skill data
        const skillData = await serverFetch("get", skillUrl);

        // Fetch average marks data
        const avgMarksResponse = await serverFetch("get", avgMarksUrl);
        const avgMarksData: any[] = avgMarksResponse;

        //Combine the two datasets
        const combinedData: SkillDataType[] = skillData.map(
          (skill: SkillDataType, index: number) => {
            return {
              ...skill,
              averageMarks: avgMarksData[index].marks,
            };
          }
        );
        setSkillData(combinedData);

        setLoader(false);
      } catch (error) {
        setLoader(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="chart-container text-center mb-1">
      <h2 className="chart-title">{title}</h2>

      <div style={{ width: "100%", height: "200px" }}>
        {loader ? (
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
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={<CustomRadarTooltip />}
                  />
                  */}

                  <Radar
                    name="Skills"
                    dataKey="marks"
                    stroke="#00ABE3"
                    fill="#00ABE3"
                    fillOpacity={0.6}
                  />

                  <Radar
                    name="Average Marks"
                    dataKey="averageMarks"
                    stroke="#FF4444"
                    fill="#FF4444"
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
