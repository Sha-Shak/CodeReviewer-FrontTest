import { Spin } from 'antd';
import { useEffect, useState } from 'react'
import conf from '../../config';
import { serverFetch } from '../../utils/handleRequest';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { parseName } from '../../utils/helper';
import CustomLineTooltip from './Tooltips/CustomLineTooltip';

function ProgressLineChart({ id }: { id: string }) {

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ hard: number, week: string, soft?: number }[]>([]);

  useEffect(() => {
    async function getProgress() {
      try {
        setLoading(true);
        const url = `${conf.API_BASE_URL}/marks/progress/${id}`;
        const data = await serverFetch<{ marks: number, week: string, type: string }[]>('get', url);
        const sortedData = data.sort((a, b) => {
          if (a.week < b.week) return -1;
          else if (a.week > b.week) return 1;
          return 0;
        }).map(item => ({ ...item, week: parseName(item.week) }));

        const filteredHardMarks = sortedData.filter(item => item.type === 'hard-skill');
        const filteredSoftMarks = sortedData.filter(item => item.type === 'soft-skill');

        const parsedMarks = filteredHardMarks.map(item => {
          const num = Number(item.week.split(' ')[1]);
          const searchWeek = num <= 3 ? 'Week 3' : num <= 6 ? 'Week 6' : num <= 9 ? 'Week 9' : 'Week 12';
          const index = filteredSoftMarks.findIndex(soft => soft.week === searchWeek);
          return { hard: item.marks, week: item.week, ...(index !== -1 ? { soft: filteredHardMarks[index].marks } : {}) }
        })

        setData([{ hard: 0, soft: 0, week: "week-0" }, ...parsedMarks]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    getProgress();
  }, [id])

  return (
    <div className="progress-chart-container">
      <h2 className="chart-title">Progress</h2>
      <Spin spinning={loading} tip="Fetching data" size="large">
        <div style={{ width: "100%", height: "200px" }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
              <Tooltip content={<CustomLineTooltip />} />
              <defs>
                <linearGradient id="colorHardMarks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSoftMarks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="soft" stroke="#82ca9d" fillOpacity={1} fill="url(#colorSoftMarks)" />
              <Area type="monotone" dataKey="hard" stroke="#8884d8" fillOpacity={1} fill="url(#colorHardMarks)" />
            </AreaChart>
          </ResponsiveContainer>

        </div>
      </Spin>
    </div>
  )
}

export default ProgressLineChart