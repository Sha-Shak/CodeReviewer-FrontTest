import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Week A",
    marks: 70,
  },
  {
    name: "Week B",
    marks: 88,
  },
  {
    name: "Week C",
    marks: 60,
  },
  {
    name: "Week D",
    marks: 60,
  },
  {
    name: "Week E",
    marks: 77,
  },
  {
    name: "Week F",
    marks: 80,
  },
];

const LineCharts = () => {
  return (
    <div style={{ width: "100%", height: "250px" }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="marks"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineCharts;
