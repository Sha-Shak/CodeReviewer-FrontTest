import { Select, Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Cell, ReferenceLine, Scatter, ScatterChart, Tooltip } from 'recharts'
import { parseName } from '../../utils/helper'
import CustomBarLegend from './Legends/CustomBarLegend'
import CustomSkillBarTooltip from './Tooltips/CustomSkillBarTooltip';
import { IStudentPositionMark } from '../../interfaces/studentPosition/studentPositonMark.interface'
import CustomScatterTooltip from './Tooltips/CustomScatterTooltip'
import { IStudentPositionReport } from '../../interfaces/studentPosition/studentPositionReport.interface'
import conf from '../../config'
import { serverFetch } from '../../utils/handleRequest'

const { Title, Text } = Typography;

function StudentTypePositionChart() {

  const [data, setData] = useState<IStudentPositionMark[]>([]);
  const [selectedTypes, setSeletedTypes] = useState<string[]>(["junior", "senior"]);
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <div className="skill-chart">
      <Title level={3}>Student Positions</Title>

      <div>
        <Select
          placeholder="Please select student types"
          size="large"
          onChange={handleChange}
          style={{ width: 300 }}
          options={typeOptions.map(type => ({ label: parseName(type), value: type }))}
          mode="multiple"
          defaultValue={["junior", "senior"]}
        />

        <Spin spinning={loading} tip="Fetching stats..." style={{ marginLeft: 5 }}>
        </Spin>
      </div>

      <div style={{ width: "100%", height: "300px" }}>
        {data.length ?
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
                  <Cell key={`cell-${index}`} fill={"#8884d8"} />
                ))}
              </Scatter>
              <ReferenceLine y={5} label={{ value: 'Soft', position: 'left', offset: 5 }} stroke="#000000" />
              <ReferenceLine x={5} label={{ value: 'Hard', position: 'top', offset: 5 }} stroke="#000000" />
            </ScatterChart>
          </ResponsiveContainer>
          : <Text>No data as of yet.</Text>}
      </div>
    </div>
  )
}

export default StudentTypePositionChart