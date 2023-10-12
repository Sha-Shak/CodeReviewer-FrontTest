import { useState } from 'react'
import SkillsRadarChart from './Charts/SkillsRadarChart';
import weeks from '../assets/data/weeks.json';
import { parseWeekName } from '../utils/helper';

function HardSkillsChart({ id }: { id : string }) {

  const [selectedWeek, setSelectedWeek] = useState<string>('week-1');

  return (
    <div className='chart-container'>
      <h2 className="chart-title">Hard Skills</h2>
      <select className="chart-select" onChange={(e) => setSelectedWeek(e.target.value)}>
        {weeks.map((option, index) => <option key={`week-option-${index}`} value={option}>{parseWeekName(option)}</option>)}
      </select>

      <SkillsRadarChart id={id} reportType={selectedWeek} skillType='hard-skills' />
    </div>
  )
}

export default HardSkillsChart