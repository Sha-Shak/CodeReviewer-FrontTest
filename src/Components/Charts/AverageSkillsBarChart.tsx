import { useEffect, useState } from 'react';
import weeks from '../../assets/data/weeks.json';
import reportTypes from '../../assets/data/reportType.json';
import { Select, Spin, Typography } from 'antd';
import { parseName } from '../../utils/helper';
import { IStudent } from '../../interfaces/student/student.interface';
import conf from '../../config';
import { serverFetch } from '../../utils/handleRequest';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import CustomBarLegend from './Legends/CustomBarLegend';
import CustomSkillBarTooltip from './Tooltips/CustomSkillBarTooltip';

const { Title, Text } = Typography;

function AverageSkillsBarChart({ skillType }: { skillType: 'hard-skills' | 'soft-skills' }) {

  const timeOptions = skillType === 'hard-skills' ? weeks : reportTypes;

  const [type, setType] = useState<string>('junior');
  const [time, setTime] = useState<string>('overall');
  const [marks, setMarks] = useState<{ name: string, marks: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    async function fetchMarks() {
      try {
        setLoading(true);
        const timeFrame = time === 'overall' ? 'overall' : skillType === 'hard-skills' ? 'weekly' : 'report';
        const url = `${conf.API_BASE_URL}/marks/${skillType}/average/${timeFrame}/${type}${time === 'overall' ? "" : ("/" + time)}`;
        const res: {
          averageMarks: number,
          student: IStudent
        }[] = await serverFetch('get', url);

        const newMarks = res.map(mark => ({ name: mark.student.name, marks: mark.averageMarks }))
        setMarks(newMarks);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    fetchMarks();
  }, [skillType, type, time])

  return (
    <div className="skill-chart">
      <Title level={3}>{parseName(skillType)}</Title>
      <div>
        <Select
          options={[{ label: 'Junior', value: 'junior' }, { label: 'Senior', value: 'senior' }]}
          onChange={(value: string) => setType(value)}
          defaultValue="junior"
          style={{ marginRight: 10 }}
        />

        <Select
          options={[{ label: 'Overall', value: 'overall' }, ...timeOptions.map(option => ({ label: parseName(option), value: option }))]}
          onChange={(value: string) => setTime(value)}
          defaultValue="overall"
        />
        <Spin spinning={loading} tip="Fetching stats..." style={{ marginLeft: 5 }}>
        </Spin>
      </div>
      <div style={{ width: "100%", height: "180px" }}>
        {marks.length ?
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
              <Tooltip content={<CustomSkillBarTooltip />}/>
              <Legend content={<CustomBarLegend />} />
              <Bar dataKey="marks" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          : <Text>No data as of yet.</Text>}
      </div>
    </div>
  )
}

export default AverageSkillsBarChart