import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { Typography } from 'antd';

const { Text } = Typography;

const CustomScatterTooltip = ({ active, payload } : TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <Text className="label">{payload[0].payload.studentName}</Text>
        <br />
        <Text className="data">{payload[0].name} : {payload[0].value}</Text>
        <br />
        <Text className="data">{payload[1].name} : {payload[1].value}</Text>
      </div>
    );
  }

  return null;
};

export default CustomScatterTooltip