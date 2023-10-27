import { Skeleton, Tooltip } from "antd";
import { useEffect, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer
} from "recharts";
import { serverFetch } from "../../../utils/handleRequest";
import CustomRadarTooltip from "../Tooltips/CustomRadarTooltip";
type SkillDataType = {
      
        _id: string,
        skillId: string,
        marks: 9,
        name: string
    
}
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
    console.log(`welcome to radar chart ${title}`);
    async function fetchData() {
      try {
        setLoader(true);

        // Fetch soft skill data
        const skillData = await serverFetch("get", skillUrl);
        console.log(`checking skills ${title}`, skillData);

        // Fetch average marks data
        const avgMarksResponse = await serverFetch("get", avgMarksUrl);
        const avgMarksData: any[] = avgMarksResponse;
         console.log(`checking avg skills ${title}`, avgMarksData);
        //Combine the two datasets
        const combinedData: SkillDataType[] = skillData.map((skill: SkillDataType, index: number) => {
          return {
            ...skill,
            averageMarks: avgMarksData[index].marks,
          };
        });
        setSkillData(combinedData);
        console.log(`"combined data" ${title}`, skillData)

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
                    stroke="#0088FF"
                    fill="#0088FF"
                    fillOpacity={0.6}
                  />

                  <Radar
                    name="Average Marks"
                    dataKey="averageMarks"
                    stroke="#00FFAA"
                    fill="#00FFAA"
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
