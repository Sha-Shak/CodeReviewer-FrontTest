import { Button, Steps } from "antd";
import { useEffect, useState } from "react";
import conf from "../config";
import { ISkills } from "../interfaces/marks/skills.interface";
import { IStudent } from "../interfaces/student/student.interface";
import SkillsSlider from "../Components/SkillsSlider";
import { serverFetch } from "../utils/handleRequest";
import { useForm } from "antd/es/form/Form";
import { capitalizeNames } from "../utils/helper";

const SoftSkillsPage = () => {
  const url = conf.API_BASE_URL;
  const softSkillUrl = url + `/skill/soft-skill`;
  const cohortId = "651938516853000980439b1a";
  const studentUrl = url + `/students/StudentByCohort/${cohortId}`;

  const [softSkills, setSoftSkills] = useState<ISkills[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [assessments, setAssessments] = useState<any[]>([]); // Store assessments for all skills and students
  const [form] = useForm();
  useEffect(() => {
    // Fetch soft skills and students here
    const fetchData = async () => {
      try {
        console.log("url",softSkillUrl )
        const skillsData = await serverFetch("get", softSkillUrl);
        setSoftSkills(skillsData);

        const studentsData = await serverFetch("get", studentUrl);
        setStudents(studentsData);

        // Initialize the assessments array
        const defaultAssessments = new Array(studentsData.length)
          .fill([])
          .map(() => new Array(skillsData.length).fill(1));
        setAssessments(defaultAssessments);
      } catch (error: any) {
        console.log("error", error.message);
      }
    };

    fetchData();
  }, []);

  const handleNextStep = () => {
    if (currentStep < softSkills.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

const handleSubmit = async () => {
  // Transform assessments array into the desired format
  const skillAssessments = softSkills.map((skill, skillIndex) => {
    return students.map((student, studentIndex) => {
      return {
        skillId: skill._id,
        marks: assessments[studentIndex][skillIndex],
        student: student._id,
      };
    });
  });

  // Submit data for each student
  for (let studentIndex = 0; studentIndex < students.length; studentIndex++) {
    const student = students[studentIndex];
    const studentId = student._id;
    const postUrl = conf.API_BASE_URL + `marks/soft-skills/add/mid-junior/${studentId}`
    const studentData = skillAssessments.map(
      (assessment) => assessment[studentIndex]
    );

    // Send a POST request with the studentData to the postUrl
    // await serverFetch("post", postUrl, studentData);

    console.log(`Data for student ${student.name} submitted.`, postUrl, studentData);
  }
};


  return (
    <div>
      <Steps
        current={currentStep}
        items={softSkills.map((el) => ({}))}
      />
      <div>
        {softSkills[currentStep] && (
          <h3>Question: {softSkills[currentStep].question}</h3>
        )}
        <div>
          {students.map((student, studentIndex) => (
            <div key={student._id}>
              <SkillsSlider
                skill={softSkills[currentStep]}
                rating={assessments[studentIndex][currentStep]}
                form={form}
                question={false}
                student={student}
                onRatingChange={(value) => {
                  // Update the assessments array with the new value
                  const newAssessments = [...assessments];
                  newAssessments[studentIndex][currentStep] = value;
                  setAssessments(newAssessments);
                }}
              />
            </div>
          ))}
        </div>
        <Button onClick={handlePrevStep} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button
          onClick={handleNextStep}
          disabled={currentStep === softSkills.length - 1}
        >
          Next
        </Button>
        {currentStep === softSkills.length - 1 && (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </div>
  );
};

export default SoftSkillsPage;
