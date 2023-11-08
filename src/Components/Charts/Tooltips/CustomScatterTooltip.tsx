import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { Tag, Typography } from 'antd';
import { parseName } from '../../../utils/helper';

const { Text } = Typography;

function getColor (type: string) {
  switch (type) {
    case "junior":
      return "#84d8a6";
    case "senior":
        return "#8884d8";
    default:
      return "#d884ad";
  }
}

const CustomScatterTooltip = ({ active, payload } : TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <Text className="label">{payload[0].payload.studentName}</Text>
        <br />
        <Text className="data">{payload[0].name} : {payload[0].value}</Text>
        <br />
        <Text className="data">{payload[1].name} : {payload[1].value}</Text>
        <br />
        <Tag 
          color={getColor(payload[0].payload.studentType)}
          style={{ borderRadius: 10, opacity: 0.7, marginTop: 5}}
        >
          {parseName(payload[0].payload.studentType)}
        </Tag>
      </div>
    );
  }

  return null;
};

export default CustomScatterTooltip