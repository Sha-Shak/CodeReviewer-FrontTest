import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const CustomRadarTooltip = ({ active, payload } : TooltipProps<ValueType, NameType>) => {

  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="data">{`${payload[0].payload.skillName} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomRadarTooltip