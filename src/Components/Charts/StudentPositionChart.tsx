import { useEffect, useState } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { IStudentPositionMark } from '../../interfaces/studentPosition/studentPositonMark.interface';
import { serverFetch } from '../../utils/handleRequest';
import { IStudentPositionReport } from '../../interfaces/studentPosition/studentPositionReport.interface';
import CustomScatterTooltip from './Tooltips/CustomScatterTooltip';

function StudentPositionChart({ id } : { id?: string }) {

  const [data, setData] = useState<IStudentPositionMark[]>([]);

  useEffect(() => {
    async function fetchStudentPositionMarks () {
      try {
        const url = 'http://localhost:3000/marks/position/overall'
        const report : IStudentPositionReport = await serverFetch("get", url);
        console.log(report.marks)
        setData(report.marks);
      } catch (error) {
        console.log(error);
      }
    }

    fetchStudentPositionMarks();
  }, [])
  
  return (
    <div className="chart-container">
      <h2 className="chart-title">Student Position</h2>

      <ResponsiveContainer width="100%" height={250}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="softSkillAvg" name="Soft skills" domain={[0, 10]}  interval={0}/>
          <YAxis type="number" dataKey="hardSkillAvg" name="Hard skills" domain={[0, 10]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomScatterTooltip />}/>
          <Scatter name="Student Position" data={data} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.studentId === id ? "#0dde6b" : "#8884d8"} />
          ))}
          </Scatter>
          <ReferenceLine y={5} stroke="#000000" />
          <ReferenceLine x={5} stroke="#000000" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StudentPositionChart