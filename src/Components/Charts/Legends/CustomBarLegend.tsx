import { LegendProps } from 'recharts';
import { Typography } from 'antd';

const { Text } = Typography;

function CustomBarLegend({ payload } : LegendProps) {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {payload?.map((entry) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{width: 12, height: 12, marginRight: 5, backgroundColor: entry.color || '#8884d8' }}></div>
          <Text style={{color: entry.color || '#8884d8'}}>{entry.value}</Text>
        </div>
      ))}
    </div>
  )
}

export default CustomBarLegend