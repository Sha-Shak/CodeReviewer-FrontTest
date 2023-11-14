import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { Typography } from 'antd';

const { Text } = Typography;

function CustomLineTooltip({ active, payload } : TooltipProps<ValueType, NameType>) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <Text strong className='label'>{`${payload[0].payload.week}`}</Text>
        <br></br>
        <Text className='data'>{`${payload[0].name} : ${payload[0].value}`}</Text>
      </div>
    );
  }

  return null;
}

export default CustomLineTooltip