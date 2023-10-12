import { useState } from 'react'
import SkillsRadarChart from './Charts/SkillsRadarChart';

function SoftSkillsChart({ id }: { id : string }) {

  const options = ['mid-junior', 'end-junior', 'mid-senior', 'end-junior'];

  const [selectedReport, setSelectedReport] = useState<string>('mid-junior');

  function parseReportName (name: string) {
    return name.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
  }

  return (
    <div className='chart-container'>
      <h2 className="chart-title">Soft Skills</h2>
      <select className="chart-select" onChange={(e) => setSelectedReport(e.target.value)}>
        {options.map((option, index) => <option key={`week-option-${index}`} value={option}>{parseReportName(option)}</option>)}
      </select>

      <SkillsRadarChart id={id} reportType={selectedReport} skillType='soft-skills' />
    </div>
  )
}

export default SoftSkillsChart