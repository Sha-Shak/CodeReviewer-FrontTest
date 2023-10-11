import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { serverFetch } from '../utils/handleRequest';
import { IStudent } from '../interfaces/student/student.interface';
import HardSkillsChart from '../Components/HardSkillsChart';
import SoftSkillsChart from '../Components/SoftSkillsChart';
import StudentPositionChart from '../Components/Charts/StudentPositionChart';

function SingleStudentPage() {

  let { id } = useParams();

  const [student, setStudent] = useState<IStudent | undefined>(undefined);

  useEffect(() => {
    async function fetchStudent() {
      const url = "https://code-reviewer-server-projectcode.koyeb.app/students/profile/" + id;
      const student : IStudent = await serverFetch("get", url);
      setStudent(student);
    };

    fetchStudent();
  }, [])

  return (
    <>
    {student && 
      <>
        <h1>{student.name}</h1>
        <HardSkillsChart id={student._id} />
        <SoftSkillsChart id={student._id} />
        <StudentPositionChart id={student._id} />
      </>
    }

    </>
  )
}

export default SingleStudentPage