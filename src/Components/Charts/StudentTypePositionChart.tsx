import { Select, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Cell, ReferenceLine, Scatter, ScatterChart, Tooltip } from 'recharts'
import { parseName } from '../../utils/helper'
import { IStudentPositionMark } from '../../interfaces/studentPosition/studentPositonMark.interface'
import CustomScatterTooltip from './Tooltips/CustomScatterTooltip'
import { IStudentPositionReport } from '../../interfaces/studentPosition/studentPositionReport.interface'
import conf from '../../config'
import { serverFetch } from '../../utils/handleRequest';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'

const { Title, Text } = Typography;

function StudentTypePositionChart() {

  const [data, setData] = useState<IStudentPositionMark[]>([]);
  const [selectedTypes, setSeletedTypes] = useState<string[]>(["junior", "senior"]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const typeOptions = ["junior", "senior", "alumni"];

  async function getData() {
    try {
      if (selectedTypes.length) {
        setLoading(true);
        const url = `${conf.API_BASE_URL}/marks/position/type/?types=${selectedTypes.join("+")}`;
        const report: IStudentPositionReport = await serverFetch("get", url);
        setData(report.marks);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [selectedTypes]);

  const handleChange = (value: string[]) => {
    setSeletedTypes(value);
  }

  const tagRender = (props: CustomTagProps) => {
    const { label, closable, onClose } = props;
    const value: string = props.value;

    console.log(props);
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const color = value === "junior" ? "#84d8a6" : props.value === "senior" ? "#8884d8" : "#d884ad";
    return (
      <Tag
        color={color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3, height: "120%", display: "flex", alignItems: "center", fontWeight: "bold" }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <div className="skill-chart">
      <Title level={3}>Student Positions</Title>

      <Select
        placeholder="Please select student types"
        size="large"
        onChange={handleChange}
        style={{ width: 300 }}
        options={typeOptions.map(type => ({ label: parseName(type), value: type }))}
        mode="multiple"
        defaultValue={["junior", "senior"]}
        tagRender={tagRender}
      />

      <div style={{ width: "100%", height: "300px" }}>

        {loading ?
          <div className="small-loader-container">
            <LoadingOutlined />
            <Text type="secondary" style={{ marginLeft: 5 }}>Loading...</Text>
          </div> 
          : data.length ? 
          <ResponsiveContainer>
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="number" dataKey="softSkillAvg" name="Soft skills" domain={[0, 10]} interval={2} />
              <YAxis type="number" dataKey="hardSkillAvg" name="Hard skills" domain={[0, 10]} interval={2} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomScatterTooltip />} />
              <Scatter name="Student Position" data={data} fill="#8884d8">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.studentType === "junior" ? "#84d8a6" : entry.studentType === "senior" ? "#8884d8" : "#d884ad"}
                    onClick={() => navigate('/profile/' + entry.studentId)}
                  />
                ))}
              </Scatter>
              <ReferenceLine y={5} label={{ value: 'Soft', position: 'left', offset: 5 }} stroke="#000000" />
              <ReferenceLine x={5} label={{ value: 'Hard', position: 'bottom', offset: 5 }} stroke="#000000" />
            </ScatterChart>
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

export default StudentTypePositionChart