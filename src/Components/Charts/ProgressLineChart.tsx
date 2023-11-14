import { Spin, Tooltip } from 'antd';
import { useEffect, useState } from 'react'
import conf from '../../config';
import { serverFetch } from '../../utils/handleRequest';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { parseName } from '../../utils/helper';

function ProgressLineChart({ id }: { id: string }) {

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ mark: number, week: string }[]>([]);

  useEffect(() => {
    async function getProgress() {
      try {
        setLoading(true);
        const url = `${conf.API_BASE_URL}/marks/progress/hard-skill/${id}`;
        const data = await serverFetch<{ mark: number, week: string }[]>('get', url);
        const sortedData = data.sort((a, b) => {
          if (a.week < b.week) return -1;
          else if (a.week > b.week) return 1;
          return 0;
        });

        const parsedData = sortedData.map(item => ({ ...item, week: parseName(item.week)}))
        setData(parsedData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    getProgress();
  }, [id])

  return (
    <div className="chart-container">
      <h2 className="chart-title">Hard Skill Progress</h2>
      <Spin spinning={loading} tip="Fetching data" size="large">
        <div style={{ width: "100%", height: "200px" }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
              <Tooltip />
              <defs>
                <linearGradient id="colorMarks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="marks" stroke="#8884d8" fillOpacity={1} fill="url(#colorMarks)" />

            </AreaChart>
          </ResponsiveContainer>

        </div>
      </Spin>
    </div>
  )
}

export default ProgressLineChart