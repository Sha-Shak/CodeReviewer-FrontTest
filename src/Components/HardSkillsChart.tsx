import React, { useState } from 'react'
import SkillsRadarChart from './Charts/SkillsRadarChart';

function HardSkillsChart({ id }: { id : string }) {

  const options = ['week-1', 'week-2', 'week-3', 'week-4', 'week-5', 'week-6', 'week-7', 'week-8', 'week-9', 'week-10', 'week-11', 'week-12'];

  const [selectedWeek, setSelectedWeek] = useState<string>('week-1');

  function parseWeekName (name: string) {
    const words = name.split('-');
    words[0] = 'Week';
    return words.join(' ');
  }

  return (
    <div>
      <h2>Hard Skills</h2>
      <select onChange={(e) => setSelectedWeek(e.target.value)}>
        {options.map((option, index) => <option key={`week-option-${index}`} value={option}>{parseWeekName(option)}</option>)}
      </select>

      <SkillsRadarChart id={id} reportType={selectedWeek} skillType='hard-skills' />
    </div>
  )
}

export default HardSkillsChart