import AverageSkillsBarChart from '../Components/Charts/AverageSkillsBarChart'
import StudentTable from '../Components/Tables/StudentTable'

function TalentTrainingDashboardPage() {
  return (
    <div className="dashboard-container">
      <StudentTable />
      <div className='charts-container'>
        <AverageSkillsBarChart skillType='hard-skills' />
        <AverageSkillsBarChart skillType='soft-skills' />
      </div>
    </div>
  )
}

export default TalentTrainingDashboardPage