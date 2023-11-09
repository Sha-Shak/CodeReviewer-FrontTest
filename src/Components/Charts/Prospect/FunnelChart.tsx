import {
  Funnel,
  LabelList,
  FunnelChart as RechartsFunnelChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { IFunnelData } from "../../../Pages/SourceDashboardPage";

const FunnelChart = ({ data }: { data: IFunnelData[] }) => {
  console.log("funnel mount", data);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsFunnelChart>
        <Tooltip />
        <Funnel dataKey="count" data={data} isAnimationActive fill="#8884d8">
          <LabelList dataKey="name" position="left" fill="#000" />
        </Funnel>
      </RechartsFunnelChart>
    </ResponsiveContainer>
  );
};

export default FunnelChart;
