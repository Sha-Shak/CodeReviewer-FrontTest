import { useEffect, useState } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { IStudentPositionMark } from '../../interfaces/studentPosition/studentPositonMark.interface';
import { serverFetch } from '../../utils/handleRequest';
import { IStudentPositionReport } from '../../interfaces/studentPosition/studentPositionReport.interface';
import CustomScatterTooltip from './Tooltips/CustomScatterTooltip';
import weeks from '../../assets/data/weeks.json';
import conf from '../../config';
import { parseName } from '../../utils/helper';
import { IStudent } from '../../interfaces/student/student.interface';
import { Spin } from 'antd';

function StudentPositionChart({ id } : { id?: string }) {

  const [data, setData] = useState<IStudentPositionMark[]>([]);
  const [studentGroup, setStudentGroup] = useState<"all" | "cohort">("all");
  const [time, setTime] = useState<string>("overall");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchStudentPositionMarks () {
      try {
        const type = time === "overall" ? "overall" : "weekly";
        const studentUrl = `${conf.API_BASE_URL}/students/profile/` + id;

        setLoading(true);
        const studentInfo : IStudent = await serverFetch("get", studentUrl);
        const timeType = type === "weekly" ? `/${time}` : "";
        const cohort = studentGroup === "cohort" ? `?cohort=${studentInfo.cohort}` : "";
        const url = `${conf.API_BASE_URL}/marks/position/${type}${timeType}${cohort}`;
        const report : IStudentPositionReport = await serverFetch("get", url);
        setData(report.marks);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    fetchStudentPositionMarks();
  }, [time, studentGroup])
  
  return (
    <div className="chart-container">
      <h2 className="chart-title">Student Position</h2>
      <select className="chart-select" onChange={(e) => setStudentGroup(e.target.value as "all" | "cohort")}>
        <option value="all">All students</option>
        <option value="cohort">Cohort</option>
      </select>

      <select className="chart-select" onChange={(e) => setTime(e.target.value)}>
        {weeks.map((week, index) => <option key={`week-option-${index}`} value={week}>{parseName(week)}</option>)} 
        <option value="overall">Overall</option>
      </select>

      <Spin spinning={loading} tip="Fetching data" size="large" >
        <ResponsiveContainer width="100%" height={200}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="softSkillAvg" name="Soft skills" domain={[0, 10]} interval={2}/>
            <YAxis type="number" dataKey="hardSkillAvg" name="Hard skills" domain={[0, 10]} interval={2}/>
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomScatterTooltip />}/>
            <Scatter name="Student Position" data={data} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.studentId === id ? "#0dde6b" : "#8884d8"} />
            ))}
            </Scatter>
            <ReferenceLine y={5} label={{ value: 'Soft', position: 'left', offset: 5 }} stroke="#000000" />
            <ReferenceLine x={5} label={{ value: 'Hard', position: 'top', offset: 5 }} stroke="#000000" />
          </ScatterChart>
        </ResponsiveContainer>

      </Spin>
    </div>
  )
}

export default StudentPositionChart