import { useEffect, useState } from 'react';
import weeks from '../../assets/data/weeks.json';
import reportTypes from '../../assets/data/reportType.json';
import { Select } from 'antd';
import { parseName } from '../../utils/helper';
import { IStudent } from '../../interfaces/student/student.interface';
import conf from '../../config';
import { serverFetch } from '../../utils/handleRequest';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

function AverageSkillsBarChart({ skillType }: { skillType: 'hard-skills' | 'soft-skills' }) {

  const timeOptions = skillType === 'hard-skills' ? weeks : reportTypes;

  const [type, setType] = useState<string>('junior');
  const [time, setTime] = useState<string>(timeOptions[0]);
  const [marks, setMarks] = useState<{ name: string, marks: number }[]>([]);


  useEffect(() => {
    async function fetchMarks() {
      try {
        const timeFrame = time === 'overall' ? 'overall' : skillType === 'hard-skills' ? 'weekly' : 'report';
        const url = `${conf.API_BASE_URL}/marks/${skillType}/average/${timeFrame}/${type}${time === 'overall' ? "" : ("/" + time)}`;
        const res: {
          averageMarks: number,
          student: IStudent
        }[] = await serverFetch('get', url);

        const newMarks = res.map(mark => ({ name: mark.student.name, marks: mark.averageMarks }))
        setMarks(newMarks);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMarks();
  }, [skillType, type, time])

  return (
    <div className="skill-chart">
      <h3>{parseName(skillType)}</h3>
      <div>
        <Select
          options={[{ label: 'Junior', value: 'junior' }, { label: 'Senior', value: 'senior' }]}
          onChange={(value: string) => setType(value)}
          defaultValue="junior"
          style={{marginRight: 10}}
        />

        <Select
          options={[{ label: 'Overall', value: 'overall' }, ...timeOptions.map(option => ({ label: parseName(option), value: option }))]}
          onChange={(value: string) => setTime(value)}
          defaultValue="overall"
        />
      </div>
      <div style={{ width: "100%", height: "180px" }}>
        <ResponsiveContainer>
          <BarChart
            data={marks}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid />
            <XAxis dataKey="name" hide />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="marks" fill="#8884d8" label='marks' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AverageSkillsBarChart