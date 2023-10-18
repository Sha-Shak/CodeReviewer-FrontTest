// import { Popover, Steps, Slider, Button } from "antd";
// import { useEffect, useState } from "react";
// import conf from "../config";
// import useFetchData from "../hooks/useFetchData";
// import { ISkills } from "../interfaces/marks/skills.interface";
// import { ICohort } from "../interfaces/student/cohort.interface";
// import { IStudent } from "../interfaces/student/student.interface";

// const customDot = (
//   dot: any,
//   { status, index }: { status: string; index: number }
// ) => (
//   <Popover
//     content={
//       <span>
//         step {index} status: {status}
//       </span>
//     }
//   >
//     {dot}
//   </Popover>
// );

// const SoftSkillsPage = () => {
//   const url = conf.API_BASE_URL;
//   const cohortUrl = url + "/cohort";
//   const softSkillUrl = url + `/skill/soft-skill`;
//   const [message, setMessage] = useState("");
//   const notify = (message: string) => setMessage(message);

//   const [cohorts, setCohorts, contextHolderCohorts] = useFetchData<ICohort[]>(
//     cohortUrl,
//     "Cohorts",
//     notify
//   );
//   const dummyCohort = {
//     _id: "651938516853000980439b1a",
//     name: "Students | Aug-2023",
//     githubTeam: "students-aug-2023",
//   };
//   const [selectedCohort, setSelectedCohort] = useState<ICohort>(dummyCohort);
//   const cohortId = selectedCohort._id;
//   const studentUrl = url + `/students/StudentByCohort/${cohortId}`;
  
//    const [softSkills, setSoftSkills] = useFetchData<ISkills[]>(
//      softSkillUrl,
//      "skills",
//      notify
//    );
//   const [students, setStudents, contextHolderStudents] = useFetchData<
//     IStudent[]
//   >(studentUrl, "students", notify);
//   const [skills, setSkills, contextHolderSkills] = useFetchData<ISkills[]>(
//     softSkillUrl,
//     "skills",
//     notify
//   );

//   const [currentStep, setCurrentStep] = useState(0);
//   const [studentScores, setStudentScores] = useState<number[]>([]);

//   useEffect(() => {
//     if (Array.isArray(students)) {
//       setStudentScores(Array(students.length).fill(5));
//     }
//   }, [students]);

//   const handleNextStep = () => {
//     if (Array.isArray(students) && currentStep < students.length - 1) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handlePrevStep = () => {
//     if (Array.isArray(students) && currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   return (
//     <>
//       <Steps
//         current={currentStep}
//         progressDot={customDot}
//         items={
//           Array.isArray(skills) ? skills.map((el) => ({ title: el.name })) : []
//         }
//       />
//       <div>
//         <h3>Step {currentStep + 1}</h3>
//         <div>
//           {Array.isArray(students) &&
//             students.map((student, index) => (
//               <div key={student._id}>
//                 <h4>{student.name}</h4>
//                 <Slider
//                   value={studentScores[index]}
//                   onChange={(value) => {
//                     if (Array.isArray(students)) {
//                       const newStudentScores = [...studentScores];
//                       newStudentScores[index] = value;
//                       setStudentScores(newStudentScores);
//                     }
//                   }}
//                   min={1}
//                   max={10}
//                 />
//               </div>
//             ))}
//         </div>
//         <Button onClick={handlePrevStep} disabled={currentStep === 0}>
//           Previous
//         </Button>
//         <Button
//           onClick={handleNextStep}
//           disabled={
//             Array.isArray(students) && currentStep === students.length - 1
//           }
//         >
//           Next
//         </Button>
//       </div>
//     </>
//   );
// };

// export default SoftSkillsPage;
