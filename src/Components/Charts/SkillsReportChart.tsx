import { useEffect, useState } from 'react'
import weeks from '../../assets/data/weeks.json';
import reports from '../../assets/data/reportType.json';
import { capitalizeNames, parseName } from '../../utils/helper';
import { ISoftSkillsQuarterlyReport } from '../../interfaces/marks/softSkillsQuarterlyReport.interface';
import { IPeerReviewWeeklyReport } from '../../interfaces/marks/peerReviewWeeklyReport.interface';
import { IHardSkillWeeklyReport } from '../../interfaces/marks/hardSkillWeeklyReport.interface';
import conf from '../../config';
import { serverFetch } from '../../utils/handleRequest';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CustomRadarTooltip from './Tooltips/CustomRadarTooltip';
import { Spin } from 'antd';

function SkillsReportChart({ id, type }: { id: string, type: 'hard-skills' | 'soft-skills' | 'peer-review' }) {
  const options = type === "soft-skills" ? reports : weeks;
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedReport, setSelectedReport] = useState<string>(options[0]);
  const [report, setReport] = useState<IHardSkillWeeklyReport | ISoftSkillsQuarterlyReport | IPeerReviewWeeklyReport | undefined>(undefined)

  useEffect(() => {
    async function fetchReport() {
      let url: string;

      if (type === "peer-review") {
        url = `${conf.API_BASE_URL}/peer-review/average/${id}` + (selectedReport === "overall" ? "" : `?week=${selectedReport}`);
      } else {
        url = `${conf.API_BASE_URL}/marks/` + type + (type === "hard-skills" ? "/weekly/" : "/report/") + selectedReport + "/" + id;
      }

      try {
        setLoading(true);
        const report: IHardSkillWeeklyReport | ISoftSkillsQuarterlyReport | IPeerReviewWeeklyReport = await serverFetch("get", url);
        report.marks.forEach(mark => mark.skillName = capitalizeNames(mark.skillName));
        report.marks = report.marks.sort((a, b) => a.skillName.localeCompare(b.skillName));
        setReport(report);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }

    }

    fetchReport();
  }, [id, type, selectedReport])

  return (
    <div className='chart-container'>
      <h2 className="chart-title">{parseName(type)}</h2>
      <select className="chart-select" onChange={(e) => setSelectedReport(e.target.value)}>
        {options.map((option, index) => <option key={`${type}-report-option-${index}`} value={option}>{parseName(option)}</option>)}
      </select>

      <Spin spinning={loading} tip="Fetching data" size="large" >
        <div style={{ width: "100%", height: "200px" }}>
          {report && report.marks.length ?
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={report.marks}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skillName" tick={{ fontSize: "small" }} />
                <PolarRadiusAxis domain={[0, 10]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomRadarTooltip />} />
                <Radar
                  name="Marks"
                  dataKey="averageMarks"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
            :
            <h3>No marks for {selectedReport}, yet.</h3>
          }
        </div>
      </Spin>
    </div>
  )
}

export default SkillsReportChart