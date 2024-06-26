import { useEffect, useState } from 'react';
import weeks from '../../assets/data/weeks.json';
import reportTypes from '../../assets/data/reportType.json';
import { Select, Typography } from 'antd';
import { parseName } from '../../utils/helper';
import { IStudent } from '../../interfaces/student/student.interface';
import conf from '../../config';
import { serverFetch } from '../../utils/handleRequest';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import CustomBarLegend from './Legends/CustomBarLegend';
import CustomSkillBarTooltip from './Tooltips/CustomSkillBarTooltip';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function AverageSkillsBarChart({ skillType }: { skillType: 'hard-skills' | 'soft-skills' }) {

  const timeOptions = skillType === 'hard-skills' ? weeks : reportTypes;

  const [type, setType] = useState<string>('junior');
  const [time, setTime] = useState<string>('overall');
  const [marks, setMarks] = useState<{ name: string, marks: number, _id: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();


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

        const newMarks = res.map(mark => ({ name: mark.student.name, marks: mark.averageMarks, _id: mark.student._id }));
        const sortedMarks = newMarks.sort((a, b) => {
          if (a.name < b.name) return -1
          else if (a.name > b.name) return 1
          return 0
        })
        setMarks(sortedMarks);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    fetchMarks();
  }, [skillType, type, time])

  function handleBarClick(data: { payload: { name: string, marks: number, _id: string } }) {
    navigate('/profile/' + data.payload._id);
  }


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
      </div>

      <div className="small-loader-container">
        {loading &&
          <>
            <LoadingOutlined />
            <Text type="secondary" style={{ marginLeft: 5 }}>Loading...</Text>
          </>
        }
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
              <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
              <Tooltip content={<CustomSkillBarTooltip />} />
              <Legend content={<CustomBarLegend />} />
              <Bar dataKey="marks" fill="#8884d8" onClick={handleBarClick} />
            </BarChart>
          </ResponsiveContainer>
          :
          <div className='no-data-info-container'>
            <Text>No data as of yet.</Text>
          </div>
        }
      </div>
    </div>
  )
}

export default AverageSkillsBarChart