import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { IHardSkillWeeklyReport } from "../../interfaces/marks/hardSkillWeeklyReport.interface";
import { serverFetch } from "../../utils/handleRequest";

const SkillsRadarChart = ({ id, reportType, skillType } : { id: string, reportType: string, skillType: "hard-skills" | "soft-skills"}) => {

  const [report, setReport] = useState<IHardSkillWeeklyReport | undefined>(undefined)

  useEffect(() => {
    async function fetchReport() {
      const url = "https://code-reviewer-server-projectcode.koyeb.app/marks/" + skillType + (skillType === "hard-skills" ? "/weekly/" : "/report/") + reportType + "/" + id;
      const report : IHardSkillWeeklyReport = await serverFetch("get", url);
      report.marks.forEach(mark => mark.skillName = capitalizeNames(mark.skillName));
      setReport(report);
    }

    fetchReport();
  }, [id, reportType, skillType])

  function capitalizeNames (name: string) {
    return name.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
  }
  
  return (
    <div style={{ width: "100%", height: "250px" }}>
      {report && 
            <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={report.marks}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skillName"/>
              <PolarRadiusAxis domain={[0, 10]}/>
              <Radar
                name="Marks"
                dataKey="averageMarks"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
                dot={true}
              />
            </RadarChart>
          </ResponsiveContainer>
      }

    </div>
  );
};

export default SkillsRadarChart;
