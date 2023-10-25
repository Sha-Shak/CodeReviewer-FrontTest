import { Button, Select, Spin, Steps, message } from "antd";
import { useEffect, useState } from "react";
import conf from "../config";
import { ISkills } from "../interfaces/marks/skills.interface";
import { IStudent } from "../interfaces/student/student.interface";
import SkillsSlider from "../Components/SkillsSlider";
import { serverFetch } from "../utils/handleRequest";
import { useForm } from "antd/es/form/Form";
import { ICohort } from "../interfaces/student/cohort.interface";

const SoftSkillsPage = () => {
  const url = conf.API_BASE_URL;
  const softSkillUrl = url + `/skill/soft-skill`;

  const [softSkills, setSoftSkills] = useState<ISkills[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [cohorts, setCohorts] = useState<ICohort[]>([]);
  const [selectedCohortId, setSelectedCohortId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [assessments, setAssessments] = useState<any[]>([]); // Store assessments for all skills and students
  const [form] = useForm();

  const [messageApi, contextHolder] = message.useMessage();


  const displayMessage = (type: "error" | "info" | "success", message: string) => {
    messageApi.open({
      type,
      content: message,
    });
  };

  useEffect(() => {
    // Fetch soft skills and students here
    const fetchData = async () => {
      try {
        setLoading(true);
        const allCohortUrl = url + '/cohort/';
        const cohorts: ICohort[] = await serverFetch('get', allCohortUrl);
        setCohorts(cohorts);
        setSelectedCohortId(cohorts[0]._id);
        
        const skillsData = await serverFetch("get", softSkillUrl);
        setSoftSkills(skillsData);
        setLoading(false);
      } catch (error: any) {
        console.log("error", error.message);
        displayMessage("error", "An error occured while fetching data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  
  useEffect(() => {
    async function fetchStudents() {
      if (selectedCohortId.length) {
        try {
          setLoading(true);
          const fetchUrl = url + `/students/StudentByCohort/${selectedCohortId}`;
          const studentsData = await serverFetch("get", fetchUrl);
          setStudents(studentsData);
          
          // Initialize the assessments array
          const defaultAssessments = new Array(studentsData.length)
          .fill([])
          .map(() => new Array(softSkills.length).fill(1));
          setAssessments(defaultAssessments);
          setLoading(false);
        } catch (error) {
          console.log(error);
          displayMessage("error", "An error occured while fetching students.");
          setLoading(false);
        }
      }
    }
    
    fetchStudents();
  }, [selectedCohortId, softSkills]);
  
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

  const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


  return (
    <>
      {contextHolder}
      <span>Select cohort: </span>
      <Select
        showSearch
        placeholder="Cohort"
        options={cohorts.map(cohort => ({ label: cohort.name.split(' ')[2], value: cohort._id }))}
        style={{ width: 180, marginBottom: 25, marginTop: 5 }}
        onChange={(value: string) => setSelectedCohortId(value)}
        filterOption={filterOption}
        optionFilterProp="children"
        value={selectedCohortId}
      />
      <Spin spinning={loading} tip="Fetching students and questions...">
        <Steps
          current={currentStep}
          items={softSkills.map((el) => ({}))}
        />
        <div>
          {softSkills[currentStep] && (
            <h2>Question: {softSkills[currentStep].question}</h2>
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
      </Spin>
    </>
  );
};

export default SoftSkillsPage;
