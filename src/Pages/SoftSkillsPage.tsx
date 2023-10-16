import { useState } from "react";
import conf from "../config";
import useFetchData from "../hooks/useFetchData";
import { ISkills } from "../interfaces/marks/skills.interface";
import { ICohort } from "../interfaces/student/cohort.interface";
import { IStudent } from "../interfaces/student/student.interface";

const SoftSkillsPage = () => {
  const url = conf.API_BASE_URL;
  const cohortUrl = url + "/cohort";
  const softSkillUrl = url + `/skill/soft-skill`;
  
  const [cohorts, setCohorts, contextHolderCohorts] = useFetchData<ICohort[]>(
    cohortUrl,
    "Cohorts"
    );
    const dummyCohort = {
      _id: "651938516853000980439b1a",
      name: "Students | Aug-2023",
      githubTeam: "students-aug-2023",
    };
    const [selectedCohort, setSelectedCohort] = useState<ICohort>(dummyCohort);
    const cohortId = selectedCohort._id
    const studentUrl = url + `/students/StudentByCohort/${cohortId}`;
    const [stundets, setStudents, contextHolderStundets] = useFetchData<IStudent[]>(studentUrl, 'students')
  const [skills, setSkills, contextHolderSkills] = useFetchData<ISkills[]>(
    softSkillUrl,
    "skills"
  );

  return (
    <>
      {contextHolderCohorts}
      {contextHolderSkills}
      {contextHolderStundets}
      {}
      {Array.isArray(cohorts) &&
        cohorts.map((el, i) => {
          return <i key={i}>{el.name}</i>;
        })}

      {Array.isArray(stundets) &&
        stundets.map((el, i) => {
          return <i key={i}>{el.name}</i>;
        })}
    </>
  );
};

export default SoftSkillsPage;
