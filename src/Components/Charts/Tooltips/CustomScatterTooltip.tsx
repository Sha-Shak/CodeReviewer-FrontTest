import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const CustomScatterTooltip = ({ active, payload } : TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    console.log(payload)
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].payload.studentName}`}</p>
        <p className="data">{`${payload[0].name} : ${payload[0].value}`}</p>
        <p className="data">{`${payload[1].name} : ${payload[1].value}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomScatterTooltip